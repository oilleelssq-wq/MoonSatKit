///|
test "parse a timestamp and advance one second" {
  let value = @moonsatkit.parse_utc_datetime("2026-08-11T12:00:59").unwrap()
  inspect(value.to_string(), content="2026-08-11 12:00:59")
  inspect(value.next_second().to_string(), content="2026-08-11 12:01:00")
}

///|
test "timestamp parsing returns structured errors" {
  let error = match @moonsatkit.parse_utc_datetime("") {
    Ok(_) => abort("expected an error")
    Err(error) => error
  }
  assert_eq(error.kind, @moonsatkit.EmptyInput)
  inspect(error.to_string(), content="timestamp must not be empty")
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
test "parse an official TLE verification sample" {
  let tle = @moonsatkit.parse_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  assert_eq(tle.catalog_number, 5)
  assert_eq(tle.epoch, "00179.78495062")
  assert_true(tle.checksum_line1_ok)
  assert_true(tle.checksum_line2_ok)
}

///|
test "parse SGP4 metadata fields" {
  let tle = @moonsatkit.parse_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  assert_eq(tle.mean_motion_first_derivative, ".00000023")
  assert_eq(tle.mean_motion_second_derivative, "00000-0")
  assert_eq(tle.bstar, "28098-4")
}

///|
test "decode SGP4 initialization fields" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let elements = @moonsatkit.sgp4_elements(tle).unwrap()
  assert_eq(elements.catalog_number, 5)
  assert_true(
    (elements.mean_motion_first_derivative_rev_per_day2 - 0.00000023).abs() <
    0.0000000001,
  )
  assert_true(
    elements.mean_motion_second_derivative_div2_rev_per_day3.abs() <
    0.0000000001,
  )
  assert_true((elements.bstar - 0.000028098).abs() < 0.000000000001)
  assert_true((elements.inclination_rad - 0.598092919).abs() < 0.000000001)
}

///|
test "reject mismatched catalog numbers" {
  let line1 = "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9991"
  let line2 = "2 12345  51.6416  21.0000 0001234 123.4567 234.5678 15.50000000"
  assert_true(@moonsatkit.parse_tle(line1, line2) is Err(_))
}

///|
test "julian day uses the astronomical noon convention" {
  let value = @moonsatkit.parse_utc_datetime("2000-01-01T12:00:00").unwrap()
  assert_true(@moonsatkit.julian_day(value) - 2451545.0 < 0.0000001)
  assert_true(2451545.0 - @moonsatkit.julian_day(value) < 0.0000001)
}

///|
test "orbit elements decode the Vallado sample" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let elements = @moonsatkit.orbit_elements(tle).unwrap()
  assert_eq(elements.catalog_number, 5)
  assert_eq(elements.epoch.year, 2000)
  assert_eq(elements.epoch.month, 6)
  assert_eq(elements.epoch.day, 27)
  assert_true(elements.eccentricity - 0.1859667 < 0.0000001)
  assert_true(0.1859667 - elements.eccentricity < 0.0000001)
  assert_true(
    elements.mean_motion_rev_per_day - 10.82419157413667 < 0.0000000001,
  )
  assert_true(
    10.82419157413667 - elements.mean_motion_rev_per_day < 0.0000000001,
  )
}

///|
test "two body propagation returns a physically bounded state" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let elements = @moonsatkit.orbit_elements(tle).unwrap()
  let state = @moonsatkit.propagate_two_body(elements, elements.epoch).unwrap()
  let radius_squared = state.position_km.x * state.position_km.x +
    state.position_km.y * state.position_km.y +
    state.position_km.z * state.position_km.z
  let speed_squared = state.velocity_km_s.x * state.velocity_km_s.x +
    state.velocity_km_s.y * state.velocity_km_s.y +
    state.velocity_km_s.z * state.velocity_km_s.z
  assert_true(radius_squared > 50000000.0)
  assert_true(radius_squared < 100000000.0)
  assert_true(speed_squared > 10.0)
  assert_true(speed_squared < 100.0)
}

///|
test "GMST matches the J2000 reference" {
  let angle = @moonsatkit.gmst_angle(2451545.0)
  assert_true((angle - 4.894961212735792).abs() < 0.0000000001)
}

///|
test "WGS-84 equatorial origin has the expected radius" {
  let ecef = @moonsatkit.geodetic_to_ecef({
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_km: 0.0,
  })
  assert_true((ecef.x - 6378.137).abs() < 0.000000001)
  assert_true(ecef.y.abs() < 0.000000001)
  assert_true(ecef.z.abs() < 0.000000001)
}

