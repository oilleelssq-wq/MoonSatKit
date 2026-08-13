# MoonSatKit

MoonSatKit is a pure MoonBit toolkit for satellite orbit data, TLE parsing, time
handling, and the first steps toward pass prediction and visualization.

> Project status: initial scaffold. The public data model, UTC helpers, and TLE
> parsing/validation layer are in place; SGP4 propagation and pass search are
> the next major pieces.

## Current scope

- TLE parsing with raw field preservation
- TLE checksum validation
- UTC civil timestamp parsing and formatting
- Leap-year and month-length helpers
- Vector, station, observation, and pass data types for future propagation code
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

## Roadmap

- Julian day and sidereal time
- WGS-84 and frame conversions
- SGP4 near-Earth propagation
- Ground-station observation geometry
- Pass search and event interpolation
- JSON, CSV, and GeoJSON export

## Development

```console
moon info
moon fmt
moon test --target all --deny-warn
```
