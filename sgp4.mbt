///|
const SGP4_EARTH_RADIUS_KM : Double = 6378.135

///|
const SGP4_XKE : Double = 0.0743669161

///|
const SGP4_J2 : Double = 0.001082616

///|
const SGP4_J3 : Double = -0.00000253881

///|
const SGP4_J4 : Double = -0.00000165597

///|
const SGP4_J3OJ2 : Double = SGP4_J3 / SGP4_J2

///|
priv struct Sgp4Model {
  bstar : Double
  ecco : Double
  argpo : Double
  inclo : Double
  mo : Double
  nodeo : Double
  no_unkozai : Double
  con41 : Double
  eta : Double
  cc1 : Double
  cc4 : Double
  cc5 : Double
  d2 : Double
  d3 : Double
  d4 : Double
  delmo : Double
  sinmao : Double
  mdot : Double
  argpdot : Double
  nodedot : Double
  omgcof : Double
  xmcof : Double
  nodecf : Double
  t2cof : Double
  t3cof : Double
  t4cof : Double
  t5cof : Double
  x1mth2 : Double
  x7thm1 : Double
  aycof : Double
  xlcof : Double
  isimp : Bool
}

///|
fn sgp4_error(message : String) -> SatError {
  SatError::new(PropagationError, message)
}

///|
fn sgp4_normalize(angle : Double) -> Double {
  let two_pi = 2.0 * @math.PI
  let value = angle % two_pi
  if value < 0.0 {
    value + two_pi
  } else {
    value
  }
}

