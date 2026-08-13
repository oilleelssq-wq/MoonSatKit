///|
test "checksum helper follows tle rules" {
  let line = "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9990"
  assert_eq(checksum_value(line), 0)
  assert_true(checksum_ok(line))
}

///|
test "validate_tle rejects bad checksum digits" {
  let line1 = "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9991"
  let line2 = "2 25544  51.6416  21.0000 0001234 123.4567 234.5678 15.50000000"
  assert_true(validate_tle(line1, line2) is Err(_))
}

///|
test "official verification sample passes checksum validation" {
  let line1 = "1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753"
  let line2 = "2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667"
  let tle = validate_tle(
    line1,
    line2,
  ).unwrap()
  assert_eq(tle.catalog_number, 5)
  assert_true(tle.checksum_line1_ok)
  assert_true(tle.checksum_line2_ok)
}
