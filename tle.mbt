///|
fn tle_error(
  kind : SatErrorKind,
  line : Int,
  fragment : StringView,
  message : String,
) -> SatError {
  SatError::new(kind, message, fragment=fragment.to_owned(), line~)
}

///|
fn parse_tle_decimal(text : StringView) -> Int? {
  if text.is_empty() {
    return None
  }
  let mut value = 0
  let mut valid = true
  text
  .iter()
  .each(char => {
    if char >= '0' && char <= '9' {
      value = value * 10 + (char.to_int() - '0'.to_int())
    } else {
      valid = false
    }
  })
  if valid {
    Some(value)
  } else {
    None
  }
}

///|
fn split_fields(line : StringView) -> Array[StringView] {
  line.trim().split(" ").filter(part => !part.is_empty()).to_array()
}

///|
fn parse_catalog_number(token : StringView) -> Int? {
  if token.is_empty() {
    return None
  }
  let mut value = 0
  let mut seen_digit = false
  let mut finished = false
  let mut valid = true
  token
  .iter()
  .each(char => {
    if finished {
      ()
    } else if char >= '0' && char <= '9' {
      seen_digit = true
      value = value * 10 + (char.to_int() - '0'.to_int())
    } else if seen_digit {
      finished = true
    } else {
      valid = false
    }
  })
  if valid && seen_digit {
    Some(value)
  } else {
    None
  }
}

///|
fn checksum_digit(line : StringView) -> Int? {
  let len = line.length()
  let mut index = 0
  let mut result : Int? = None
  line
  .iter()
  .each(char => {
    if index == len - 1 {
      if char >= '0' && char <= '9' {
        result = Some(char.to_int() - '0'.to_int())
      } else {
        result = None
      }
    }
    index = index + 1
  })
  result
}

///|
fn checksum_value(line : StringView) -> Int {
  let len = line.length()
  let mut index = 0
  let mut total = 0
  line
  .iter()
  .each(char => {
    if index < len - 1 {
      if char >= '0' && char <= '9' {
        total = total + (char.to_int() - '0'.to_int())
      } else if char == '-' {
        total = total + 1
      }
    }
    index = index + 1
  })
  total % 10
}

///|
fn checksum_ok(line : StringView) -> Bool {
  match checksum_digit(line) {
    Some(expected) => checksum_value(line) == expected
    None => false
  }
}

///|
fn field_at(
  fields : Array[StringView],
  index : Int,
  label : String,
) -> Result[StringView, SatError] {
  if index < 0 || index >= fields.length() {
    Err(tle_error(InvalidFormat, 0, label, "missing TLE field"))
  } else {
    Ok(fields[index])
  }
}

///|
fn parse_core_tle(line1 : String, line2 : String) -> Result[Tle, SatError] {
  let fields1 = split_fields(line1)
  let fields2 = split_fields(line2)
  if fields1.length() < 9 || fields2.length() < 8 {
    return Err(
      tle_error(
        InvalidFormat,
        0,
        line1,
        "TLE lines do not contain enough fields",
      ),
    )
  }
  if fields1[0] != "1" || fields2[0] != "2" {
    return Err(
      tle_error(InvalidFormat, 0, line1, "TLE lines must begin with 1 and 2"),
    )
  }
  let catalog1 = match parse_catalog_number(fields1[1]) {
    Some(value) => value
    None =>
      return Err(
        tle_error(InvalidCatalogNumber, 1, fields1[1], "invalid catalog number"),
      )
  }
  let catalog2 = match parse_tle_decimal(fields2[1]) {
    Some(value) => value
    None =>
      return Err(
        tle_error(InvalidCatalogNumber, 2, fields2[1], "invalid catalog number"),
      )
  }
  if catalog1 != catalog2 {
    return Err(
      tle_error(
        MismatchedCatalogNumber,
        2,
        fields2[1],
        "catalog numbers do not match",
      ),
    )
  }
  let mean_motion_index = if fields2.length() > 7 {
    7
  } else {
    fields2.length() - 1
  }
  let epoch = match field_at(fields1, 3, "epoch") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let inclination = match field_at(fields2, 2, "inclination") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let right_ascension = match field_at(fields2, 3, "right_ascension") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let eccentricity = match field_at(fields2, 4, "eccentricity") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let argument_of_perigee = match field_at(fields2, 5, "argument_of_perigee") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let mean_anomaly = match field_at(fields2, 6, "mean_anomaly") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let mean_motion = match field_at(fields2, mean_motion_index, "mean_motion") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let mean_motion_first_derivative = match
    field_at(fields1, 4, "mean_motion_first_derivative") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let mean_motion_second_derivative = match
    field_at(fields1, 5, "mean_motion_second_derivative") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let bstar = match field_at(fields1, 6, "bstar") {
    Ok(value) => value.to_owned()
    Err(error) => return Err(error)
  }
  let line1_ok = checksum_ok(line1)
  let line2_ok = checksum_ok(line2)
  Ok({
    line1,
    line2,
    catalog_number: catalog1,
    epoch,
    inclination,
    right_ascension,
    eccentricity,
    argument_of_perigee,
    mean_anomaly,
    mean_motion,
    mean_motion_first_derivative,
    mean_motion_second_derivative,
    bstar,
    checksum_line1_ok: line1_ok,
    checksum_line2_ok: line2_ok,
  })
}

///|
/// Parse a two-line element set and preserve the raw orbital fields.
pub fn parse_tle(line1 : String, line2 : String) -> Result[Tle, SatError] {
  parse_core_tle(line1, line2)
}

///|
/// Parse and require both TLE checksum digits to be valid.
pub fn validate_tle(line1 : String, line2 : String) -> Result[Tle, SatError] {
  let tle = match parse_core_tle(line1, line2) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  if !tle.checksum_line1_ok {
    return Err(
      tle_error(InvalidChecksum, 1, tle.line1, "line 1 checksum mismatch"),
    )
  }
  if !tle.checksum_line2_ok {
    return Err(
      tle_error(InvalidChecksum, 2, tle.line2, "line 2 checksum mismatch"),
    )
  }
  Ok(tle)
}