///|
fn sgp4_init_model(elements : Sgp4Elements) -> Result[Sgp4Model, SatError] {
  if elements.eccentricity < 0.0 || elements.eccentricity >= 1.0 {
    return Err(sgp4_error("TLE eccentricity must be in [0, 1)"))
  }
  if elements.mean_motion_rad_per_min <= 0.0 {
    return Err(sgp4_error("TLE mean motion must be positive"))
  }
  let x2o3 = 2.0 / 3.0
  let ecco = elements.eccentricity
  let inclo = elements.inclination_rad
  let eccsq = ecco * ecco
  let omeosq = 1.0 - eccsq
  let rteosq = omeosq.sqrt()
  let cosio = @math.cos(inclo)
  let cosio2 = cosio * cosio
  let no_kozai = elements.mean_motion_rad_per_min
  let ak = @math.pow(SGP4_XKE / no_kozai, x2o3)
  let d1 = 0.75 * SGP4_J2 * (3.0 * cosio2 - 1.0) / (rteosq * omeosq)
  let delta0 = d1 / (ak * ak)
  let adel = ak *
    (
      1.0 -
      delta0 * delta0 -
      delta0 * (1.0 / 3.0 + 134.0 * delta0 * delta0 / 81.0)
    )
  let delta1 = d1 / (adel * adel)
  let no_unkozai = no_kozai / (1.0 + delta1)
  let ao = @math.pow(SGP4_XKE / no_unkozai, x2o3)
  let sinio = @math.sin(inclo)
  let po = ao * omeosq
  let con42 = 1.0 - 5.0 * cosio2
  let con41 = -con42 - 2.0 * cosio2
  let posq = po * po
  let rp = ao * (1.0 - ecco)
  if 2.0 * @math.PI / no_unkozai >= 225.0 {
    return Err(
      SatError::new(
        UnsupportedOrbit,
        "deep-space SGP4 (SDP4) is not implemented yet",
      ),
    )
  }
  let ss_default = 78.0 / SGP4_EARTH_RADIUS_KM + 1.0
  let qzms2t_default = @math.pow((120.0 - 78.0) / SGP4_EARTH_RADIUS_KM, 4.0)
  let perigee_km = (rp - 1.0) * SGP4_EARTH_RADIUS_KM
  let sfour_and_qzms24 = if perigee_km < 156.0 {
    let sfour_km = if perigee_km < 98.0 { 20.0 } else { perigee_km - 78.0 }
    let q = @math.pow((120.0 - sfour_km) / SGP4_EARTH_RADIUS_KM, 4.0)
    (sfour_km / SGP4_EARTH_RADIUS_KM + 1.0, q)
  } else {
    (ss_default, qzms2t_default)
  }
  let sfour = sfour_and_qzms24.0
  let qzms24 = sfour_and_qzms24.1
  let isimp = perigee_km < 220.0
  let pinvsq = 1.0 / posq
  let tsi = 1.0 / (ao - sfour)
  let eta = ao * ecco * tsi
  let etasq = eta * eta
  let eeta = ecco * eta
  let psisq = (1.0 - etasq).abs()
  let coef = qzms24 * @math.pow(tsi, 4.0)
  let coef1 = coef / @math.pow(psisq, 3.5)
  let cc2 = coef1 *
    no_unkozai *
    (
      ao * (1.0 + 1.5 * etasq + eeta * (4.0 + etasq)) +
      0.375 *
      SGP4_J2 *
      tsi /
      psisq *
      con41 *
      (8.0 + 3.0 * etasq * (8.0 + etasq))
    )
  let cc1 = elements.bstar * cc2
  let cc3 = if ecco > 0.0001 {
    -2.0 * coef * tsi * SGP4_J3OJ2 * no_unkozai * sinio / ecco
  } else {
    0.0
  }
  let x1mth2 = 1.0 - cosio2
  let cc4 = 2.0 *
    no_unkozai *
    coef1 *
    ao *
    omeosq *
    (
      eta * (2.0 + 0.5 * etasq) +
      ecco * (0.5 + 2.0 * etasq) -
      SGP4_J2 *
      tsi /
      (ao * psisq) *
      (
        -3.0 * con41 * (1.0 - 2.0 * eeta + etasq * (1.5 - 0.5 * eeta)) +
        0.75 *
        x1mth2 *
        (2.0 * etasq - eeta * (1.0 + etasq)) *
        @math.cos(2.0 * elements.argument_of_perigee_rad)
      )
    )
  let cc5 = 2.0 *
    coef1 *
    ao *
    omeosq *
    (1.0 + 2.75 * (etasq + eeta) + eeta * etasq)
  let cosio4 = cosio2 * cosio2
  let temp1 = 1.5 * SGP4_J2 * pinvsq * no_unkozai
  let temp2 = 0.5 * temp1 * SGP4_J2 * pinvsq
  let temp3 = -0.46875 * SGP4_J4 * pinvsq * pinvsq * no_unkozai
  let mdot = no_unkozai +
    0.5 * temp1 * rteosq * con41 +
    0.0625 * temp2 * rteosq * (13.0 - 78.0 * cosio2 + 137.0 * cosio4)
  let argpdot = -0.5 * temp1 * con42 +
    0.0625 * temp2 * (7.0 - 114.0 * cosio2 + 395.0 * cosio4) +
    temp3 * (3.0 - 36.0 * cosio2 + 49.0 * cosio4)
  let xhdot1 = -temp1 * cosio
  let nodedot = xhdot1 +
    (0.5 * temp2 * (4.0 - 19.0 * cosio2) + 2.0 * temp3 * (3.0 - 7.0 * cosio2)) *
    cosio
  let omgcof = elements.bstar *
    cc3 *
    @math.cos(elements.argument_of_perigee_rad)
  let xmcof = if ecco > 0.0001 {
    -x2o3 * coef * elements.bstar / eeta
  } else {
    0.0
  }
  let nodecf = 3.5 * omeosq * xhdot1 * cc1
  let t2cof = 1.5 * cc1
  let xlcof = if (cosio + 1.0).abs() > 1.5e-12 {
    -0.25 * SGP4_J3OJ2 * sinio * (3.0 + 5.0 * cosio) / (1.0 + cosio)
  } else {
    -0.25 * SGP4_J3OJ2 * sinio * (3.0 + 5.0 * cosio) / 1.5e-12
  }
  let aycof = -0.5 * SGP4_J3OJ2 * sinio
  let delmotemp = 1.0 + eta * @math.cos(elements.mean_anomaly_rad)
  let delmo = delmotemp * delmotemp * delmotemp
  let sinmao = @math.sin(elements.mean_anomaly_rad)
  let x7thm1 = 7.0 * cosio2 - 1.0
  let d2_d3_d4 = if isimp {
    (0.0, 0.0, 0.0)
  } else {
    let cc1sq = cc1 * cc1
    let d2 = 4.0 * ao * tsi * cc1sq
    let temp = d2 * tsi * cc1 / 3.0
    let d3 = (17.0 * ao + sfour) * temp
    let d4 = 0.5 * temp * ao * tsi * (221.0 * ao + 31.0 * sfour) * cc1
    (d2, d3, d4)
  }
  Ok({
    bstar: elements.bstar,
    ecco,
    argpo: elements.argument_of_perigee_rad,
    inclo,
    mo: elements.mean_anomaly_rad,
    nodeo: elements.right_ascension_rad,
    no_unkozai,
    con41,
    eta,
    cc1,
    cc4,
    cc5,
    d2: d2_d3_d4.0,
    d3: d2_d3_d4.1,
    d4: d2_d3_d4.2,
    delmo,
    sinmao,
    mdot,
    argpdot,
    nodedot,
    omgcof,
    xmcof,
    nodecf,
    t2cof,
    t3cof: d2_d3_d4.0 + 2.0 * cc1 * cc1,
    t4cof: 0.25 *
    (3.0 * d2_d3_d4.1 + cc1 * (12.0 * d2_d3_d4.0 + 10.0 * cc1 * cc1)),
    t5cof: 0.2 *
    (
      3.0 * d2_d3_d4.2 +
      12.0 * cc1 * d2_d3_d4.1 +
      6.0 * d2_d3_d4.0 * d2_d3_d4.0 +
      15.0 * cc1 * cc1 * (2.0 * d2_d3_d4.0 + cc1 * cc1)
    ),
    x1mth2,
    x7thm1,
    aycof,
    xlcof,
    isimp,
  })
}

