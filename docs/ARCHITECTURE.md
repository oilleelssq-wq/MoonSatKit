# MoonSatKit Architecture

MoonSatKit is organized around a small set of stable layers:

1. types.mbt defines the public data model, including TLEs, orbit states, observations, pass windows, and structured errors.
2. time.mbt handles UTC civil time parsing, calendar helpers, Julian days, and elapsed-time calculations.
3. math.mbt provides reusable vector primitives.
4. tle.mbt parses and validates two-line element sets, including checksums and the numeric fields required by SGP4.
5. orbit.mbt decodes numerical orbital elements and retains the transparent two-body Kepler preview propagator.
6. sgp4.mbt initializes and propagates near-earth TLEs with the Vallado SGP4 model. It applies WGS-72 constants, secular and drag terms, Kepler iteration, and short-period corrections. Deep-space orbits are rejected with UnsupportedOrbit until SDP4 is implemented.
7. frames.mbt implements GMST, ECI/ECEF transforms, WGS-84 geodetic conversion, and Earth-rotation velocity correction.
8. observe.mbt converts inertial states through ECEF into local ENU observations with azimuth, elevation, range, range rate, and horizon status.
9. passes.mbt exposes both the compatibility two-body pass search and the SGP4 pass search. Each scans at 60-second intervals, refines AOS/LOS by bisection, and searches for TCA at one-second resolution.
10. formats.mbt serializes orbit states and pass windows as JSON or CSV, and
    exports sampled SGP4 ground tracks as GeoJSON LineStrings.

The architecture deliberately keeps the preview model available while the near-earth high-fidelity model is validated against public reference vectors. This makes the numerical boundary explicit and leaves room for SDP4, exports, and visualization without changing the observation data model.
