# MoonSatKit Architecture

MoonSatKit is organized around a small set of stable layers:

1. `types.mbt` defines the public data model.
2. `time.mbt` handles UTC civil time parsing and small calendar helpers.
3. `math.mbt` provides reusable vector primitives.
4. `tle.mbt` parses and validates two-line element sets.
5. Future modules will add Julian day, frame transforms, SGP4 propagation,
   observation geometry, and pass prediction.

The current scaffold intentionally keeps the first release small and testable.
It gives the project a real API surface before the orbit propagator lands.
