///|
const WGS84_EQUATORIAL_RADIUS_KM : Double = 6378.137

///|
const WGS84_FLATTENING : Double = 1.0 / 298.257223563

///|
const EARTH_ROTATION_RATE_RAD_S : Double = 7.2921151467e-5

///|
fn normalize_radians(angle : Double) -> Double {
  let two_pi = 2.0 * @math.PI
  let wrapped = angle % two_pi
  if wrapped < 0.0 {
    wrapped + two_pi
  } else {
    wrapped
  }
}

///|
/// Compute Greenwich mean sidereal time from an astronomical Julian Day.
///
/// The result is a normalized angle in radians in the range [0, 2*pi).
pub fn gmst_angle(julian_day_value : Double) -> Double {
  let centuries = (julian_day_value - 2451545.0) / 36525.0
  let degrees = 280.46061837 +
    360.98564736629 * (julian_day_value - 2451545.0) +
    0.000387933 * centuries * centuries -
    centuries * centuries * centuries / 38710000.0
  normalize_radians(degrees * @math.PI / 180.0)
}

///|
/// Compute Greenwich mean sidereal time for a UTC timestamp.
pub fn greenwich_mean_sidereal_time(value : UtcDateTime) -> Double {
  gmst_angle(julian_day(value))
}

///|
/// Rotate an ECI position into the Earth-fixed frame at the given instant.
pub fn eci_to_ecef(position : Vector3, instant : UtcDateTime) -> Vector3 {
  let theta = greenwich_mean_sidereal_time(instant)
  let cosine = @math.cos(theta)
  let sine = @math.sin(theta)
  {
    x: cosine * position.x + sine * position.y,
    y: -sine * position.x + cosine * position.y,
    z: position.z,
  }
}

///|
/// Rotate an Earth-fixed position into the inertial frame at the given instant.
pub fn ecef_to_eci(position : Vector3, instant : UtcDateTime) -> Vector3 {
  let theta = greenwich_mean_sidereal_time(instant)
  let cosine = @math.cos(theta)
  let sine = @math.sin(theta)
  {
    x: cosine * position.x - sine * position.y,
    y: sine * position.x + cosine * position.y,
    z: position.z,
  }
}

///|
/// Convert an inertial state to an Earth-fixed state, including Earth rotation.
pub fn eci_to_ecef_state(state : OrbitState) -> EcefState {
  let theta = greenwich_mean_sidereal_time(state.epoch)
  let cosine = @math.cos(theta)
  let sine = @math.sin(theta)
  let rotation_adjusted_velocity = {
    x: state.velocity_km_s.x + EARTH_ROTATION_RATE_RAD_S * state.position_km.y,
    y: state.velocity_km_s.y - EARTH_ROTATION_RATE_RAD_S * state.position_km.x,
    z: state.velocity_km_s.z,
  }
  {
    epoch: state.epoch,
    position_km: eci_to_ecef(state.position_km, state.epoch),
    velocity_km_s: {
      x: cosine * rotation_adjusted_velocity.x +
      sine * rotation_adjusted_velocity.y,
      y: -sine * rotation_adjusted_velocity.x +
      cosine * rotation_adjusted_velocity.y,
      z: rotation_adjusted_velocity.z,
    },
  }
}

///|
/// Convert an Earth-fixed state to an inertial state, including Earth rotation.
pub fn ecef_to_eci_state(state : EcefState) -> OrbitState {
  let position = ecef_to_eci(state.position_km, state.epoch)
  let theta = greenwich_mean_sidereal_time(state.epoch)
  let cosine = @math.cos(theta)
  let sine = @math.sin(theta)
  let inertial_velocity_without_rotation = {
    x: cosine * state.velocity_km_s.x - sine * state.velocity_km_s.y,
    y: sine * state.velocity_km_s.x + cosine * state.velocity_km_s.y,
    z: state.velocity_km_s.z,
  }
  {
    epoch: state.epoch,
    position_km: position,
    velocity_km_s: {
      x: inertial_velocity_without_rotation.x -
      EARTH_ROTATION_RATE_RAD_S * position.y,
      y: inertial_velocity_without_rotation.y +
      EARTH_ROTATION_RATE_RAD_S * position.x,
      z: inertial_velocity_without_rotation.z,
    },
  }
}

