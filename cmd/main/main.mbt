///|
fn print_usage() -> Unit {
  println("MoonSatKit - satellite propagation and pass prediction CLI")
  println("")
  println("Usage:")
  println("  moonsatkit tle validate <line1> <line2>")
  println("  moonsatkit time parse <YYYY-MM-DDTHH:MM[:SS]>")
  println("  moonsatkit propagate <line1> <line2> --at <timestamp>")
  println(
    "  moonsatkit passes <line1> <line2> --station <lat,lon,alt_m> --from <timestamp> --hours <n> --min-elevation <deg> [--format json|csv]",
  )
  println(
    "  moonsatkit track <line1> <line2> --from <timestamp> --seconds <n> --step <n>",
  )
}

///|
fn fail(message : String) -> Unit {
  println("error: \{message}")
}

///|
fn parse_decimal(text : StringView) -> Double? {
  if text.is_empty() {
    return None
  }
  let mut sign = 1.0
  let mut value = 0.0
  let mut fraction_scale = 0.1
  let mut seen_digit = false
  let mut seen_decimal = false
  let mut valid = true
  let mut index = 0
  text
  .iter()
  .each(char => {
    if index == 0 && char == '-' {
      sign = -1.0
    } else if index == 0 && char == '+' {
      ()
    } else if char >= '0' && char <= '9' {
      seen_digit = true
      if seen_decimal {
        value = value +
          (char.to_int() - '0'.to_int()).to_double() * fraction_scale
        fraction_scale = fraction_scale * 0.1
      } else {
        value = value * 10.0 + (char.to_int() - '0'.to_int()).to_double()
      }
    } else if char == '.' && !seen_decimal {
      seen_decimal = true
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
fn parse_integer(text : StringView) -> Int? {
  if text.is_empty() {
    return None
  }
  let mut sign = 1
  let mut value = 0
  let mut seen_digit = false
  let mut valid = true
  let mut index = 0
  text
  .iter()
  .each(char => {
    if index == 0 && char == '-' {
      sign = -1
    } else if index == 0 && char == '+' {
      ()
    } else if char >= '0' && char <= '9' {
      seen_digit = true
      value = value * 10 + char.to_int() - '0'.to_int()
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
fn option_value(args : Array[String], name : String) -> String? {
  let mut index = 0
  let mut result : String? = None
  while index + 1 < args.length() {
    if args[index] == name {
      result = Some(args[index + 1])
    }
    index = index + 1
  }
  result
}

///|
fn parse_station(text : String) -> @lib.GroundStation? {
  let parts = text.split(",").to_array()
  if parts.length() != 3 {
    return None
  }
  let latitude = match parse_decimal(parts[0]) {
    Some(value) => value
    None => return None
  }
  let longitude = match parse_decimal(parts[1]) {
    Some(value) => value
    None => return None
  }
  let altitude = match parse_decimal(parts[2]) {
    Some(value) => value
    None => return None
  }
  Some({
    latitude_deg: latitude,
    longitude_deg: longitude,
    altitude_m: altitude,
  })
}

///|
fn parse_tle_args(args : Array[String]) -> Result[@lib.Tle, String] {
  if args.length() < 4 {
    return Err("expected two TLE lines")
  }
  match @lib.validate_tle(args[2], args[3]) {
    Ok(tle) => Ok(tle)
    Err(error) => Err(error.to_string())
  }
}

///|
fn run_propagate(args : Array[String]) -> Unit {
  if args.length() != 6 || args[4] != "--at" {
    fail("expected: propagate <line1> <line2> --at <timestamp>")
    return
  }
  let tle = match parse_tle_args(args) {
    Ok(value) => value
    Err(message) => {
      fail(message)
      return
    }
  }
  let instant = match @lib.parse_utc_datetime(args[5]) {
    Ok(value) => value
    Err(error) => {
      fail(error.to_string())
      return
    }
  }
  match @lib.propagate_sgp4(tle, instant) {
    Ok(state) => println(@lib.orbit_state_to_json(state))
    Err(error) => fail(error.to_string())
  }
}

///|
fn run_passes(args : Array[String]) -> Unit {
  let tle = match parse_tle_args(args) {
    Ok(value) => value
    Err(message) => {
      fail(message)
      return
    }
  }
  let station_text = match option_value(args, "--station") {
    Some(value) => value
    None => {
      fail("missing --station <lat,lon,alt_m>")
      return
    }
  }
  let station = match parse_station(station_text) {
    Some(value) => value
    None => {
      fail("invalid station; expected latitude,longitude,altitude_m")
      return
    }
  }
  let from_text = match option_value(args, "--from") {
    Some(value) => value
    None => {
      fail("missing --from <timestamp>")
      return
    }
  }
  let from = match @lib.parse_utc_datetime(from_text) {
    Ok(value) => value
    Err(error) => {
      fail(error.to_string())
      return
    }
  }
  let hours_text = match option_value(args, "--hours") {
    Some(value) => value
    None => {
      fail("missing --hours <n>")
      return
    }
  }
  let hours = match parse_integer(hours_text) {
    Some(value) => value
    None => {
      fail("hours must be an integer")
      return
    }
  }
  let minimum_text = match option_value(args, "--min-elevation") {
    Some(value) => value
    None => {
      fail("missing --min-elevation <deg>")
      return
    }
  }
  let minimum = match parse_decimal(minimum_text) {
    Some(value) => value
    None => {
      fail("minimum elevation must be a number")
      return
    }
  }
  let format = match option_value(args, "--format") {
    Some(value) => value
    None => "json"
  }
  let passes = match
    @lib.predict_passes_sgp4(tle, station, from, hours, minimum) {
    Ok(value) => value
    Err(error) => {
      fail(error.to_string())
      return
    }
  }
  match format {
    "json" => println(@lib.pass_windows_to_json(passes))
    "csv" => println(@lib.pass_windows_to_csv(passes))
    _ => fail("format must be json or csv")
  }
}

///|
fn run_track(args : Array[String]) -> Unit {
  let tle = match parse_tle_args(args) {
    Ok(value) => value
    Err(message) => {
      fail(message)
      return
    }
  }
  let from_text = match option_value(args, "--from") {
    Some(value) => value
    None => {
      fail("missing --from <timestamp>")
      return
    }
  }
  let from = match @lib.parse_utc_datetime(from_text) {
    Ok(value) => value
    Err(error) => {
      fail(error.to_string())
      return
    }
  }
  let seconds_text = match option_value(args, "--seconds") {
    Some(value) => value
    None => {
      fail("missing --seconds <n>")
      return
    }
  }
  let seconds = match parse_integer(seconds_text) {
    Some(value) => value
    None => {
      fail("seconds must be an integer")
      return
    }
  }
  let step_text = match option_value(args, "--step") {
    Some(value) => value
    None => {
      fail("missing --step <n>")
      return
    }
  }
  let step = match parse_integer(step_text) {
    Some(value) => value
    None => {
      fail("step must be an integer")
      return
    }
  }
  match @lib.track_geojson_sgp4(tle, from, seconds, step) {
    Ok(geojson) => println(geojson)
    Err(error) => fail(error.to_string())
  }
}

///|
fn main {
  let args = @env.args()
  if args.length() < 2 {
    print_usage()
    return
  }
  match args[1] {
    "help" | "--help" | "-h" => print_usage()
    "tle" => {
      if args.length() != 5 || args[2] != "validate" {
        fail("expected: tle validate <line1> <line2>")
        return
      }
      match @lib.validate_tle(args[3], args[4]) {
        Ok(_) => println("valid")
        Err(error) => fail(error.to_string())
      }
    }
    "time" => {
      if args.length() != 4 || args[2] != "parse" {
        fail("expected: time parse <timestamp>")
        return
      }
      match @lib.parse_utc_datetime(args[3]) {
        Ok(value) => println(value.to_string())
        Err(error) => fail(error.to_string())
      }
    }
    "propagate" => run_propagate(args)
    "passes" => run_passes(args)
    "track" => run_track(args)
    command => {
      fail("unknown command '\{command}'")
      print_usage()
    }
  }
}
