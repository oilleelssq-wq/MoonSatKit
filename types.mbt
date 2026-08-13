///|
pub(all) enum SatErrorKind {
  EmptyInput
  InvalidFormat
  InvalidChecksum
  InvalidCatalogNumber
  MismatchedCatalogNumber
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
fn pad2(value : Int) -> String {
  if value < 10 {
    "0\{value}"
  } else {
    "\{value}"
  }
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