///|
test "WGS-84 geodetic conversion round trips" {
  let original : @moonsatkit.GeodeticPosition = {
    latitude_deg: 31.2304,
    longitude_deg: 121.4737,
    altitude_km: 0.01,
  }
  let recovered = @moonsatkit.ecef_to_geodetic(
    @moonsatkit.geodetic_to_ecef(original),
  )
  assert_true((recovered.latitude_deg - original.latitude_deg).abs() < 0.000001)
  assert_true(
    (recovered.longitude_deg - original.longitude_deg).abs() < 0.000001,
  )
  assert_true((recovered.altitude_km - original.altitude_km).abs() < 0.000001)
}

///|
test "ECI and ECEF state conversion round trips" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let original : @moonsatkit.OrbitState = {
    epoch,
    position_km: { x: 7000.0, y: -1200.0, z: 2400.0 },
    velocity_km_s: { x: 1.2, y: 6.8, z: -2.1 },
  }
  let recovered = @moonsatkit.ecef_to_eci_state(
    @moonsatkit.eci_to_ecef_state(original),
  )
  assert_true(
    (recovered.position_km.x - original.position_km.x).abs() < 0.000001,
  )
  assert_true(
    (recovered.position_km.y - original.position_km.y).abs() < 0.000001,
  )
  assert_true(
    (recovered.position_km.z - original.position_km.z).abs() < 0.000001,
  )
  assert_true(
    (recovered.velocity_km_s.x - original.velocity_km_s.x).abs() < 0.000001,
  )
  assert_true(
    (recovered.velocity_km_s.y - original.velocity_km_s.y).abs() < 0.000001,
  )
  assert_true(
    (recovered.velocity_km_s.z - original.velocity_km_s.z).abs() < 0.000001,
  )
}

///|
test "observe a satellite directly overhead" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x + 500.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let observation = @moonsatkit.observe_ecef(state, station)
  assert_true((observation.range_km - 500.0).abs() < 0.000001)
  assert_true((observation.elevation_deg - 90.0).abs() < 0.000001)
  assert_true(observation.azimuth_deg.abs() < 0.000001)
  assert_true(observation.above_horizon)
}

///|
test "observe north and east horizon directions" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let north_state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x, y: 0.0, z: 500.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let east_state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x, y: 500.0, z: 0.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let north_observation = @moonsatkit.observe_ecef(north_state, station)
  let east_observation = @moonsatkit.observe_ecef(east_state, station)
  assert_true(north_observation.azimuth_deg.abs() < 0.000001)
  assert_true(north_observation.elevation_deg.abs() < 0.000001)
  assert_true((east_observation.azimuth_deg - 90.0).abs() < 0.000001)
  assert_true(east_observation.elevation_deg.abs() < 0.000001)
  assert_true(north_observation.above_horizon)
  assert_true(east_observation.above_horizon)
}

///|
test "observe below the horizon" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x - 500.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let observation = @moonsatkit.observe_ecef(state, station)
  assert_true((observation.elevation_deg + 90.0).abs() < 0.000001)
  assert_false(observation.above_horizon)
}

///|
test "observe range rate sign" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x + 500.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: 2.5, y: 0.0, z: 0.0 },
  }
  let observation = @moonsatkit.observe_ecef(state, station)
  assert_true((observation.range_rate_km_s - 2.5).abs() < 0.000001)
  let approaching_state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x + 500.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: -1.25, y: 0.0, z: 0.0 },
  }
  let approaching = @moonsatkit.observe_ecef(approaching_state, station)
  assert_true((approaching.range_rate_km_s + 1.25).abs() < 0.000001)
}

///|
test "ground station altitude is reflected in observation range" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 1000.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x + 2.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let observation = @moonsatkit.observe_ecef(state, station)
  assert_true((observation.range_km - 2.0).abs() < 0.000001)
  assert_true((station_ecef.x - 6379.137).abs() < 0.000001)
}

///|
test "observe converts an inertial state through ECEF" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T12:00:00").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let station_ecef = @moonsatkit.ground_station_to_ecef(station)
  let ecef_state : @moonsatkit.EcefState = {
    epoch,
    position_km: { x: station_ecef.x + 500.0, y: 0.0, z: 0.0 },
    velocity_km_s: { x: 0.0, y: 0.0, z: 0.0 },
  }
  let inertial_state = @moonsatkit.ecef_to_eci_state(ecef_state)
  let observation = @moonsatkit.observe(inertial_state, station)
  assert_true((observation.range_km - 500.0).abs() < 0.000001)
  assert_true((observation.elevation_deg - 90.0).abs() < 0.000001)
}

