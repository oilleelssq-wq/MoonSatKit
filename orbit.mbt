///|
fn parse_tle_double(text : StringView) -> Double? {
  if text.is_empty() {
    return None
  }
  let mut sign = 1.0
  let mut value = 0.0
  let mut scale = 0.1
  let mut after_decimal = false
  let mut seen_digit = false
  let mut valid = true
  let mut index = 0
  text
  .iter()
  .each(char => {
    if index == 0 && char == '-' {
      sign = -1.0
    } else if index == 0 && char == '+' {
      ()
    } else if char == '.' && !after_decimal {
      after_decimal = true
    } else if char >= '0' && char <= '9' {
      seen_digit = true
      let digit = (char.to_int() - '0'.to_int()).to_double()
      if after_decimal {
        value = value + digit * scale
        scale = scale * 0.1
      } else {
        value = value * 10.0 + digit
      }
    } else {
      valid = false
    }
    index = index + 1
  })
  if valid && seen_digit {
    Some(sign * value)
  } else {
    None
  }
}

///|
/// Parse the implied-decimal mantissa and signed exponent used by TLE fields
/// such as `28098-4` and `-12345-5`.
fn parse_tle_exponential(text : StringView) -> Double? {
  let compact = text.trim()
  if compact.is_empty() || compact.length() < 3 {
    return None
  }
  let mut exponent_marker = -1
  let mut index = 0
  compact
  .iter()
  .each(char => {
    if index > 0 && (char == '+' || char == '-') && exponent_marker < 0 {
      exponent_marker = index
    }
    index = index + 1
  })
  if exponent_marker < 1 || exponent_marker + 1 >= compact.length() {
    return None
  }
  let mantissa_text = compact.view(end_offset=exponent_marker)
  let exponent_text = compact.view(start_offset=exponent_marker)
  let mut mantissa_start = 0
  let mut mantissa_sign = 1.0
  let mut first = true
  mantissa_text
  .iter()
  .each(char => {
    if first {
      if char == '-' {
        mantissa_sign = -1.0
        mantissa_start = 1
      } else if char == '+' {
        mantissa_start = 1
      }
      first = false
    }
  })
  let mantissa_digits = mantissa_text.view(start_offset=mantissa_start)
  let mantissa = match parse_tle_double("0." + mantissa_digits.to_owned()) {
    Some(value) => value
    None => return None
  }
  let exponent = match parse_tle_double(exponent_text) {
    Some(value) => value.to_int()
    None => return None
  }
  Some(mantissa_sign * mantissa * @math.pow(10.0, exponent.to_double()))
}

///|
fn parse_tle_epoch(epoch : String) -> Result[(UtcDateTime, Double), SatError] {
  if epoch.length() < 8 {
    return Err(
      SatError::new(
        InvalidTleNumber,
        "TLE epoch must use YYDDD.dddddddd format",
        fragment=epoch,
      ),
    )
  }
  let year_text = epoch.view(end_offset=2)
  let day_text = epoch.view(start_offset=2, end_offset=5)
  let fraction_text = epoch.view(start_offset=6)
  let year_short = match parse_decimal(year_text) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE epoch year is invalid",
          fragment=year_text.to_owned(),
        ),
      )
  }
  let day_of_year = match parse_decimal(day_text) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE epoch day is invalid",
          fragment=day_text.to_owned(),
        ),
      )
  }
  let fraction = match parse_tle_double("0." + fraction_text.to_owned()) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE epoch fraction is invalid",
          fragment=fraction_text.to_owned(),
        ),
      )
  }
  let year = if year_short < 57 { 2000 + year_short } else { 1900 + year_short }
  let max_day = if is_leap_year(year) { 366 } else { 365 }
  if day_of_year < 1 || day_of_year > max_day {
    return Err(
      SatError::new(
        OutOfRange,
        "TLE epoch day is out of range",
        fragment=day_text.to_owned(),
      ),
    )
  }
  let mut remaining = day_of_year
  let mut month = 1
  while remaining > days_in_month(year, month) {
    remaining = remaining - days_in_month(year, month)
    month = month + 1
  }
  let seconds = fraction * 86400.0
  let mut whole_seconds = @math.floor(seconds).to_int()
  if whole_seconds >= 86400 {
    whole_seconds = 86399
  }
  let value = {
    year,
    month,
    day: remaining,
    hour: whole_seconds / 3600,
    minute: whole_seconds % 3600 / 60,
    second: whole_seconds % 60,
  }
  let epoch_jd = julian_day(value) +
    (seconds - whole_seconds.to_double()) / 86400.0
  Ok((value, epoch_jd))
}

