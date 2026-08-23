///|
pub(all) enum SatErrorKind {
  EmptyInput
  InvalidFormat
  InvalidChecksum
  InvalidCatalogNumber
  MismatchedCatalogNumber
  InvalidTleNumber
  UnsupportedOrbit
  PropagationError
  InvalidDateTime
  OutOfRange
} derive(Eq, Debug)

///|
pub(all) struct SatError {
  kind : SatErrorKind
  line : Int
  fragment : String
  message : String
} derive(Eq, Debug)

///|
pub fn SatError::new(
  kind : SatErrorKind,
  message : String,
  fragment? : String = "",
  line? : Int = 0,
) -> SatError {
  { kind, line, fragment, message }
}

///|
pub fn SatError::to_string(self : SatError) -> String {
  if self.line <= 0 {
    self.message
  } else {
    "line \{self.line}: \{self.message} (\{self.fragment})"
  }
}

///|
pub(all) struct Tle {
  line1 : String
  line2 : String
  catalog_number : Int
  epoch : String
  inclination : String
  right_ascension : String
  eccentricity : String
  argument_of_perigee : String
  mean_anomaly : String
  mean_motion : String
  mean_motion_first_derivative : String
  mean_motion_second_derivative : String
  bstar : String
  checksum_line1_ok : Bool
  checksum_line2_ok : Bool
} derive(Eq, Debug)

///|
pub(all) struct UtcDateTime {
  year : Int
  month : Int
  day : Int
  hour : Int
  minute : Int
  second : Int
} derive(Eq, Compare, Debug)

///|
pub fn UtcDateTime::to_string(self : UtcDateTime) -> String {
  "\{pad4(self.year)}-\{pad2(self.month)}-\{pad2(self.day)} \{pad2(self.hour)}:\{pad2(self.minute)}:\{pad2(self.second)}"
}

///|
pub(all) struct Vector3 {
  x : Double
  y : Double
  z : Double
} derive(Eq, Debug)

///|
pub(all) struct GroundStation {
  latitude_deg : Double
  longitude_deg : Double
  altitude_m : Double
} derive(Eq, Debug)

///|
pub(all) struct Observation {
  azimuth_deg : Double
  elevation_deg : Double
  range_km : Double
  range_rate_km_s : Double
  above_horizon : Bool
} derive(Eq, Debug)

///|
pub(all) struct PassWindow {
  aos : UtcDateTime
  tca : UtcDateTime
  los : UtcDateTime
  maximum_elevation_deg : Double
} derive(Eq, Debug)

///|
/// Return the visible duration of a pass in integral seconds.
pub fn PassWindow::duration_seconds(self : PassWindow) -> Int {
  seconds_between(self.aos, self.los).to_int()
}

///|
/// A pass window associated with one entry in a TLE catalog.
pub(all) struct CatalogPassWindow {
  name : String
  catalog_number : Int
  window : PassWindow
} derive(Eq, Debug)

///|
fn pad2(value : Int) -> String {
  if value < 10 {
    "0\{value}"
  } else {
    "\{value}"
  }
}

///|
/// Numerical orbital elements decoded from a TLE.
///
/// The elements retain the TLE epoch and angular fields in conventional
/// units. They are suitable for the two-body preview propagator and form the
/// input boundary for the future SGP4 implementation.
pub(all) struct OrbitElements {
  catalog_number : Int
  epoch : UtcDateTime
  epoch_julian_day : Double
  inclination_deg : Double
  right_ascension_deg : Double
  eccentricity : Double
  argument_of_perigee_deg : Double
  mean_anomaly_deg : Double
  mean_motion_rev_per_day : Double
  mean_motion_rad_per_min : Double
}

///|
/// Numerical TLE fields required to initialize an SGP4 propagator.
///
/// Angles are stored in radians. The derivative fields retain the TLE
/// conventions: revolutions per day squared and the second derivative divided
/// by two in revolutions per day cubed. BSTAR is dimensionless.
pub(all) struct Sgp4Elements {
  catalog_number : Int
  epoch : UtcDateTime
  epoch_julian_day : Double
  inclination_rad : Double
  right_ascension_rad : Double
  eccentricity : Double
  argument_of_perigee_rad : Double
  mean_anomaly_rad : Double
  mean_motion_rad_per_min : Double
  mean_motion_first_derivative_rev_per_day2 : Double
  mean_motion_second_derivative_div2_rev_per_day3 : Double
  bstar : Double
}

///|
/// An inertial state expressed in kilometres and kilometres per second.
pub(all) struct OrbitState {
  epoch : UtcDateTime
  position_km : Vector3
  velocity_km_s : Vector3
}

///|
/// A state expressed in the Earth-fixed frame, in kilometres and kilometres per second.
pub(all) struct EcefState {
  epoch : UtcDateTime
  position_km : Vector3
  velocity_km_s : Vector3
}

///|
/// A WGS-84 geodetic position. Longitude is positive east and altitude is in kilometres.
pub(all) struct GeodeticPosition {
  latitude_deg : Double
  longitude_deg : Double
  altitude_km : Double
}

///|
fn pad4(value : Int) -> String {
  if value < 10 {
    "000\{value}"
  } else if value < 100 {
    "00\{value}"
  } else if value < 1000 {
    "0\{value}"
  } else {
    "\{value}"
  }
}