///|
/// Propagate a near-earth TLE with the Vallado SGP4 model.
///
/// The returned state uses kilometres and kilometres per second. Deep-space
/// orbits return UnsupportedOrbit until SDP4 is added.
pub fn propagate_sgp4(
  tle : Tle,
  instant : UtcDateTime,
) -> Result[OrbitState, SatError] {
  let elements = match sgp4_elements(tle) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let model = match sgp4_init_model(elements) {
    Ok(value) => value
    Err(error) => return Err(error)
  }
  let tsince = (julian_day(instant) - elements.epoch_julian_day) * 1440.0
  let xmdf = model.mo + model.mdot * tsince
  let argpdf = model.argpo + model.argpdot * tsince
  let nodedf = model.nodeo + model.nodedot * tsince
  let t2 = tsince * tsince
  let mut argpm = argpdf
  let mut mm = xmdf
  let mut nodem = nodedf + model.nodecf * t2
  let mut tempa = 1.0 - model.cc1 * tsince
  let mut tempe = model.bstar * model.cc4 * tsince
  let mut templ = model.t2cof * t2
  if !model.isimp {
    let delomg = model.omgcof * tsince
    let delmtemp = 1.0 + model.eta * @math.cos(xmdf)
    let delm = model.xmcof * (delmtemp * delmtemp * delmtemp - model.delmo)
    let temp = delomg + delm
    mm = xmdf + temp
    argpm = argpdf - temp
    let t3 = t2 * tsince
    let t4 = t3 * tsince
    tempa = tempa - model.d2 * t2 - model.d3 * t3 - model.d4 * t4
    tempe = tempe + model.bstar * model.cc5 * (@math.sin(mm) - model.sinmao)
    templ = templ + model.t3cof * t3 + t4 * (model.t4cof + tsince * model.t5cof)
  }
  let mut em = model.ecco - tempe
  if em >= 1.0 || em < -0.001 {
    return Err(sgp4_error("propagated eccentricity is outside [0, 1)"))
  }
  if em < 1.0e-6 {
    em = 1.0e-6
  }
  let am = @math.pow(SGP4_XKE / model.no_unkozai, 2.0 / 3.0) * tempa * tempa
  let nm = SGP4_XKE / @math.pow(am, 1.5)
  mm = mm + model.no_unkozai * templ
  let xlm = mm + argpm + nodem
  nodem = sgp4_normalize(nodem)
  argpm = sgp4_normalize(argpm)
  let xlm = sgp4_normalize(xlm)
  mm = sgp4_normalize(xlm - argpm - nodem)
  let sinim = @math.sin(model.inclo)
  let cosim = @math.cos(model.inclo)
  let ep = em
  let xincp = model.inclo
  let argpp = argpm
  let nodep = nodem
  let mp = mm
  let axnl = ep * @math.cos(argpp)
  let temp = 1.0 / (am * (1.0 - ep * ep))
  let aynl = ep * @math.sin(argpp) + temp * model.aycof
  let xl = mp + argpp + nodep + temp * model.xlcof * axnl
  let u = sgp4_normalize(xl - nodep)
  let mut eo1 = u
  let mut correction = 1.0
  let mut iteration = 0
  while correction.abs() >= 1.0e-12 && iteration < 10 {
    let sineo1 = @math.sin(eo1)
    let coseo1 = @math.cos(eo1)
    let denominator = 1.0 - coseo1 * axnl - sineo1 * aynl
    correction = (u - aynl * coseo1 + axnl * sineo1 - eo1) / denominator
    if correction.abs() >= 0.95 {
      correction = if correction > 0.0 { 0.95 } else { -0.95 }
    }
    eo1 = eo1 + correction
    iteration = iteration + 1
  }
  let sineo1 = @math.sin(eo1)
  let coseo1 = @math.cos(eo1)
  let ecose = axnl * coseo1 + aynl * sineo1
  let esine = axnl * sineo1 - aynl * coseo1
  let el2 = axnl * axnl + aynl * aynl
  let pl = am * (1.0 - el2)
  if pl <= 0.0 {
    return Err(sgp4_error("semi-latus rectum is not positive"))
  }
  let rl = am * (1.0 - ecose)
  let rdotl = am.sqrt() * esine / rl
  let rvdotl = pl.sqrt() / rl
  let betal = (1.0 - el2).sqrt()
  let temp = esine / (1.0 + betal)
  let sinu = am / rl * (sineo1 - aynl - axnl * temp)
  let cosu = am / rl * (coseo1 - axnl + aynl * temp)
  let mut su = @math.atan2(sinu, cosu)
  let sin2u = 2.0 * cosu * sinu
  let cos2u = 1.0 - 2.0 * sinu * sinu
  let temp = 1.0 / pl
  let temp1 = 0.5 * SGP4_J2 * temp
  let temp2 = temp1 * temp
  let mrt = rl * (1.0 - 1.5 * temp2 * betal * model.con41) +
    0.5 * temp1 * model.x1mth2 * cos2u
  su = su - 0.25 * temp2 * model.x7thm1 * sin2u
  let xnode = nodep + 1.5 * temp2 * cosim * sin2u
  let xinc = xincp + 1.5 * temp2 * cosim * sinim * cos2u
  let mvt = rdotl - nm * temp1 * model.x1mth2 * sin2u / SGP4_XKE
  let rvdot = rvdotl +
    nm * temp1 * (model.x1mth2 * cos2u + 1.5 * model.con41) / SGP4_XKE
  let sinsu = @math.sin(su)
  let cossu = @math.cos(su)
  let snod = @math.sin(xnode)
  let cnod = @math.cos(xnode)
  let sini = @math.sin(xinc)
  let cosi = @math.cos(xinc)
  let xmx = -snod * cosi
  let xmy = cnod * cosi
  let ux = xmx * sinsu + cnod * cossu
  let uy = xmy * sinsu + snod * cossu
  let uz = sini * sinsu
  let vx = xmx * cossu - cnod * sinsu
  let vy = xmy * cossu - snod * sinsu
  let vz = sini * cossu
  let radius_scale = mrt * SGP4_EARTH_RADIUS_KM
  let velocity_scale = SGP4_EARTH_RADIUS_KM * SGP4_XKE / 60.0
  Ok({
    epoch: instant,
    position_km: {
      x: radius_scale * ux,
      y: radius_scale * uy,
      z: radius_scale * uz,
    },
    velocity_km_s: {
      x: (mvt * ux + rvdot * vx) * velocity_scale,
      y: (mvt * uy + rvdot * vy) * velocity_scale,
      z: (mvt * uz + rvdot * vz) * velocity_scale,
    },
  })
}