///|
/// Decode the numerical orbital elements represented by a parsed TLE.
pub fn orbit_elements(tle : Tle) -> Result[OrbitElements, SatError] {
  let (epoch, epoch_jd) = match parse_tle_epoch(tle.epoch) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let inclination_deg = match parse_tle_double(tle.inclination) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE inclination is invalid",
          fragment=tle.inclination,
        ),
      )
  }
  let right_ascension_deg = match parse_tle_double(tle.right_ascension) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE right ascension is invalid",
          fragment=tle.right_ascension,
        ),
      )
  }
  let eccentricity = match parse_tle_double("0." + tle.eccentricity) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE eccentricity is invalid",
          fragment=tle.eccentricity,
        ),
      )
  }
  let argument_of_perigee_deg = match
    parse_tle_double(tle.argument_of_perigee) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE argument of perigee is invalid",
          fragment=tle.argument_of_perigee,
        ),
      )
  }
  let mean_anomaly_deg = match parse_tle_double(tle.mean_anomaly) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE mean anomaly is invalid",
          fragment=tle.mean_anomaly,
        ),
      )
  }
  let mean_motion_rev_per_day = match parse_tle_double(tle.mean_motion) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE mean motion is invalid",
          fragment=tle.mean_motion,
        ),
      )
  }
  if eccentricity < 0.0 || eccentricity >= 1.0 || mean_motion_rev_per_day <= 0.0 {
    return Err(
      SatError::new(OutOfRange, "TLE orbital elements are out of range"),
    )
  }
  Ok({
    catalog_number: tle.catalog_number,
    epoch,
    epoch_julian_day: epoch_jd,
    inclination_deg,
    right_ascension_deg,
    eccentricity,
    argument_of_perigee_deg,
    mean_anomaly_deg,
    mean_motion_rev_per_day,
    mean_motion_rad_per_min: mean_motion_rev_per_day * 2.0 * @math.PI / 1440.0,
  })
}

///|
/// Decode the complete numerical TLE input boundary for a future SGP4
/// propagator. This function does not propagate a state.
pub fn sgp4_elements(tle : Tle) -> Result[Sgp4Elements, SatError] {
  let elements = match orbit_elements(tle) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let first_derivative = match
    parse_tle_double(tle.mean_motion_first_derivative) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE mean motion first derivative is invalid",
          fragment=tle.mean_motion_first_derivative,
        ),
      )
  }
  let second_derivative = match
    parse_tle_exponential(tle.mean_motion_second_derivative) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE mean motion second derivative is invalid",
          fragment=tle.mean_motion_second_derivative,
        ),
      )
  }
  let bstar = match parse_tle_exponential(tle.bstar) {
    Some(value) => value
    None =>
      return Err(
        SatError::new(
          InvalidTleNumber,
          "TLE BSTAR drag term is invalid",
          fragment=tle.bstar,
        ),
      )
  }
  let degree = @math.PI / 180.0
  Ok({
    catalog_number: elements.catalog_number,
    epoch: elements.epoch,
    epoch_julian_day: elements.epoch_julian_day,
    inclination_rad: elements.inclination_deg * degree,
    right_ascension_rad: elements.right_ascension_deg * degree,
    eccentricity: elements.eccentricity,
    argument_of_perigee_rad: elements.argument_of_perigee_deg * degree,
    mean_anomaly_rad: elements.mean_anomaly_deg * degree,
    mean_motion_rad_per_min: elements.mean_motion_rad_per_min,
    mean_motion_first_derivative_rev_per_day2: first_derivative,
    mean_motion_second_derivative_div2_rev_per_day3: second_derivative,
    bstar,
  })
}