///|
/// Convert a WGS-84 geodetic position to Earth-fixed Cartesian coordinates.
pub fn geodetic_to_ecef(value : GeodeticPosition) -> Vector3 {
  let flattening = WGS84_FLATTENING
  let eccentricity_squared = flattening * (2.0 - flattening)
  let latitude = value.latitude_deg * @math.PI / 180.0
  let longitude = value.longitude_deg * @math.PI / 180.0
  let sine_latitude = @math.sin(latitude)
  let cosine_latitude = @math.cos(latitude)
  let prime_vertical_radius = WGS84_EQUATORIAL_RADIUS_KM /
    (1.0 - eccentricity_squared * sine_latitude * sine_latitude).sqrt()
  let radius = prime_vertical_radius + value.altitude_km
  {
    x: radius * cosine_latitude * @math.cos(longitude),
    y: radius * cosine_latitude * @math.sin(longitude),
    z: (
      prime_vertical_radius * (1.0 - eccentricity_squared) + value.altitude_km
    ) *
    sine_latitude,
  }
}

///|
/// Convert a ground station height in metres to Earth-fixed Cartesian coordinates.
pub fn ground_station_to_ecef(station : GroundStation) -> Vector3 {
  geodetic_to_ecef({
    latitude_deg: station.latitude_deg,
    longitude_deg: station.longitude_deg,
    altitude_km: station.altitude_m / 1000.0,
  })
}

///|
/// Convert Earth-fixed Cartesian coordinates to WGS-84 geodetic coordinates.
pub fn ecef_to_geodetic(position : Vector3) -> GeodeticPosition {
  let flattening = WGS84_FLATTENING
  let eccentricity_squared = flattening * (2.0 - flattening)
  let semi_minor_axis = WGS84_EQUATORIAL_RADIUS_KM * (1.0 - flattening)
  let distance_from_axis = (position.x * position.x + position.y * position.y).sqrt()
  if distance_from_axis < 0.000000000001 {
    let latitude = if position.z < 0.0 { -90.0 } else { 90.0 }
    {
      latitude_deg: latitude,
      longitude_deg: 0.0,
      altitude_km: position.z.abs() - semi_minor_axis,
    }
  } else {
    let longitude = @math.atan2(position.y, position.x)
    let mut latitude = @math.atan2(
      position.z,
      distance_from_axis * (1.0 - eccentricity_squared),
    )
    for _ in 0..<8 {
      let sine_latitude = @math.sin(latitude)
      let prime_vertical_radius = WGS84_EQUATORIAL_RADIUS_KM /
        (1.0 - eccentricity_squared * sine_latitude * sine_latitude).sqrt()
      let altitude = distance_from_axis / @math.cos(latitude) -
        prime_vertical_radius
      latitude = @math.atan2(
        position.z,
        distance_from_axis *
        (
          1.0 -
          eccentricity_squared *
          prime_vertical_radius /
          (prime_vertical_radius + altitude)
        ),
      )
    }
    let sine_latitude = @math.sin(latitude)
    let prime_vertical_radius = WGS84_EQUATORIAL_RADIUS_KM /
      (1.0 - eccentricity_squared * sine_latitude * sine_latitude).sqrt()
    let altitude = distance_from_axis / @math.cos(latitude) -
      prime_vertical_radius
    {
      latitude_deg: latitude * 180.0 / @math.PI,
      longitude_deg: longitude * 180.0 / @math.PI,
      altitude_km: altitude,
    }
  }
}

///|
/// Convert an inertial state position to WGS-84 geodetic coordinates.
pub fn orbit_state_geodetic(state : OrbitState) -> GeodeticPosition {
  ecef_to_geodetic(eci_to_ecef(state.position_km, state.epoch))
}
