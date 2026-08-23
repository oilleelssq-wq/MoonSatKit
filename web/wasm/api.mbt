///|
fn error_json(error : @lib.SatError) -> String {
  "{\"ok\":false,\"error\":\"\{error.to_string()}\"}"
}

///|
#export_name("moon_sat_validate_tle")
pub fn moon_sat_validate_tle(line1 : String, line2 : String) -> String {
  match @lib.validate_tle(line1, line2) {
    Ok(tle) => "{\"ok\":true,\"catalog_number\":\{tle.catalog_number}}"
    Err(error) => error_json(error)
  }
}

///|
#export_name("moon_sat_track_geojson")
pub fn moon_sat_track_geojson(
  line1 : String,
  line2 : String,
  from_text : String,
  duration_seconds : Int,
  step_seconds : Int,
) -> String {
  let tle = match @lib.validate_tle(line1, line2) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let from = match @lib.parse_utc_datetime(from_text) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  match @lib.track_geojson_sgp4(tle, from, duration_seconds, step_seconds) {
    Ok(value) => "{\"ok\":true,\"track\":" + value + "}"
    Err(error) => error_json(error)
  }
}

///|
#export_name("moon_sat_passes_json")
pub fn moon_sat_passes_json(
  line1 : String,
  line2 : String,
  station_latitude_deg : Double,
  station_longitude_deg : Double,
  station_altitude_m : Double,
  from_text : String,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> String {
  let tle = match @lib.validate_tle(line1, line2) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let from = match @lib.parse_utc_datetime(from_text) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let station : @lib.GroundStation = {
    latitude_deg: station_latitude_deg,
    longitude_deg: station_longitude_deg,
    altitude_m: station_altitude_m,
  }
  match
    @lib.predict_passes_sgp4(
      tle, station, from, duration_hours, minimum_elevation_deg,
    ) {
    Ok(passes) =>
      "{\"ok\":true,\"passes\":" + @lib.pass_windows_to_json(passes) + "}"
    Err(error) => error_json(error)
  }
}

///|
#export_name("moon_sat_eclipse_json")
pub fn moon_sat_eclipse_json(
  line1 : String,
  line2 : String,
  instant_text : String,
) -> String {
  let tle = match @lib.validate_tle(line1, line2) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let instant = match @lib.parse_utc_datetime(instant_text) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  match @lib.eclipse_report_to_json(tle, instant) {
    Ok(value) => value
    Err(error) => error_json(error)
  }
}

///|
#export_name("moon_sat_catalog_passes_json")
pub fn moon_sat_catalog_passes_json(
  catalog_text : String,
  station_latitude_deg : Double,
  station_longitude_deg : Double,
  station_altitude_m : Double,
  from_text : String,
  duration_hours : Int,
  minimum_elevation_deg : Double,
) -> String {
  let entries = match @lib.parse_tle_catalog(catalog_text) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let from = match @lib.parse_utc_datetime(from_text) {
    Ok(value) => value
    Err(error) => return error_json(error)
  }
  let station : @lib.GroundStation = {
    latitude_deg: station_latitude_deg,
    longitude_deg: station_longitude_deg,
    altitude_m: station_altitude_m,
  }
  match
    @lib.predict_catalog_passes_sgp4(
      entries, station, from, duration_hours, minimum_elevation_deg,
    ) {
    Ok(passes) =>
      "{\"ok\":true,\"passes\":" +
      @lib.catalog_pass_windows_to_json(passes) +
      "}"
    Err(error) => error_json(error)
  }
}