///|
test "predict a bounded pass from synthetic circular orbit" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T00:00:00").unwrap()
  let elements : @moonsatkit.OrbitElements = {
    catalog_number: 99999,
    epoch,
    epoch_julian_day: @moonsatkit.julian_day(epoch),
    inclination_deg: 0.0,
    right_ascension_deg: @moonsatkit.greenwich_mean_sidereal_time(epoch) *
    180.0 /
    @math.PI,
    eccentricity: 0.0,
    argument_of_perigee_deg: 0.0,
    mean_anomaly_deg: 0.0,
    mean_motion_rev_per_day: 15.0,
    mean_motion_rad_per_min: 15.0 * 2.0 * @math.PI / 1440.0,
  }
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let passes = @moonsatkit.predict_passes_from_elements(
    elements, station, epoch, 1, 10.0,
  ).unwrap()
  assert_true(passes.length() > 0)
  let first = passes[0]
  assert_true(first.aos <= first.tca)
  assert_true(first.tca <= first.los)
  assert_true(first.maximum_elevation_deg >= 10.0)
  assert_eq(first.aos, epoch)
}

///|
test "predict passes clips an ongoing window to the interval" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T00:00:00").unwrap()
  let elements : @moonsatkit.OrbitElements = {
    catalog_number: 99998,
    epoch,
    epoch_julian_day: @moonsatkit.julian_day(epoch),
    inclination_deg: 0.0,
    right_ascension_deg: @moonsatkit.greenwich_mean_sidereal_time(epoch) *
    180.0 /
    @math.PI,
    eccentricity: 0.0,
    argument_of_perigee_deg: 0.0,
    mean_anomaly_deg: 0.0,
    mean_motion_rev_per_day: 15.0,
    mean_motion_rad_per_min: 15.0 * 2.0 * @math.PI / 1440.0,
  }
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let shifted_start = epoch.add_seconds(60)
  let passes = @moonsatkit.predict_passes_from_elements(
    elements, station, shifted_start, 1, 10.0,
  ).unwrap()
  assert_true(passes.length() > 0)
  let first = passes[0]
  assert_true(first.aos >= shifted_start)
  assert_true(first.los <= shifted_start.add_seconds(3600))
}

///|
test "predict passes rejects invalid search parameters" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T00:00:00").unwrap()
  let elements : @moonsatkit.OrbitElements = {
    catalog_number: 99997,
    epoch,
    epoch_julian_day: @moonsatkit.julian_day(epoch),
    inclination_deg: 0.0,
    right_ascension_deg: 0.0,
    eccentricity: 0.0,
    argument_of_perigee_deg: 0.0,
    mean_anomaly_deg: 0.0,
    mean_motion_rev_per_day: 15.0,
    mean_motion_rad_per_min: 15.0 * 2.0 * @math.PI / 1440.0,
  }
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  assert_true(
    @moonsatkit.predict_passes_from_elements(elements, station, epoch, 0, 10.0)
    is Err(_),
  )
  assert_true(
    @moonsatkit.predict_passes_from_elements(elements, station, epoch, 1, 91.0)
    is Err(_),
  )
}

///|
test "near-earth SGP4 matches the Vallado reference at an integer-second epoch" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let instant = @moonsatkit.parse_utc_datetime("2000-06-27T18:50:19").unwrap()
  let state = @moonsatkit.propagate_sgp4(tle, instant).unwrap()
  assert_true((state.position_km.x - 7021.073922835588).abs() < 0.01)
  assert_true((state.position_km.y + 1404.7820085030214).abs() < 0.01)
  assert_true((state.position_km.z + 3.2858953749704423).abs() < 0.01)
  assert_true((state.velocity_km_s.x - 1.8994382093979911).abs() < 0.00001)
  assert_true((state.velocity_km_s.y - 6.404775643789685).abs() < 0.00001)
  assert_true((state.velocity_km_s.z - 4.534805894880353).abs() < 0.00001)
}

///|
test "SGP4 pass search returns ordered visibility windows" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let from = @moonsatkit.parse_utc_datetime("2000-06-27T18:50:19").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let passes = @moonsatkit.predict_passes_sgp4(tle, station, from, 24, 10.0).unwrap()
  assert_true(passes.length() > 0)
  for pass in passes {
    assert_true(pass.aos <= pass.tca)
    assert_true(pass.tca <= pass.los)
    assert_true(pass.maximum_elevation_deg >= 10.0)
  }
}

///|
test "SGP4 pass search rejects deep-space TLEs explicitly" {
  let tle : @moonsatkit.Tle = {
    line1: "",
    line2: "",
    catalog_number: 5,
    epoch: "00179.78495062",
    inclination: "34.2682",
    right_ascension: "348.7242",
    eccentricity: "1859667",
    argument_of_perigee: "331.7664",
    mean_anomaly: "19.3264",
    mean_motion: "1.00000000",
    mean_motion_first_derivative: ".00000023",
    mean_motion_second_derivative: "00000-0",
    bstar: "28098-4",
    checksum_line1_ok: true,
    checksum_line2_ok: true,
  }
  let from = @moonsatkit.parse_utc_datetime("2000-06-27T18:50:19").unwrap()
  let station : @moonsatkit.GroundStation = {
    latitude_deg: 0.0,
    longitude_deg: 0.0,
    altitude_m: 0.0,
  }
  let error = match
    @moonsatkit.predict_passes_sgp4(tle, station, from, 1, 10.0) {
    Ok(_) => abort("expected deep-space orbit to be rejected")
    Err(error) => error
  }
  assert_eq(error.kind, @moonsatkit.UnsupportedOrbit)
}

