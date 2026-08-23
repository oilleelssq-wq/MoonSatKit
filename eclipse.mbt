///|
/// A geometric illumination classification for a satellite state.
///
/// `Penumbra` means the satellite is inside the Earth's partial shadow. The
/// model is intentionally geometric and is suitable for visibility analysis,
/// not for spacecraft power or mission-safety decisions.
pub(all) enum EclipseState {
  Sunlit
  Penumbra
  Umbra
} derive(Eq, Debug)

///|
/// Low-precision geocentric Sun position for visibility and eclipse analysis.
///
/// The position is expressed in the same J2000-style inertial frame used by
/// the library's ECI helpers. Distance is in kilometres, right ascension and
/// declination are in degrees, and distance_au is retained for diagnostics.
pub(all) struct SunPosition {
  position_km : Vector3
  distance_km : Double
  distance_au : Double
  right_ascension_deg : Double
  declination_deg : Double
} derive(Eq, Debug)

///|
pub fn EclipseState::to_string(self : EclipseState) -> String {
  match self {
    Sunlit => "sunlit"
    Penumbra => "penumbra"
    Umbra => "umbra"
  }
}

///|
/// Mean astronomical-unit length used by the low-precision solar model.
const ASTRONOMICAL_UNIT_KM : Double = 149597870.7

///|
/// Approximate solar radius used for the umbra and penumbra cones.
const SUN_RADIUS_KM : Double = 695700.0

///|
fn normalize_degrees(value : Double) -> Double {
  let wrapped = value % 360.0
  if wrapped < 0.0 {
    wrapped + 360.0
  } else {
    wrapped
  }
}

///|
/// Compute a low-precision geocentric Sun position.
///
/// This follows the compact NOAA-style solar position equations. It is
/// accurate enough for eclipse classification and educational visualisation;
/// high-precision ephemerides remain outside the current scope.
pub fn sun_position_eci(instant : UtcDateTime) -> SunPosition {
  let days_since_j2000 = julian_day(instant) - 2451545.0
  let mean_longitude_deg = normalize_degrees(
    280.460 + 0.9856474 * days_since_j2000,
  )
  let mean_anomaly_rad = normalize_degrees(
      357.528 + 0.9856003 * days_since_j2000,
    ) *
    @math.PI /
    180.0
  let ecliptic_longitude_rad = normalize_degrees(
      mean_longitude_deg +
      1.915 * @math.sin(mean_anomaly_rad) +
      0.020 * @math.sin(2.0 * mean_anomaly_rad),
    ) *
    @math.PI /
    180.0
  let obliquity_rad = (23.439 - 0.0000004 * days_since_j2000) * @math.PI / 180.0
  let distance_au = 1.00014 -
    0.01671 * @math.cos(mean_anomaly_rad) -
    0.00014 * @math.cos(2.0 * mean_anomaly_rad)
  let distance_km = distance_au * ASTRONOMICAL_UNIT_KM
  let cosine_longitude = @math.cos(ecliptic_longitude_rad)
  let sine_longitude = @math.sin(ecliptic_longitude_rad)
  let position = {
    x: distance_km * cosine_longitude,
    y: distance_km * @math.cos(obliquity_rad) * sine_longitude,
    z: distance_km * @math.sin(obliquity_rad) * sine_longitude,
  }
  let right_ascension = @math.atan2(position.y, position.x) * 180.0 / @math.PI
  let declination = @math.atan2(
      position.z,
      (position.x * position.x + position.y * position.y).sqrt(),
    ) *
    180.0 /
    @math.PI
  {
    position_km: position,
    distance_km,
    distance_au,
    right_ascension_deg: normalize_degrees(right_ascension),
    declination_deg: declination,
  }
}

///|
/// Classify whether a satellite is sunlit, in the penumbra, or in the umbra.
///
/// The Earth is modelled as a sphere with WGS-84's equatorial radius. The
/// solar umbra and penumbra are treated as cones whose apexes are determined
/// by the apparent Sun and Earth radii.
pub fn eclipse_state(state : OrbitState) -> EclipseState {
  let sun = sun_position_eci(state.epoch)
  let sun_direction = sun.position_km.scale(1.0 / sun.distance_km)
  let projection = state.position_km.dot(sun_direction)
  if projection >= 0.0 {
    return Sunlit
  }
  let behind_earth_km = -projection
  let perpendicular_vector = state.position_km.sub(
    sun_direction.scale(projection),
  )
  let perpendicular_distance_km = perpendicular_vector
    .dot(perpendicular_vector)
    .sqrt()
  let earth_radius_km = 6378.137
  let umbra_radius_km = earth_radius_km -
    behind_earth_km * (SUN_RADIUS_KM - earth_radius_km) / sun.distance_km
  let penumbra_radius_km = earth_radius_km +
    behind_earth_km * (SUN_RADIUS_KM + earth_radius_km) / sun.distance_km
  if umbra_radius_km > 0.0 && perpendicular_distance_km <= umbra_radius_km {
    Umbra
  } else if perpendicular_distance_km <= penumbra_radius_km {
    Penumbra
  } else {
    Sunlit
  }
}

///|
/// Propagate a TLE and classify its illumination at the requested instant.
pub fn eclipse_state_sgp4(
  tle : Tle,
  instant : UtcDateTime,
) -> Result[EclipseState, SatError] {
  match propagate_sgp4(tle, instant) {
    Ok(state) => Ok(eclipse_state(state))
    Err(error) => Err(error)
  }
}
