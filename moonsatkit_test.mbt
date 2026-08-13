///|
test "parse a timestamp and advance one second" {
  let value = @moonsatkit.parse_utc_datetime("2026-08-11T12:00:59").unwrap()
  inspect(value.to_string(), content="2026-08-11 12:00:59")
  inspect(value.next_second().to_string(), content="2026-08-11 12:01:00")
}

///|
test "calendar helpers behave around leap years" {
  assert_true(@moonsatkit.is_leap_year(2024))
  assert_false(@moonsatkit.is_leap_year(2100))
  assert_eq(@moonsatkit.days_in_month(2024, 2), 29)
  assert_eq(@moonsatkit.days_in_month(2025, 2), 28)
}

///|
test "parse a synthetic TLE payload" {
  let line1 = "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9990"
  let line2 = "2 25544  51.6416  21.0000 0001234 123.4567 234.5678 15.50000000"
  let tle = @moonsatkit.parse_tle(line1, line2).unwrap()
  assert_eq(tle.catalog_number, 25544)
  assert_eq(tle.epoch, "26224.50000000")
}

///|
test "reject mismatched catalog numbers" {
  let line1 = "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9991"
  let line2 = "2 12345  51.6416  21.0000 0001234 123.4567 234.5678 15.50000000"
  assert_true(@moonsatkit.parse_tle(line1, line2) is Err(_))
}
