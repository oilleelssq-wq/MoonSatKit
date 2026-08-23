///|
/// Serialize an inertial orbit state as a small JSON object.
pub fn orbit_state_to_json(state : OrbitState) -> String {
  "{\"epoch\":\"\{state.epoch.to_string()}\",\"position_km\":{\"x\":\{state.position_km.x},\"y\":\{state.position_km.y},\"z\":\{state.position_km.z}},\"velocity_km_s\":{\"x\":\{state.velocity_km_s.x},\"y\":\{state.velocity_km_s.y},\"z\":\{state.velocity_km_s.z}}}"
}

///|
/// Serialize pass windows as a JSON array.
pub fn pass_windows_to_json(passes : Array[PassWindow]) -> String {
  let mut output = "["
  let mut first = true
  for pass in passes {
    if !first {
      output = output + ","
    }
    first = false
    output = output +
      "{\"aos\":\"\{pass.aos.to_string()}\",\"tca\":\"\{pass.tca.to_string()}\",\"los\":\"\{pass.los.to_string()}\",\"maximum_elevation_deg\":\{pass.maximum_elevation_deg}}"
  }
  output + "]"
}

///|
/// Serialize pass windows as a UTF-8 CSV document with a header row.
pub fn pass_windows_to_csv(passes : Array[PassWindow]) -> String {
  let mut output = "aos,tca,los,maximum_elevation_deg\n"
  for pass in passes {
    output = output +
      "\{pass.aos.to_string()},\{pass.tca.to_string()},\{pass.los.to_string()},\{pass.maximum_elevation_deg}\n"
  }
  output
}

///|
/// Export a near-earth SGP4 ground track as a GeoJSON LineString.
///
/// Coordinates use the GeoJSON order [longitude, latitude, altitude_km].
/// The interval is sampled inclusively, so a zero-duration track contains one
/// coordinate. Deep-space TLEs return UnsupportedOrbit.
pub fn track_geojson_sgp4(
  tle : Tle,
  from : UtcDateTime,
  duration_seconds : Int,
  step_seconds : Int,
) -> Result[String, SatError] {
  if duration_seconds < 0 {
    return Err(SatError::new(OutOfRange, "track duration must not be negative"))
  }
  if step_seconds <= 0 {
    return Err(SatError::new(OutOfRange, "track step must be positive"))
  }
  let mut coordinates = ""
  let mut first = true
  let mut offset = 0
  while offset <= duration_seconds {
    let instant = from.add_seconds(offset)
    let state = match propagate_sgp4(tle, instant) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    let geodetic = orbit_state_geodetic(state)
    if !first {
      coordinates = coordinates + ","
    }
    first = false
    coordinates = coordinates +
      "[\{geodetic.longitude_deg},\{geodetic.latitude_deg},\{geodetic.altitude_km}]"
    offset = offset + step_seconds
  }
  Ok(
    "{\"type\":\"Feature\",\"properties\":{\"catalog_number\":\{tle.catalog_number},\"start\":\"\{from.to_string()}\",\"duration_seconds\":\{duration_seconds},\"step_seconds\":\{step_seconds}},\"geometry\":{\"type\":\"LineString\",\"coordinates\":[\{coordinates}]}}",
  )
}
