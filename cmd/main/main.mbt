///|
fn print_usage() -> Unit {
  println("MoonSatKit - parse TLEs and inspect UTC timestamps")
  println("")
  println("Usage:")
  println("  moonsatkit tle validate <line1> <line2>")
  println("  moonsatkit time parse <YYYY-MM-DDTHH:MM[:SS]>")
}

///|
fn fail(message : String) -> Unit {
  println("error: \{message}")
  @sys.exit(2)
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
        Err(message) => fail(message)
      }
    }
    command => {
      fail("unknown command '\{command}'")
      print_usage()
    }
  }
}