///|
test "export orbit and pass data to JSON and CSV" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T00:00:00").unwrap()
  let state : @moonsatkit.OrbitState = {
    epoch,
    position_km: { x: 1.0, y: 2.0, z: 3.0 },
    velocity_km_s: { x: 4.0, y: 5.0, z: 6.0 },
  }
  let state_json = @moonsatkit.orbit_state_to_json(state)
  assert_true(state_json.length() > 100)
  let window : @moonsatkit.PassWindow = {
    aos: epoch,
    tca: epoch.next_second(),
    los: epoch.add_seconds(2),
    maximum_elevation_deg: 42.5,
  }
  let passes = [window]
  let passes_json = @moonsatkit.pass_windows_to_json(passes)
  let passes_csv = @moonsatkit.pass_windows_to_csv(passes)
  assert_true(passes_json.length() > 80)
  assert_true(passes_csv.length() > 60)
}

///|
test "export a short SGP4 ground track as GeoJSON" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let from = @moonsatkit.parse_utc_datetime("2000-06-27T18:50:19").unwrap()
  let geojson = @moonsatkit.track_geojson_sgp4(tle, from, 120, 60).unwrap()
  assert_true(geojson.length() > 200)
  assert_true(@moonsatkit.track_geojson_sgp4(tle, from, 120, 0) is Err(_))
}

///|
test "solar position is physically bounded at J2000" {
  let epoch = @moonsatkit.parse_utc_datetime("2000-01-01T12:00:00").unwrap()
  let sun = @moonsatkit.sun_position_eci(epoch)
  assert_true((sun.distance_au - 0.983).abs() < 0.01)
  let distance = sun.position_km.dot(sun.position_km).sqrt()
  assert_true(distance > 140000000.0)
  assert_true(distance < 155000000.0)
  assert_true(sun.right_ascension_deg > 270.0)
  assert_true(sun.right_ascension_deg < 290.0)
  assert_true(sun.declination_deg < -20.0)
  assert_true(sun.declination_deg > -27.0)
}

///|
test "eclipse classifier distinguishes sunlit umbra and penumbra" {
  let epoch = @moonsatkit.parse_utc_datetime("2026-08-23T00:00:00").unwrap()
  let sun = @moonsatkit.sun_position_eci(epoch)
  let direction = sun.position_km.scale(1.0 / sun.distance_km)
  let perpendicular_base : @moonsatkit.Vector3 = {
    x: -direction.y,
    y: direction.x,
    z: 0.0,
  }
  let perpendicular = perpendicular_base.scale(
    1.0 / perpendicular_base.dot(perpendicular_base).sqrt(),
  )
  let sunlit : @moonsatkit.OrbitState = {
    epoch,
    position_km: direction.scale(7000.0),
    velocity_km_s: @moonsatkit.Vector3::zero(),
  }
  let umbra : @moonsatkit.OrbitState = {
    epoch,
    position_km: direction.scale(-7000.0),
    velocity_km_s: @moonsatkit.Vector3::zero(),
  }
  let penumbra : @moonsatkit.OrbitState = {
    epoch,
    position_km: direction.scale(-7000.0).add(perpendicular.scale(6380.0)),
    velocity_km_s: @moonsatkit.Vector3::zero(),
  }
  assert_eq(@moonsatkit.eclipse_state(sunlit), @moonsatkit.Sunlit)
  assert_eq(@moonsatkit.eclipse_state(umbra), @moonsatkit.Umbra)
  assert_eq(@moonsatkit.eclipse_state(penumbra), @moonsatkit.Penumbra)
}

///|
test "SGP4 eclipse report returns machine-readable illumination data" {
  let tle = @moonsatkit.validate_tle(
    @moonsatkit.vallado_00005_line1, @moonsatkit.vallado_00005_line2,
  ).unwrap()
  let instant = @moonsatkit.parse_utc_datetime("2000-06-27T18:50:19").unwrap()
  let report = @moonsatkit.eclipse_report_to_json(tle, instant).unwrap()
  assert_true(report.contains("\"illumination\""))
  assert_true(report.contains("\"sun\""))
  assert_true(report.contains("\"orbit\""))
}
