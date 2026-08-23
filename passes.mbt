///|
const PASS_SCAN_STEP_SECONDS : Int = 60

///|
/// Predict visibility windows using the current two-body preview propagator.
///
/// The returned event times have one-second resolution. AOS and LOS are
/// refined by elevation-threshold bisection, while TCA is selected by a
/// one-second search around the sampled elevation maximum.
pub fn predict_passes(
  tle : Tle,
  station : GroundStation,
  from : UtcDateTime,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> Result[Array[PassWindow], SatError] {
  let elements = match orbit_elements(tle) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  predict_passes_from_elements(
    elements, station, from, duration_hours, minimum_elevation_deg,
  )
}

///|
/// Predict visibility windows from already-decoded orbital elements.
pub fn predict_passes_from_elements(
  elements : OrbitElements,
  station : GroundStation,
  from : UtcDateTime,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> Result[Array[PassWindow], SatError] {
  if duration_hours <= 0 {
    return Err(
      SatError::new(OutOfRange, "pass prediction duration must be positive"),
    )
  }
  if minimum_elevation_deg < -90.0 || minimum_elevation_deg > 90.0 {
    return Err(
      SatError::new(
        OutOfRange,
        "minimum elevation must be between -90 and 90 degrees",
      ),
    )
  }
  let duration_seconds = duration_hours * 3600
  let passes : Array[PassWindow] = []
  let mut previous_offset = 0
  let mut previous_elevation = match pass_elevation(elements, station, from) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let mut in_pass = previous_elevation >= minimum_elevation_deg
  let mut aos_offset = 0
  let mut maximum_offset = 0
  let mut maximum_elevation = previous_elevation
  let mut offset = PASS_SCAN_STEP_SECONDS
  while offset <= duration_seconds {
    let current_elevation = match
      pass_elevation(elements, station, from.add_seconds(offset)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if !in_pass {
      if previous_elevation < minimum_elevation_deg &&
        current_elevation >= minimum_elevation_deg {
        aos_offset = match
          refine_horizon_crossing(
            elements, station, from, previous_offset, offset, minimum_elevation_deg,
            true,
          ) {
          Ok(value) => value
          Err(error) => return Err(error)
        }
        maximum_offset = offset
        maximum_elevation = current_elevation
        in_pass = true
      }
    } else if current_elevation >= minimum_elevation_deg {
      if current_elevation > maximum_elevation {
        maximum_offset = offset
        maximum_elevation = current_elevation
      }
    } else {
      let los_offset = match
        refine_horizon_crossing(
          elements, station, from, previous_offset, offset, minimum_elevation_deg,
          false,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      let window = match
        make_pass_window(
          elements, station, from, minimum_elevation_deg, aos_offset, los_offset,
          maximum_offset, maximum_elevation,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      passes.push(window)
      in_pass = false
      maximum_elevation = current_elevation
    }
    previous_offset = offset
    previous_elevation = current_elevation
    offset = offset + PASS_SCAN_STEP_SECONDS
  }
  if previous_offset < duration_seconds {
    let current_elevation = match
      pass_elevation(elements, station, from.add_seconds(duration_seconds)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if !in_pass {
      if previous_elevation < minimum_elevation_deg &&
        current_elevation >= minimum_elevation_deg {
        aos_offset = match
          refine_horizon_crossing(
            elements, station, from, previous_offset, duration_seconds, minimum_elevation_deg,
            true,
          ) {
          Ok(value) => value
          Err(error) => return Err(error)
        }
        maximum_offset = duration_seconds
        maximum_elevation = current_elevation
        in_pass = true
      }
    } else if current_elevation >= minimum_elevation_deg {
      if current_elevation > maximum_elevation {
        maximum_offset = duration_seconds
        maximum_elevation = current_elevation
      }
    } else {
      let los_offset = match
        refine_horizon_crossing(
          elements, station, from, previous_offset, duration_seconds, minimum_elevation_deg,
          false,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      let window = match
        make_pass_window(
          elements, station, from, minimum_elevation_deg, aos_offset, los_offset,
          maximum_offset, maximum_elevation,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      passes.push(window)
      in_pass = false
    }
    previous_offset = duration_seconds
    previous_elevation = current_elevation
  }
  if in_pass {
    let window = match
      make_pass_window(
        elements, station, from, minimum_elevation_deg, aos_offset, duration_seconds,
        maximum_offset, maximum_elevation,
      ) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    passes.push(window)
  }
  Ok(passes)
}

///|
fn pass_elevation(
  elements : OrbitElements,
  station : GroundStation,
  instant : UtcDateTime,
) -> Result[Double, SatError] {
  let state = match propagate_two_body(elements, instant) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  Ok(observe(state, station).elevation_deg)
}

///|
fn refine_horizon_crossing(
  elements : OrbitElements,
  station : GroundStation,
  from : UtcDateTime,
  lower_offset : Int,
  upper_offset : Int,
  minimum_elevation_deg : Double,
  rising : Bool,
) -> Result[Int, SatError] {
  let mut lower = lower_offset
  let mut upper = upper_offset
  while upper - lower > 1 {
    let middle = lower + (upper - lower) / 2
    let elevation = match
      pass_elevation(elements, station, from.add_seconds(middle)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if rising {
      if elevation >= minimum_elevation_deg {
        upper = middle
      } else {
        lower = middle
      }
    } else if elevation >= minimum_elevation_deg {
      lower = middle
    } else {
      upper = middle
    }
  }
  Ok(if rising { upper } else { lower })
}

///|
fn refine_pass_maximum(
  elements : OrbitElements,
  station : GroundStation,
  from : UtcDateTime,
  lower_offset : Int,
  upper_offset : Int,
  seed_offset : Int,
  seed_elevation : Double,
) -> Result[(Int, Double), SatError] {
  let search_radius = PASS_SCAN_STEP_SECONDS
  let mut lower = seed_offset - search_radius
  if lower < lower_offset {
    lower = lower_offset
  }
  let mut upper = seed_offset + search_radius
  if upper > upper_offset {
    upper = upper_offset
  }
  let mut best_offset = seed_offset
  let mut best_elevation = seed_elevation
  let mut cursor = lower
  while cursor <= upper {
    let elevation = match
      pass_elevation(elements, station, from.add_seconds(cursor)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if elevation > best_elevation {
      best_offset = cursor
      best_elevation = elevation
    }
    cursor = cursor + 1
  }
  Ok((best_offset, best_elevation))
}

///|
fn make_pass_window(
  elements : OrbitElements,
  station : GroundStation,
  from : UtcDateTime,
  minimum_elevation_deg : Double,
  aos_offset : Int,
  los_offset : Int,
  maximum_offset : Int,
  maximum_elevation : Double,
) -> Result[PassWindow, SatError] {
  let (tca_offset, refined_maximum) = match
    refine_pass_maximum(
      elements, station, from, aos_offset, los_offset, maximum_offset, maximum_elevation,
    ) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  if refined_maximum < minimum_elevation_deg {
    return Err(
      SatError::new(OutOfRange, "pass maximum elevation is below threshold"),
    )
  }
  Ok({
    aos: from.add_seconds(aos_offset),
    tca: from.add_seconds(tca_offset),
    los: from.add_seconds(los_offset),
    maximum_elevation_deg: refined_maximum,
  })
}

///|
/// Predict visibility windows with the near-earth SGP4 propagator.
///
/// This API is the high-fidelity counterpart to predict_passes, which keeps
/// its transparent two-body preview behavior for compatibility. A deep-space
/// TLE returns UnsupportedOrbit because SDP4 is not implemented yet.
pub fn predict_passes_sgp4(
  tle : Tle,
  station : GroundStation,
  from : UtcDateTime,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> Result[Array[PassWindow], SatError] {
  if duration_hours <= 0 {
    return Err(
      SatError::new(OutOfRange, "pass prediction duration must be positive"),
    )
  }
  if minimum_elevation_deg < -90.0 || minimum_elevation_deg > 90.0 {
    return Err(
      SatError::new(
        OutOfRange,
        "minimum elevation must be between -90 and 90 degrees",
      ),
    )
  }
  let duration_seconds = duration_hours * 3600
  let passes : Array[PassWindow] = []
  let mut previous_offset = 0
  let mut previous_elevation = match sgp4_pass_elevation(tle, station, from) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let mut in_pass = previous_elevation >= minimum_elevation_deg
  let mut aos_offset = 0
  let mut maximum_offset = 0
  let mut maximum_elevation = previous_elevation
  let mut offset = PASS_SCAN_STEP_SECONDS
  while offset <= duration_seconds {
    let current_elevation = match
      sgp4_pass_elevation(tle, station, from.add_seconds(offset)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if !in_pass {
      if previous_elevation < minimum_elevation_deg &&
        current_elevation >= minimum_elevation_deg {
        aos_offset = match
          refine_sgp4_horizon_crossing(
            tle, station, from, previous_offset, offset, minimum_elevation_deg, true,
          ) {
          Ok(value) => value
          Err(error) => return Err(error)
        }
        maximum_offset = offset
        maximum_elevation = current_elevation
        in_pass = true
      }
    } else if current_elevation >= minimum_elevation_deg {
      if current_elevation > maximum_elevation {
        maximum_offset = offset
        maximum_elevation = current_elevation
      }
    } else {
      let los_offset = match
        refine_sgp4_horizon_crossing(
          tle, station, from, previous_offset, offset, minimum_elevation_deg, false,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      let window = match
        make_sgp4_pass_window(
          tle, station, from, minimum_elevation_deg, aos_offset, los_offset, maximum_offset,
          maximum_elevation,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      passes.push(window)
      in_pass = false
      maximum_elevation = current_elevation
    }
    previous_offset = offset
    previous_elevation = current_elevation
    offset = offset + PASS_SCAN_STEP_SECONDS
  }
  if previous_offset < duration_seconds {
    let current_elevation = match
      sgp4_pass_elevation(tle, station, from.add_seconds(duration_seconds)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if !in_pass {
      if previous_elevation < minimum_elevation_deg &&
        current_elevation >= minimum_elevation_deg {
        aos_offset = match
          refine_sgp4_horizon_crossing(
            tle, station, from, previous_offset, duration_seconds, minimum_elevation_deg,
            true,
          ) {
          Ok(value) => value
          Err(error) => return Err(error)
        }
        maximum_offset = duration_seconds
        maximum_elevation = current_elevation
        in_pass = true
      }
    } else if current_elevation >= minimum_elevation_deg {
      if current_elevation > maximum_elevation {
        maximum_offset = duration_seconds
        maximum_elevation = current_elevation
      }
    } else {
      let los_offset = match
        refine_sgp4_horizon_crossing(
          tle, station, from, previous_offset, duration_seconds, minimum_elevation_deg,
          false,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      let window = match
        make_sgp4_pass_window(
          tle, station, from, minimum_elevation_deg, aos_offset, los_offset, maximum_offset,
          maximum_elevation,
        ) {
        Ok(value) => value
        Err(error) => return Err(error)
      }
      passes.push(window)
      in_pass = false
    }
  }
  if in_pass {
    let window = match
      make_sgp4_pass_window(
        tle, station, from, minimum_elevation_deg, aos_offset, duration_seconds,
        maximum_offset, maximum_elevation,
      ) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    passes.push(window)
  }
  Ok(passes)
}

///|
fn sgp4_pass_elevation(
  tle : Tle,
  station : GroundStation,
  instant : UtcDateTime,
) -> Result[Double, SatError] {
  let state = match propagate_sgp4(tle, instant) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  Ok(observe(state, station).elevation_deg)
}

///|
fn refine_sgp4_horizon_crossing(
  tle : Tle,
  station : GroundStation,
  from : UtcDateTime,
  lower_offset : Int,
  upper_offset : Int,
  minimum_elevation_deg : Double,
  rising : Bool,
) -> Result[Int, SatError] {
  let mut lower = lower_offset
  let mut upper = upper_offset
  while upper - lower > 1 {
    let middle = lower + (upper - lower) / 2
    let elevation = match
      sgp4_pass_elevation(tle, station, from.add_seconds(middle)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if rising {
      if elevation >= minimum_elevation_deg {
        upper = middle
      } else {
        lower = middle
      }
    } else if elevation >= minimum_elevation_deg {
      lower = middle
    } else {
      upper = middle
    }
  }
  Ok(if rising { upper } else { lower })
}

///|
fn refine_sgp4_pass_maximum(
  tle : Tle,
  station : GroundStation,
  from : UtcDateTime,
  lower_offset : Int,
  upper_offset : Int,
  seed_offset : Int,
  seed_elevation : Double,
) -> Result[(Int, Double), SatError] {
  let mut lower = seed_offset - PASS_SCAN_STEP_SECONDS
  if lower < lower_offset {
    lower = lower_offset
  }
  let mut upper = seed_offset + PASS_SCAN_STEP_SECONDS
  if upper > upper_offset {
    upper = upper_offset
  }
  let mut best_offset = seed_offset
  let mut best_elevation = seed_elevation
  let mut cursor = lower
  while cursor <= upper {
    let elevation = match
      sgp4_pass_elevation(tle, station, from.add_seconds(cursor)) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    if elevation > best_elevation {
      best_offset = cursor
      best_elevation = elevation
    }
    cursor = cursor + 1
  }
  Ok((best_offset, best_elevation))
}

///|
fn make_sgp4_pass_window(
  tle : Tle,
  station : GroundStation,
  from : UtcDateTime,
  minimum_elevation_deg : Double,
  aos_offset : Int,
  los_offset : Int,
  maximum_offset : Int,
  maximum_elevation : Double,
) -> Result[PassWindow, SatError] {
  let (tca_offset, refined_maximum) = match
    refine_sgp4_pass_maximum(
      tle, station, from, aos_offset, los_offset, maximum_offset, maximum_elevation,
    ) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  if refined_maximum < minimum_elevation_deg {
    return Err(
      SatError::new(OutOfRange, "pass maximum elevation is below threshold"),
    )
  }
  Ok({
    aos: from.add_seconds(aos_offset),
    tca: from.add_seconds(tca_offset),
    los: from.add_seconds(los_offset),
    maximum_elevation_deg: refined_maximum,
  })
}