///|
/// Propagate an orbit with a two-body Kepler approximation.
///
/// This is an intentionally transparent preview model. It does not include
/// the perturbations and Earth orientation terms required for SGP4 accuracy.
pub fn propagate_two_body(
  elements : OrbitElements,
  instant : UtcDateTime,
) -> Result[OrbitState, SatError] {
  let mean_motion_rad_s = elements.mean_motion_rad_per_min / 60.0
  let mu = 398600.4418
  let semi_major_axis = @math.pow(
    mu / (mean_motion_rad_s * mean_motion_rad_s),
    1.0 / 3.0,
  )
  let elapsed_seconds = (julian_day(instant) - elements.epoch_julian_day) *
    86400.0
  let inclination = elements.inclination_deg * @math.PI / 180.0
  let raan = elements.right_ascension_deg * @math.PI / 180.0
  let argument = elements.argument_of_perigee_deg * @math.PI / 180.0
  let mean_anomaly = elements.mean_anomaly_deg * @math.PI / 180.0 +
    mean_motion_rad_s * elapsed_seconds
  let mut eccentric_anomaly = mean_anomaly
  for _ in 0..<10 {
    eccentric_anomaly = eccentric_anomaly -
      (
        eccentric_anomaly -
        elements.eccentricity * @math.sin(eccentric_anomaly) -
        mean_anomaly
      ) /
      (1.0 - elements.eccentricity * @math.cos(eccentric_anomaly))
  }
  let cos_e = @math.cos(eccentric_anomaly)
  let sin_e = @math.sin(eccentric_anomaly)
  let radius = semi_major_axis * (1.0 - elements.eccentricity * cos_e)
  let true_anomaly = @math.atan2(
    (1.0 - elements.eccentricity * elements.eccentricity).sqrt() * sin_e,
    cos_e - elements.eccentricity,
  )
  let cos_v = @math.cos(true_anomaly)
  let sin_v = @math.sin(true_anomaly)
  let perifocal_position = { x: radius * cos_v, y: radius * sin_v, z: 0.0 }
  let velocity_scale = semi_major_axis *
    mean_motion_rad_s /
    (1.0 - elements.eccentricity * cos_e)
  let perifocal_velocity = {
    x: -velocity_scale * sin_e,
    y: velocity_scale *
    (1.0 - elements.eccentricity * elements.eccentricity).sqrt() *
    cos_e,
    z: 0.0,
  }
  let cos_raan = @math.cos(raan)
  let sin_raan = @math.sin(raan)
  let cos_i = @math.cos(inclination)
  let sin_i = @math.sin(inclination)
  let cos_argument = @math.cos(argument)
  let sin_argument = @math.sin(argument)
  let rotate = (vector : Vector3) => {
    x: (cos_raan * cos_argument - sin_raan * sin_argument * cos_i) * vector.x +
    (-cos_raan * sin_argument - sin_raan * cos_argument * cos_i) * vector.y,
    y: (sin_raan * cos_argument + cos_raan * sin_argument * cos_i) * vector.x +
    (-sin_raan * sin_argument + cos_raan * cos_argument * cos_i) * vector.y,
    z: sin_argument * sin_i * vector.x + cos_argument * sin_i * vector.y,
  }
  Ok({
    epoch: instant,
    position_km: rotate(perifocal_position),
    velocity_km_s: rotate(perifocal_velocity),
  })
}
