///|
/// Compute the local ENU observation of an Earth-fixed satellite state.
///
/// Azimuth is measured clockwise from north in degrees. Elevation is measured
/// above the local horizon. Range and range rate use kilometres and kilometres
/// per second, respectively.
pub fn observe_ecef(state : EcefState, station : GroundStation) -> Observation {
  let station_position = ground_station_to_ecef(station)
  let relative_position = state.position_km.sub(station_position)
  let latitude = station.latitude_deg * @math.PI / 180.0
  let longitude = station.longitude_deg * @math.PI / 180.0
  let sine_latitude = @math.sin(latitude)
  let cosine_latitude = @math.cos(latitude)
  let sine_longitude = @math.sin(longitude)
  let cosine_longitude = @math.cos(longitude)

  // Rotate the station-relative ECEF vector into east, north, up axes.
  let east = -sine_longitude * relative_position.x +
    cosine_longitude * relative_position.y
  let north = -sine_latitude * cosine_longitude * relative_position.x -
    sine_latitude * sine_longitude * relative_position.y +
    cosine_latitude * relative_position.z
  let up = cosine_latitude * cosine_longitude * relative_position.x +
    cosine_latitude * sine_longitude * relative_position.y +
    sine_latitude * relative_position.z
  let horizontal_range = (east * east + north * north).sqrt()
  let range = (horizontal_range * horizontal_range + up * up).sqrt()
  let angle_epsilon = 0.000000000001
  let azimuth = if horizontal_range < angle_epsilon {
    0.0
  } else {
    let raw_degrees = @math.atan2(east, north) * 180.0 / @math.PI
    normalize_observation_degrees(raw_degrees)
  }
  let elevation = if range < angle_epsilon {
    90.0
  } else {
    @math.atan2(up, horizontal_range) * 180.0 / @math.PI
  }
  let range_rate = if range < angle_epsilon {
    0.0
  } else {
    relative_position.dot(state.velocity_km_s) / range
  }
  {
    azimuth_deg: azimuth,
    elevation_deg: elevation,
    range_km: range,
    range_rate_km_s: range_rate,
    above_horizon: elevation >= 0.0,
  }
}

///|
/// Compute an observation from an inertial state by applying the ECI/ECEF
/// transformation at the state's epoch first.
pub fn observe(state : OrbitState, station : GroundStation) -> Observation {
  observe_ecef(eci_to_ecef_state(state), station)
}

///|
fn normalize_observation_degrees(angle : Double) -> Double {
  let wrapped = angle % 360.0
  if wrapped < 0.0 {
    wrapped + 360.0
  } else {
    wrapped
  }
}
