///|
/// A named TLE entry loaded from a two-line or three-line catalog.
pub(all) struct TleCatalogEntry {
  name : String
  tle : Tle
} derive(Eq, Debug)

///|
fn catalog_error(line : Int, message : String, fragment : String) -> SatError {
  SatError::new(InvalidFormat, message, fragment~, line~)
}

///|
fn catalog_lines(text : String) -> Array[(Int, String)] {
  let result : Array[(Int, String)] = []
  let mut line_number = 0
  for line in text.split("\n") {
    line_number = line_number + 1
    let value = line.trim().to_owned()
    if !value.is_empty() && !value.view().has_prefix("#") {
      result.push((line_number, value))
    }
  }
  result
}

///|
fn default_catalog_name(tle : Tle) -> String {
  "NORAD \{tle.catalog_number}"
}

///|
/// Parse a catalog containing either repeated two-line TLE records or the
/// common three-line format with a satellite name before each pair.
///
/// Blank lines are ignored. Named records keep their display name; unnamed
/// records receive a NORAD name.
pub fn parse_tle_catalog(
  text : String,
) -> Result[Array[TleCatalogEntry], SatError] {
  let lines = catalog_lines(text)
  if lines.is_empty() {
    return Err(SatError::new(EmptyInput, "TLE catalog must not be empty"))
  }
  let entries : Array[TleCatalogEntry] = []
  let mut index = 0
  while index < lines.length() {
    let (line_number, first) = lines[index]
    let (name, line1_number, line1) = if first.view().has_prefix("1 ") {
      ("", line_number, first)
    } else {
      index = index + 1
      if index >= lines.length() {
        return Err(
          catalog_error(line_number, "catalog name is missing TLE lines", first),
        )
      }
      let (number, value) = lines[index]
      if !value.view().has_prefix("1 ") {
        return Err(
          catalog_error(number, "expected TLE line 1 after catalog name", value),
        )
      }
      (first, number, value)
    }
    index = index + 1
    if index >= lines.length() {
      return Err(catalog_error(line1_number, "TLE line 2 is missing", line1))
    }
    let (line2_number, line2) = lines[index]
    if !line2.view().has_prefix("2 ") {
      return Err(catalog_error(line2_number, "expected TLE line 2", line2))
    }
    let tle = match validate_tle(line1, line2) {
      Ok(value) => value
      Err(error) =>
        return Err(
          catalog_error(
            line1_number,
            "invalid TLE catalog entry: \{error.to_string()}",
            line1,
          ),
        )
    }
    let display_name = if name.is_empty() {
      default_catalog_name(tle)
    } else {
      name
    }
    entries.push({ name: display_name, tle })
    index = index + 1
  }
  Ok(entries)
}

///|
/// Predict SGP4 pass windows for every entry in a named TLE catalog.
pub fn predict_catalog_passes_sgp4(
  entries : Array[TleCatalogEntry],
  station : GroundStation,
  from : UtcDateTime,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> Result[Array[CatalogPassWindow], SatError] {
  let result : Array[CatalogPassWindow] = []
  for entry in entries {
    let windows = match
      predict_passes_sgp4(
        entry.tle,
        station,
        from,
        duration_hours,
        minimum_elevation_deg,
      ) {
      Ok(value) => value
      Err(error) => return Err(error)
    }
    for window in windows {
      result.push({
        name: entry.name,
        catalog_number: entry.tle.catalog_number,
        window,
      })
    }
  }
  Ok(result)
}
