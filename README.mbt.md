# MoonSatKit

MoonSatKit is a pure MoonBit toolkit for satellite orbit data, TLE parsing, time
handling, near-earth SGP4 propagation, ground-station observation, and pass prediction.

> Project status: near-earth propagation phase. The package now includes a
> pure MoonBit near-earth SGP4 implementation validated against the Vallado
> 00005 reference state, plus SGP4-based ground-station pass prediction.
> Deep-space SDP4, full official vector coverage, and export formats remain
> planned work.

## Current scope

- TLE parsing with raw field preservation
- TLE checksum validation
- SGP4 input metadata decoding: mean-motion derivatives and BSTAR
- Pure MoonBit near-earth SGP4 propagation with WGS-72 constants and drag terms
- Explicit `Sgp4Elements` initialization boundary with deep-space rejection
- UTC civil timestamp parsing, formatting, Julian day conversion, and elapsed seconds
- Leap-year and month-length helpers
- TLE orbital-element decoding with structured numeric errors
- Two-body Kepler preview propagation with ECI-style position and velocity output
- GMST, ECI/ECEF position and state transforms with Earth rotation correction
- WGS-84 geodetic and ground-station coordinate conversion
- Ground-station ENU observation with azimuth, elevation, range, range rate, and horizon status
- Two-body preview pass prediction with AOS, TCA, LOS, and maximum elevation
- SGP4 pass prediction with one-second event refinement and ordered visibility windows
- JSON serialization for orbit states and pass windows
- CSV pass-window export and GeoJSON SGP4 ground-track export
- Vector, station, observation, and pass data types
- CLI entry points for TLE validation and timestamp parsing

## Quick start

Parse a timestamp:

```console
moon run cmd/main -- time parse 2026-08-11T12:00:00
```

Validate a TLE:

```console
moon run cmd/main -- tle validate "1 25544U 98067A   26224.50000000  .00001234  00000-0  12345-4 0  9991" "2 25544  51.6416  21.0000 0001234 123.4567 234.5678 15.50000000"
```

Propagate a TLE at a UTC instant:

```console
moon run cmd/main -- propagate "<line1>" "<line2>" --at 2026-08-23T12:00:00
```

Predict SGP4 passes for a ground station:

```console
moon run cmd/main -- passes "<line1>" "<line2>" --station 31.2304,121.4737,10 --from 2026-08-23T12:00:00 --hours 24 --min-elevation 10 --format json
```

Export a GeoJSON ground track:

```console
moon run cmd/main -- track "<line1>" "<line2>" --from 2026-08-23T12:00:00 --seconds 86400 --step 60
```

Predict pass windows from a validated TLE:

```moon
let tle = @moonsatkit.validate_tle(line1, line2).unwrap()
let station : @moonsatkit.GroundStation = {
  latitude_deg: 31.2304,
  longitude_deg: 121.4737,
  altitude_m: 10.0,
}
let passes = @moonsatkit.predict_passes_sgp4(
  tle,
  station,
  from=start,
  duration_hours=24,
  minimum_elevation_deg=10.0,
).unwrap()
```

`predict_passes` remains the transparent two-body compatibility API.
`predict_passes_sgp4` uses the near-earth SGP4 propagator and returns
integer-second AOS, TCA, and LOS timestamps plus the maximum elevation.
Deep-space TLEs currently return `UnsupportedOrbit` until SDP4 is added.

Export results:

```moon
let json = @moonsatkit.pass_windows_to_json(passes)
let csv = @moonsatkit.pass_windows_to_csv(passes)
let track = @moonsatkit.track_geojson_sgp4(tle, start, 86400, 60).unwrap()
```

## Roadmap

- Deep-space SDP4 propagation and broader official SGP4 vector coverage
- Higher-fidelity TEME, Earth orientation, and time-scale refinements

## Development

```console
moon info
moon fmt
moon test -p oillee/moonsatkit --target all --deny-warn
```

## License

MoonSatKit is licensed under the [Apache License 2.0](LICENSE).

## Browser preview

The repository includes a lightweight browser console at [web/index.html](web/index.html). It renders a real MoonSatKit-generated GeoJSON track and SGP4 pass-window sample for Vallado catalog object 00005, with a timeline scrubber, TLE checksum validation, station marker, pass-elevation filter, GeoJSON import, and track download.

Start a local preview from the repository root:

```console
cd web
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`. The page loads the self-contained MoonBit JS adapter at `web/moonsatkit.js`, which exposes TLE validation, SGP4 GeoJSON track generation, and pass-window prediction. Edit the TLE, station, start time, duration, or sample step and press `计算轨迹` to run the real near-earth SGP4 implementation in the browser. The bundled Vallado 00005 data remains available as the initial view and fallback demonstration when the adapter cannot be loaded. Rebuild the adapter after MoonBit changes with `./web/build.ps1` (or run `moon build web/wasm --target js --release` and copy `_build/js/release/build/web/wasm/wasm.js` to `web/moonsatkit.js`).
