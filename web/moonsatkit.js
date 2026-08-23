class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
function _M0TPB4IterGRPC16string10StringViewE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGcE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB8MutLocalGORPC16string10StringViewE(param0) {
  this.val = param0;
}
const _M0MPC16double6Double8mod__ffi = (a, b) => (a % b);
function _M0TP26oillee10moonsatkit8SatError(param0, param1, param2, param3) {
  this.kind = param0;
  this.line = param1;
  this.fragment = param2;
  this.message = param3;
}
function _M0TPB8MutLocalGbE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGOiE(param0) {
  this.val = param0;
}
function _M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit3Tle(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14) {
  this.line1 = param0;
  this.line2 = param1;
  this.catalog_number = param2;
  this.epoch = param3;
  this.inclination = param4;
  this.right_ascension = param5;
  this.eccentricity = param6;
  this.argument_of_perigee = param7;
  this.mean_anomaly = param8;
  this.mean_motion = param9;
  this.mean_motion_first_derivative = param10;
  this.mean_motion_second_derivative = param11;
  this.bstar = param12;
  this.checksum_line1_ok = param13;
  this.checksum_line2_ok = param14;
}
function _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit11UtcDateTime(param0, param1, param2, param3, param4, param5) {
  this.year = param0;
  this.month = param1;
  this.day = param2;
  this.hour = param3;
  this.minute = param4;
  this.second = param5;
}
function _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit9Sgp4Model(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15, param16, param17, param18, param19, param20, param21, param22, param23, param24, param25, param26, param27, param28, param29, param30, param31) {
  this.bstar = param0;
  this.ecco = param1;
  this.argpo = param2;
  this.inclo = param3;
  this.mo = param4;
  this.nodeo = param5;
  this.no_unkozai = param6;
  this.con41 = param7;
  this.eta = param8;
  this.cc1 = param9;
  this.cc4 = param10;
  this.cc5 = param11;
  this.d2 = param12;
  this.d3 = param13;
  this.d4 = param14;
  this.delmo = param15;
  this.sinmao = param16;
  this.mdot = param17;
  this.argpdot = param18;
  this.nodedot = param19;
  this.omgcof = param20;
  this.xmcof = param21;
  this.nodecf = param22;
  this.t2cof = param23;
  this.t3cof = param24;
  this.t4cof = param25;
  this.t5cof = param26;
  this.x1mth2 = param27;
  this.x7thm1 = param28;
  this.aycof = param29;
  this.xlcof = param30;
  this.isimp = param31;
}
function _M0DTPC16option6OptionGdE4None() {}
_M0DTPC16option6OptionGdE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGdE4None__ = new _M0DTPC16option6OptionGdE4None();
function _M0DTPC16option6OptionGdE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGdE4Some.prototype.$tag = 1;
function _M0TPB8MutLocalGdE(param0) {
  this.val = param0;
}
function _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit13OrbitElements(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9) {
  this.catalog_number = param0;
  this.epoch = param1;
  this.epoch_julian_day = param2;
  this.inclination_deg = param3;
  this.right_ascension_deg = param4;
  this.eccentricity = param5;
  this.argument_of_perigee_deg = param6;
  this.mean_anomaly_deg = param7;
  this.mean_motion_rev_per_day = param8;
  this.mean_motion_rad_per_min = param9;
}
function _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit12Sgp4Elements(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11) {
  this.catalog_number = param0;
  this.epoch = param1;
  this.epoch_julian_day = param2;
  this.inclination_rad = param3;
  this.right_ascension_rad = param4;
  this.eccentricity = param5;
  this.argument_of_perigee_rad = param6;
  this.mean_anomaly_rad = param7;
  this.mean_motion_rad_per_min = param8;
  this.mean_motion_first_derivative_rev_per_day2 = param9;
  this.mean_motion_second_derivative_div2_rev_per_day3 = param10;
  this.bstar = param11;
}
function _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit10OrbitState(param0, param1, param2) {
  this.epoch = param0;
  this.position_km = param1;
  this.velocity_km_s = param2;
}
function _M0TP26oillee10moonsatkit7Vector3(param0, param1, param2) {
  this.x = param0;
  this.y = param1;
  this.z = param2;
}
function _M0TP26oillee10moonsatkit9EcefState(param0, param1, param2) {
  this.epoch = param0;
  this.position_km = param1;
  this.velocity_km_s = param2;
}
function _M0TP26oillee10moonsatkit16GeodeticPosition(param0, param1, param2) {
  this.latitude_deg = param0;
  this.longitude_deg = param1;
  this.altitude_km = param2;
}
function _M0TP26oillee10moonsatkit11Observation(param0, param1, param2, param3, param4) {
  this.azimuth_deg = param0;
  this.elevation_deg = param1;
  this.range_km = param2;
  this.range_rate_km_s = param3;
  this.above_horizon = param4;
}
function _M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit10PassWindow(param0, param1, param2, param3) {
  this.aos = param0;
  this.tca = param1;
  this.los = param2;
  this.maximum_elevation_deg = param3;
}
function _M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE2Ok.prototype.$tag = 1;
function _M0TP26oillee10moonsatkit13GroundStation(param0, param1, param2) {
  this.latitude_deg = param0;
  this.longitude_deg = param1;
  this.altitude_m = param2;
}
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0MPC16string10StringView4trimN7_2abindS6426 = "\t\n\r ";
const _M0MPC16string6String4trimN7_2abindS6432 = "\t\n\r ";
const _M0MPB4Iter4nextN6constrS9183GRPC16string10StringViewE = 0;
const _M0MPB4Iter4nextN6constrS9184GRPC16string10StringViewE = 0;
const _M0MPB4Iter4nextN6constrS9183GcE = 0;
const _M0MPB4Iter4nextN6constrS9184GcE = 0;
const _M0MPB4Iter3newN6constrS9191GRPC16string10StringViewE = 0;
const _M0MPB4Iter3newN6constrS9191GcE = 0;
const _M0FP26oillee10moonsatkit13split__fieldsN7_2abindS818 = " ";
const _M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS824 = "1";
const _M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS825 = "2";
const _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS953 = "Z";
const _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS952 = "T";
const _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS951 = " ";
const _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS950 = "-";
const _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS949 = ":";
const _M0FPB18brute__force__findN6constrS9194 = 0;
const _M0FPB28boyer__moore__horspool__findN6constrS9193 = 0;
const _M0FP26oillee10moonsatkit17parse__tle__epochN6constrS1387 = 2;
const _M0FP26oillee10moonsatkit17parse__tle__epochN6constrS1388 = 5;
const _M0FP26oillee10moonsatkit17sgp4__init__modelN5tupleS1386 = { _0: 0, _1: 0, _2: 0 };
function _M0FPC15abort5abortGRPC16string10StringViewE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0MPB13StringBuilder13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGdE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGdE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (_M0MPC16uint166UInt1622is__leading__surrogate(c1)) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return c1;
  }
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    end$2 = _Some;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show6outputGiE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC13int3IntPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, self);
}
function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
}
function _M0MPB4Iter4nextGRPC16string10StringViewE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9184GRPC16string10StringViewE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9183GRPC16string10StringViewE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9184GcE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9183GcE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPB4Iter3newGRPC16string10StringViewE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9191GRPC16string10StringViewE;
  }
  return new _M0TPB4IterGRPC16string10StringViewE(f, size_hint$2);
}
function _M0MPB4Iter3newGcE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9191GcE;
  }
  return new _M0TPB4IterGcE(f, size_hint$2);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string10StringView4iter(self) {
  const start = self.start;
  const end = self.end;
  const index = new _M0TPB8MutLocalGiE(start);
  return _M0MPB4Iter3newGcE(() => {
    if (index.val < end) {
      const c1 = self.str.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < self.end) {
        const c2 = self.str.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          index.val = index.val + 2 | 0;
          return _M0FPB32code__point__of__surrogate__pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  }, undefined);
}
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.str.charCodeAt(self.start + i | 0);
        const _p$2 = other.str.charCodeAt(other.start + i | 0);
        if (_p === _p$2) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return true;
  } else {
    return false;
  }
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return _M0FPC15abort5abortGOiE("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0FPB28boyer__moore__horspool__find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const skip_table = $make_array_len_and_init(256, needle_len);
      const _bind = needle_len - 1 | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _bind) {
          const _tmp$2 = needle.str.charCodeAt(needle.start + i | 0) & 255;
          $bound_check(skip_table, _tmp$2);
          skip_table[_tmp$2] = (needle_len - 1 | 0) - i | 0;
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i <= (haystack_len - needle_len | 0)) {
          const _bind$2 = needle_len - 1 | 0;
          let _tmp$3 = 0;
          while (true) {
            const j = _tmp$3;
            if (j <= _bind$2) {
              const _p = haystack.str.charCodeAt(haystack.start + (i + j | 0) | 0);
              const _p$2 = needle.str.charCodeAt(needle.start + j | 0);
              if (_p !== _p$2) {
                break;
              }
              _tmp$3 = j + 1 | 0;
              continue;
            } else {
              return i;
            }
          }
          const _tmp$4 = haystack.str.charCodeAt(haystack.start + ((i + needle_len | 0) - 1 | 0) | 0) & 255;
          $bound_check(skip_table, _tmp$4);
          _tmp$2 = i + skip_table[_tmp$4] | 0;
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return _M0FPB28boyer__moore__horspool__findN6constrS9193;
  }
}
function _M0FPB18brute__force__find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const needle_first = needle.str.charCodeAt(needle.start);
      const forward_len = haystack_len - needle_len | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i <= forward_len) {
          _L: {
            const _p = haystack.str.charCodeAt(haystack.start + i | 0);
            if (_p !== needle_first) {
              break _L;
            }
            let _tmp$2 = 1;
            while (true) {
              const j = _tmp$2;
              if (j < needle_len) {
                const _p$2 = haystack.str.charCodeAt(haystack.start + (i + j | 0) | 0);
                const _p$3 = needle.str.charCodeAt(needle.start + j | 0);
                if (_p$2 !== _p$3) {
                  break;
                }
                _tmp$2 = j + 1 | 0;
                continue;
              } else {
                return i;
              }
            }
            break _L;
          }
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return _M0FPB18brute__force__findN6constrS9194;
  }
}
function _M0MPC16string10StringView4find(self, str) {
  return (str.end - str.start | 0) <= 4 ? _M0FPB18brute__force__find(self, str) : _M0FPB28boyer__moore__horspool__find(self, str);
}
function _M0MPC15array5Array11new_2einnerGRPC16string10StringViewE(capacity) {
  return [];
}
function _M0MPC15array5Array4pushGRP26oillee10moonsatkit10PassWindowE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  const _bind = self.end - self.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _p = self.str.charCodeAt(self.start + i | 0);
      if (_p === code) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MPC16string10StringView14contains__char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 >= 0 && c$2 <= 65535) {
      return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
    } else {
      if (c$2 < 0) {
        return false;
      } else {
        if (len >= 2) {
          const adj = c$2 - 65536 | 0;
          const high = 55296 + (adj >> 10) | 0;
          if (high <= 65535) {
            const high$2 = high & 65535;
            const low = (56320 + (adj & 1023) | 0) & 65535;
            let _tmp = 0;
            while (true) {
              const i = _tmp;
              if (i < (len - 1 | 0)) {
                const _p = self.str.charCodeAt(self.start + i | 0);
                if (_p === high$2) {
                  const _p$2 = self.str.charCodeAt(self.start + (i + 1 | 0) | 0);
                  if (_p$2 === low) {
                    return true;
                  }
                  _tmp = i + 2 | 0;
                  continue;
                }
                _tmp = i + 1 | 0;
                continue;
              } else {
                break;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
function _M0MPC16string10StringView19trim__start_2einner(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
      const _tmp$2 = x.str;
      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind;
        _tmp$3 = _Some;
      }
      const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView17trim__end_2einner(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  return _M0MPC16string10StringView17trim__end_2einner(_M0MPC16string10StringView19trim__start_2einner(self, chars), chars);
}
function _M0MPC16string10StringView4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = new _M0TPC16string10StringView(_M0MPC16string10StringView4trimN7_2abindS6426, 0, _M0MPC16string10StringView4trimN7_2abindS6426.length);
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string10StringView12trim_2einner(self, chars);
}
function _M0MPC16string6String12trim_2einner(self, chars) {
  return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string6String4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = new _M0TPC16string10StringView(_M0MPC16string6String4trimN7_2abindS6432, 0, _M0MPC16string6String4trimN7_2abindS6432.length);
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string6String12trim_2einner(self, chars);
}
function _M0MPB4Iter3mapGcRPC16string10StringViewE(self, f) {
  return new _M0TPB4IterGRPC16string10StringViewE(() => {
    const _bind = _M0MPB4Iter4nextGcE(self);
    if (_bind === -1) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0IPC14char4CharPB4Show10to__string(self) {
  return String.fromCodePoint(self);
}
function _M0MPC16string10StringView5split(self, sep) {
  const sep_len = sep.end - sep.start | 0;
  if (sep_len === 0) {
    return _M0MPB4Iter3mapGcRPC16string10StringViewE(_M0MPC16string10StringView4iter(self), (c) => _M0MPC16string6String12view_2einner(_M0IPC14char4CharPB4Show10to__string(c), 0, undefined));
  }
  const remaining = new _M0TPB8MutLocalGORPC16string10StringViewE(self);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    const _bind = remaining.val;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _view = _Some;
      const _bind$2 = _M0MPC16string10StringView4find(_view, sep);
      if (_bind$2 === undefined) {
        remaining.val = undefined;
        return _view;
      } else {
        const _Some$2 = _bind$2;
        const _end = _Some$2;
        remaining.val = _M0MPC16string10StringView12view_2einner(_view, _end + sep_len | 0, undefined);
        return _M0MPC16string10StringView12view_2einner(_view, 0, _end);
      }
    }
  }, undefined);
}
function _M0MPB4Iter9to__arrayGRPC16string10StringViewE(self) {
  const _bind = self.size_hint;
  let result;
  if (_bind === undefined) {
    result = [];
  } else {
    const _Some = _bind;
    const _n = _Some;
    result = _M0MPC15array5Array11new_2einnerGRPC16string10StringViewE(_n);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP26oillee10moonsatkit10PassWindowE(result, _x);
      continue;
    }
  }
  return result;
}
function _M0IPC13int3IntPB4Show10to__string(self) {
  return _M0MPC13int3Int18to__string_2einner(self, 10);
}
function _M0MPB4Iter6filterGRPC16string10StringViewE(self, f) {
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    while (true) {
      const _bind = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
      if (_bind === undefined) {
        return undefined;
      } else {
        const _Some = _bind;
        const _x = _Some;
        if (f(_x)) {
          return _x;
        }
        continue;
      }
    }
  }, undefined);
}
function _M0MPC16double6Double7to__int(self) {
  return self !== self ? 0 : self >= 2147483647 ? 2147483647 : self <= -2147483648 ? -2147483648 : self | 0;
}
function _M0MPC16double6Double5floor(_tmp) {
  return Math.floor(_tmp);
}
function _M0IPC16double6DoublePB3Mod3mod(self, other) {
  return _M0MPC16double6Double8mod__ffi(self, other);
}
function _M0IPC16double6DoublePB4Show10to__string(self) {
  return String(self);
}
function _M0MPC15array5Array2atGRPC16string10StringViewE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0FPC16double5floor(d) {
  return _M0MPC16double6Double5floor(d);
}
function _M0FPC14math3sin(_tmp) {
  return Math.sin(_tmp);
}
function _M0FPC14math3cos(_tmp) {
  return Math.cos(_tmp);
}
function _M0FPC14math5atan2(_tmp, _tmp$2) {
  return Math.atan2(_tmp, _tmp$2);
}
function _M0FPC14math3pow(_tmp, _tmp$2) {
  return Math.pow(_tmp, _tmp$2);
}
function _M0MP26oillee10moonsatkit8SatError11new_2einner(kind, message, fragment, line) {
  return new _M0TP26oillee10moonsatkit8SatError(kind, line, fragment, message);
}
function _M0MP26oillee10moonsatkit8SatError10to__string(self) {
  if (self.line <= 0) {
    return self.message;
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(10);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "line ");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, self.line);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ": ");
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, self.message);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " (");
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, self.fragment);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ")");
    return _string_builder.val;
  }
}
function _M0FP26oillee10moonsatkit4pad2(value) {
  if (value < 10) {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(1);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "0");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
    return _string_builder.val;
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(0);
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
    return _string_builder.val;
  }
}
function _M0FP26oillee10moonsatkit4pad4(value) {
  if (value < 10) {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(3);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "000");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
    return _string_builder.val;
  } else {
    if (value < 100) {
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(2);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "00");
      _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
      return _string_builder.val;
    } else {
      if (value < 1000) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(1);
        _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "0");
        _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
        return _string_builder.val;
      } else {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        _M0MPB13StringBuilder13write__objectGiE(_string_builder, value);
        return _string_builder.val;
      }
    }
  }
}
function _M0MP26oillee10moonsatkit11UtcDateTime10to__string(self) {
  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(5);
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad4(self.year));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "-");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad2(self.month));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "-");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad2(self.day));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " ");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad2(self.hour));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ":");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad2(self.minute));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ":");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0FP26oillee10moonsatkit4pad2(self.second));
  return _string_builder.val;
}
function _M0FP26oillee10moonsatkit10tle__error(kind, line, fragment, message) {
  return _M0MP26oillee10moonsatkit8SatError11new_2einner(kind, message, _M0MPC16string10StringView9to__owned(fragment), line);
}
function _M0FP26oillee10moonsatkit19parse__tle__decimal(text) {
  if ((text.end - text.start | 0) === 0) {
    return undefined;
  }
  const value = new _M0TPB8MutLocalGiE(0);
  const valid = new _M0TPB8MutLocalGbE(true);
  const _p = _M0MPC16string10StringView4iter(text);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (_p$4 >= 48 && _p$4 <= 57) {
        value.val = (Math.imul(value.val, 10) | 0) + (_p$4 - 48 | 0) | 0;
      } else {
        valid.val = false;
      }
      continue;
    }
  }
  return valid.val ? value.val : undefined;
}
function _M0FP26oillee10moonsatkit13split__fields(line) {
  return _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPB4Iter6filterGRPC16string10StringViewE(_M0MPC16string10StringView5split(_M0MPC16string10StringView4trim(line, undefined), new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit13split__fieldsN7_2abindS818, 0, _M0FP26oillee10moonsatkit13split__fieldsN7_2abindS818.length)), (part) => !((part.end - part.start | 0) === 0)));
}
function _M0FP26oillee10moonsatkit22parse__catalog__number(token) {
  if ((token.end - token.start | 0) === 0) {
    return undefined;
  }
  const value = new _M0TPB8MutLocalGiE(0);
  const seen_digit = new _M0TPB8MutLocalGbE(false);
  const finished = new _M0TPB8MutLocalGbE(false);
  const valid = new _M0TPB8MutLocalGbE(true);
  const _p = _M0MPC16string10StringView4iter(token);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (finished.val) {
      } else {
        if (_p$4 >= 48 && _p$4 <= 57) {
          seen_digit.val = true;
          value.val = (Math.imul(value.val, 10) | 0) + (_p$4 - 48 | 0) | 0;
        } else {
          if (seen_digit.val) {
            finished.val = true;
          } else {
            valid.val = false;
          }
        }
      }
      continue;
    }
  }
  return valid.val && seen_digit.val ? value.val : undefined;
}
function _M0FP26oillee10moonsatkit15checksum__digit(line) {
  const len = line.end - line.start | 0;
  const index = new _M0TPB8MutLocalGiE(0);
  const result = new _M0TPB8MutLocalGOiE(undefined);
  const _p = _M0MPC16string10StringView4iter(line);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (index.val === (len - 1 | 0)) {
        if (_p$4 >= 48 && _p$4 <= 57) {
          result.val = _p$4 - 48 | 0;
        } else {
          result.val = undefined;
        }
      }
      index.val = index.val + 1 | 0;
      continue;
    }
  }
  return result.val;
}
function _M0FP26oillee10moonsatkit15checksum__value(line) {
  const len = line.end - line.start | 0;
  const index = new _M0TPB8MutLocalGiE(0);
  const total = new _M0TPB8MutLocalGiE(0);
  const _p = _M0MPC16string10StringView4iter(line);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (index.val < (len - 1 | 0)) {
        if (_p$4 >= 48 && _p$4 <= 57) {
          total.val = total.val + (_p$4 - 48 | 0) | 0;
        } else {
          if (_p$4 === 45) {
            total.val = total.val + 1 | 0;
          }
        }
      }
      index.val = index.val + 1 | 0;
      continue;
    }
  }
  return total.val % 10 | 0;
}
function _M0FP26oillee10moonsatkit12checksum__ok(line) {
  const _bind = _M0FP26oillee10moonsatkit15checksum__digit(line);
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _expected = _Some;
    return _M0FP26oillee10moonsatkit15checksum__value(line) === _expected;
  }
}
function _M0FP26oillee10moonsatkit9field__at(fields, index, label) {
  return index < 0 || index >= fields.length ? new _M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(1, 0, new _M0TPC16string10StringView(label, 0, label.length), "missing TLE field")) : new _M0DTPC16result6ResultGRPC16string10StringViewRP26oillee10moonsatkit8SatErrorE2Ok(_M0MPC15array5Array2atGRPC16string10StringViewE(fields, index));
}
function _M0FP26oillee10moonsatkit16parse__core__tle(line1, line2) {
  const fields1 = _M0FP26oillee10moonsatkit13split__fields(new _M0TPC16string10StringView(line1, 0, line1.length));
  const fields2 = _M0FP26oillee10moonsatkit13split__fields(new _M0TPC16string10StringView(line2, 0, line2.length));
  if (fields1.length < 9 || fields2.length < 8) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(1, 0, new _M0TPC16string10StringView(line1, 0, line1.length), "TLE lines do not contain enough fields"));
  }
  if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(_M0MPC15array5Array2atGRPC16string10StringViewE(fields1, 0), new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS824, 0, _M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS824.length)) || _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(_M0MPC15array5Array2atGRPC16string10StringViewE(fields2, 0), new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS825, 0, _M0FP26oillee10moonsatkit16parse__core__tleN7_2abindS825.length))) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(1, 0, new _M0TPC16string10StringView(line1, 0, line1.length), "TLE lines must begin with 1 and 2"));
  }
  const _bind = _M0FP26oillee10moonsatkit22parse__catalog__number(_M0MPC15array5Array2atGRPC16string10StringViewE(fields1, 1));
  let catalog1;
  if (_bind === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(3, 1, _M0MPC15array5Array2atGRPC16string10StringViewE(fields1, 1), "invalid catalog number"));
  } else {
    const _Some = _bind;
    catalog1 = _Some;
  }
  const _bind$2 = _M0FP26oillee10moonsatkit19parse__tle__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(fields2, 1));
  let catalog2;
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(3, 2, _M0MPC15array5Array2atGRPC16string10StringViewE(fields2, 1), "invalid catalog number"));
  } else {
    const _Some = _bind$2;
    catalog2 = _Some;
  }
  if (catalog1 !== catalog2) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(4, 2, _M0MPC15array5Array2atGRPC16string10StringViewE(fields2, 1), "catalog numbers do not match"));
  }
  const mean_motion_index = fields2.length > 7 ? 7 : fields2.length - 1 | 0;
  const _bind$3 = _M0FP26oillee10moonsatkit9field__at(fields1, 3, "epoch");
  let epoch;
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    const _value = _Ok._0;
    epoch = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$3;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$4 = _M0FP26oillee10moonsatkit9field__at(fields2, 2, "inclination");
  let inclination;
  if (_bind$4.$tag === 1) {
    const _Ok = _bind$4;
    const _value = _Ok._0;
    inclination = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$4;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$5 = _M0FP26oillee10moonsatkit9field__at(fields2, 3, "right_ascension");
  let right_ascension;
  if (_bind$5.$tag === 1) {
    const _Ok = _bind$5;
    const _value = _Ok._0;
    right_ascension = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$5;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$6 = _M0FP26oillee10moonsatkit9field__at(fields2, 4, "eccentricity");
  let eccentricity;
  if (_bind$6.$tag === 1) {
    const _Ok = _bind$6;
    const _value = _Ok._0;
    eccentricity = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$6;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$7 = _M0FP26oillee10moonsatkit9field__at(fields2, 5, "argument_of_perigee");
  let argument_of_perigee;
  if (_bind$7.$tag === 1) {
    const _Ok = _bind$7;
    const _value = _Ok._0;
    argument_of_perigee = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$7;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$8 = _M0FP26oillee10moonsatkit9field__at(fields2, 6, "mean_anomaly");
  let mean_anomaly;
  if (_bind$8.$tag === 1) {
    const _Ok = _bind$8;
    const _value = _Ok._0;
    mean_anomaly = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$8;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$9 = _M0FP26oillee10moonsatkit9field__at(fields2, mean_motion_index, "mean_motion");
  let mean_motion;
  if (_bind$9.$tag === 1) {
    const _Ok = _bind$9;
    const _value = _Ok._0;
    mean_motion = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$9;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$10 = _M0FP26oillee10moonsatkit9field__at(fields1, 4, "mean_motion_first_derivative");
  let mean_motion_first_derivative;
  if (_bind$10.$tag === 1) {
    const _Ok = _bind$10;
    const _value = _Ok._0;
    mean_motion_first_derivative = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$10;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$11 = _M0FP26oillee10moonsatkit9field__at(fields1, 5, "mean_motion_second_derivative");
  let mean_motion_second_derivative;
  if (_bind$11.$tag === 1) {
    const _Ok = _bind$11;
    const _value = _Ok._0;
    mean_motion_second_derivative = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$11;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$12 = _M0FP26oillee10moonsatkit9field__at(fields1, 6, "bstar");
  let bstar;
  if (_bind$12.$tag === 1) {
    const _Ok = _bind$12;
    const _value = _Ok._0;
    bstar = _M0MPC16string10StringView9to__owned(_value);
  } else {
    const _Err = _bind$12;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const line1_ok = _M0FP26oillee10moonsatkit12checksum__ok(new _M0TPC16string10StringView(line1, 0, line1.length));
  const line2_ok = _M0FP26oillee10moonsatkit12checksum__ok(new _M0TPC16string10StringView(line2, 0, line2.length));
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit3Tle(line1, line2, catalog1, epoch, inclination, right_ascension, eccentricity, argument_of_perigee, mean_anomaly, mean_motion, mean_motion_first_derivative, mean_motion_second_derivative, bstar, line1_ok, line2_ok));
}
function _M0FP26oillee10moonsatkit13validate__tle(line1, line2) {
  const _bind = _M0FP26oillee10moonsatkit16parse__core__tle(line1, line2);
  let tle;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    tle = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  if (!tle.checksum_line1_ok) {
    const _bind$2 = tle.line1;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(2, 1, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length), "line 1 checksum mismatch"));
  }
  if (!tle.checksum_line2_ok) {
    const _bind$2 = tle.line2;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit10tle__error(2, 2, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length), "line 2 checksum mismatch"));
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit3TleRP26oillee10moonsatkit8SatErrorE2Ok(tle);
}
function _M0FP26oillee10moonsatkit14parse__decimal(text) {
  if ((text.end - text.start | 0) === 0) {
    return undefined;
  }
  const value = new _M0TPB8MutLocalGiE(0);
  const valid = new _M0TPB8MutLocalGbE(true);
  const _p = _M0MPC16string10StringView4iter(text);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (_p$4 >= 48 && _p$4 <= 57) {
        value.val = (Math.imul(value.val, 10) | 0) + (_p$4 - 48 | 0) | 0;
      } else {
        valid.val = false;
      }
      continue;
    }
  }
  return valid.val ? value.val : undefined;
}
function _M0FP26oillee10moonsatkit14is__leap__year(year) {
  return (year % 4 | 0) === 0 && (year % 100 | 0) !== 0 || (year % 400 | 0) === 0;
}
function _M0FP26oillee10moonsatkit15days__in__month(year, month) {
  switch (month) {
    case 1: {
      return 31;
    }
    case 3: {
      return 31;
    }
    case 5: {
      return 31;
    }
    case 7: {
      return 31;
    }
    case 8: {
      return 31;
    }
    case 10: {
      return 31;
    }
    case 12: {
      return 31;
    }
    case 4: {
      return 30;
    }
    case 6: {
      return 30;
    }
    case 9: {
      return 30;
    }
    case 11: {
      return 30;
    }
    case 2: {
      return _M0FP26oillee10moonsatkit14is__leap__year(year) ? 29 : 28;
    }
    default: {
      return 0;
    }
  }
}
function _M0FP26oillee10moonsatkit14validate__date(year, month, day) {
  return month >= 1 && (month <= 12 && (day >= 1 && day <= _M0FP26oillee10moonsatkit15days__in__month(year, month)));
}
function _M0FP26oillee10moonsatkit14validate__time(hour, minute, second) {
  return hour >= 0 && (hour <= 23 && (minute >= 0 && (minute <= 59 && (second >= 0 && second <= 59))));
}
function _M0FP26oillee10moonsatkit11time__error(kind, fragment, message) {
  return _M0MP26oillee10moonsatkit8SatError11new_2einner(kind, message, _M0MPC16string10StringView9to__owned(fragment), 0);
}
function _M0FP26oillee10moonsatkit20parse__utc__datetime(text) {
  const trimmed = _M0MPC16string6String4trim(text, undefined);
  if ((trimmed.end - trimmed.start | 0) === 0) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(0, new _M0TPC16string10StringView(text, 0, text.length), "timestamp must not be empty"));
  }
  const without_z = _M0MPC15array5Array2atGRPC16string10StringViewE(_M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(trimmed, new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS953, 0, _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS953.length))), 0);
  const date_time_parts = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPB4Iter6filterGRPC16string10StringViewE(_M0MPC16string10StringView5split(without_z, new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS952, 0, _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS952.length)), (part) => !((part.end - part.start | 0) === 0)));
  const parts = date_time_parts.length === 2 ? date_time_parts : _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPB4Iter6filterGRPC16string10StringViewE(_M0MPC16string10StringView5split(without_z, new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS951, 0, _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS951.length)), (part) => !((part.end - part.start | 0) === 0)));
  if (parts.length !== 2) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, new _M0TPC16string10StringView(text, 0, text.length), "timestamp must use YYYY-MM-DDTHH:MM[:SS] format"));
  }
  const date_parts = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_M0MPC15array5Array2atGRPC16string10StringViewE(parts, 0), new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS950, 0, _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS950.length)));
  const time_parts = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_M0MPC15array5Array2atGRPC16string10StringViewE(parts, 1), new _M0TPC16string10StringView(_M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS949, 0, _M0FP26oillee10moonsatkit20parse__utc__datetimeN7_2abindS949.length)));
  if (date_parts.length !== 3) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(parts, 0), "timestamp date must use YYYY-MM-DD format"));
  }
  if (time_parts.length < 2 || time_parts.length > 3) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(parts, 1), "timestamp time must use HH:MM or HH:MM:SS format"));
  }
  const _bind = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 0));
  let year;
  if (_bind === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 0), "year must be a non-negative integer"));
  } else {
    const _Some = _bind;
    year = _Some;
  }
  const _bind$2 = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 1));
  let month;
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 1), "month must be a non-negative integer"));
  } else {
    const _Some = _bind$2;
    month = _Some;
  }
  const _bind$3 = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 2));
  let day;
  if (_bind$3 === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(date_parts, 2), "day must be a non-negative integer"));
  } else {
    const _Some = _bind$3;
    day = _Some;
  }
  const _bind$4 = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 0));
  let hour;
  if (_bind$4 === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 0), "hour must be a non-negative integer"));
  } else {
    const _Some = _bind$4;
    hour = _Some;
  }
  const _bind$5 = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 1));
  let minute;
  if (_bind$5 === undefined) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 1), "minute must be a non-negative integer"));
  } else {
    const _Some = _bind$5;
    minute = _Some;
  }
  let second;
  if (time_parts.length === 3) {
    const _bind$6 = _M0FP26oillee10moonsatkit14parse__decimal(_M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 2));
    if (_bind$6 === undefined) {
      return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(8, _M0MPC15array5Array2atGRPC16string10StringViewE(time_parts, 2), "second must be a non-negative integer"));
    } else {
      const _Some = _bind$6;
      second = _Some;
    }
  } else {
    second = 0;
  }
  if (!_M0FP26oillee10moonsatkit14validate__date(year, month, day)) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(9, _M0MPC15array5Array2atGRPC16string10StringViewE(parts, 0), "timestamp date is out of range"));
  }
  if (!_M0FP26oillee10moonsatkit14validate__time(hour, minute, second)) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11time__error(9, _M0MPC15array5Array2atGRPC16string10StringViewE(parts, 1), "timestamp time is out of range"));
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit11UtcDateTimeRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit11UtcDateTime(year, month, day, hour, minute, second));
}
function _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(self, seconds) {
  let total_seconds = (((Math.imul(self.hour, 3600) | 0) + (Math.imul(self.minute, 60) | 0) | 0) + self.second | 0) + seconds | 0;
  let day_shift = 0;
  while (true) {
    if (total_seconds >= 86400) {
      total_seconds = total_seconds - 86400 | 0;
      day_shift = day_shift + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (total_seconds < 0) {
      total_seconds = total_seconds + 86400 | 0;
      day_shift = day_shift - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let year = self.year;
  let month = self.month;
  let day = self.day;
  while (true) {
    if (day_shift > 0) {
      day_shift = day_shift - 1 | 0;
      day = day + 1 | 0;
      if (day > _M0FP26oillee10moonsatkit15days__in__month(year, month)) {
        day = 1;
        if (month === 12) {
          month = 1;
          year = year + 1 | 0;
        } else {
          month = month + 1 | 0;
        }
      }
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (day_shift < 0) {
      day_shift = day_shift + 1 | 0;
      day = day - 1 | 0;
      if (day === 0) {
        if (month === 1) {
          month = 12;
          year = year - 1 | 0;
        } else {
          month = month - 1 | 0;
        }
        day = _M0FP26oillee10moonsatkit15days__in__month(year, month);
      }
      continue;
    } else {
      break;
    }
  }
  return new _M0TP26oillee10moonsatkit11UtcDateTime(year, month, day, total_seconds / 3600 | 0, (total_seconds % 3600 | 0) / 60 | 0, total_seconds % 60 | 0);
}
function _M0FP26oillee10moonsatkit11julian__day(value) {
  const month_adjust = (14 - value.month | 0) / 12 | 0;
  const adjusted_year = (value.year + 4800 | 0) - month_adjust | 0;
  const adjusted_month = (value.month + (Math.imul(12, month_adjust) | 0) | 0) - 3 | 0;
  const julian_day_number = (((((value.day + (((Math.imul(153, adjusted_month) | 0) + 2 | 0) / 5 | 0) | 0) + (Math.imul(365, adjusted_year) | 0) | 0) + (adjusted_year / 4 | 0) | 0) - (adjusted_year / 100 | 0) | 0) + (adjusted_year / 400 | 0) | 0) - 32045 | 0;
  const fraction = ((value.hour + 0) * 3600 + (value.minute + 0) * 60 + (value.second + 0)) / 86400;
  return julian_day_number + 0 - 0.5 + fraction;
}
function _M0FP26oillee10moonsatkit11sgp4__error(message) {
  return _M0MP26oillee10moonsatkit8SatError11new_2einner(7, message, "", 0);
}
function _M0FP26oillee10moonsatkit15sgp4__normalize(angle) {
  const value = _M0IPC16double6DoublePB3Mod3mod(angle, 6.2831853071795862);
  return value < 0 ? value + 6.2831853071795862 : value;
}
function _M0FP26oillee10moonsatkit17sgp4__init__model(elements) {
  if (elements.eccentricity < 0 || elements.eccentricity >= 1) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11sgp4__error("TLE eccentricity must be in [0, 1)"));
  }
  if (elements.mean_motion_rad_per_min <= 0) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11sgp4__error("TLE mean motion must be positive"));
  }
  const ecco = elements.eccentricity;
  const inclo = elements.inclination_rad;
  const eccsq = ecco * ecco;
  const omeosq = 1 - eccsq;
  const rteosq = Math.sqrt(omeosq);
  const cosio = _M0FPC14math3cos(inclo);
  const cosio2 = cosio * cosio;
  const no_kozai = elements.mean_motion_rad_per_min;
  const ak = _M0FPC14math3pow(0.0743669161 / no_kozai, 0.66666666666666663);
  const d1 = 0.00081196200000000006 * (3 * cosio2 - 1) / (rteosq * omeosq);
  const delta0 = d1 / (ak * ak);
  const adel = ak * (1 - delta0 * delta0 - delta0 * (0.33333333333333331 + 134 * delta0 * delta0 / 81));
  const delta1 = d1 / (adel * adel);
  const no_unkozai = no_kozai / (1 + delta1);
  const ao = _M0FPC14math3pow(0.0743669161 / no_unkozai, 0.66666666666666663);
  const sinio = _M0FPC14math3sin(inclo);
  const po = ao * omeosq;
  const con42 = 1 - 5 * cosio2;
  const con41 = -con42 - 2 * cosio2;
  const posq = po * po;
  const rp = ao * (1 - ecco);
  if (6.2831853071795862 / no_unkozai >= 225) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(6, "deep-space SGP4 (SDP4) is not implemented yet", "", 0));
  }
  const qzms2t_default = _M0FPC14math3pow(0.0065849970249924157, 4);
  const perigee_km = (rp - 1) * 6378.135;
  let sfour_and_qzms24;
  if (perigee_km < 156) {
    const sfour_km = perigee_km < 98 ? 20 : perigee_km - 78;
    const q = _M0FPC14math3pow((120 - sfour_km) / 6378.135, 4);
    sfour_and_qzms24 = { _0: sfour_km / 6378.135 + 1, _1: q };
  } else {
    sfour_and_qzms24 = { _0: 1.0122292801892716, _1: qzms2t_default };
  }
  const sfour = sfour_and_qzms24._0;
  const qzms24 = sfour_and_qzms24._1;
  const isimp = perigee_km < 220;
  const pinvsq = 1 / posq;
  const tsi = 1 / (ao - sfour);
  const eta = ao * ecco * tsi;
  const etasq = eta * eta;
  const eeta = ecco * eta;
  const psisq = Math.abs(1 - etasq);
  const coef = qzms24 * _M0FPC14math3pow(tsi, 4);
  const coef1 = coef / _M0FPC14math3pow(psisq, 3.5);
  const cc2 = coef1 * no_unkozai * (ao * (1 + 1.5 * etasq + eeta * (4 + etasq)) + 0.00040598100000000003 * tsi / psisq * con41 * (8 + 3 * etasq * (8 + etasq)));
  const cc1 = elements.bstar * cc2;
  const cc3 = ecco > 0.0001 ? -2 * coef * tsi * -0.0023450697200115278 * no_unkozai * sinio / ecco : 0;
  const x1mth2 = 1 - cosio2;
  const cc4 = 2 * no_unkozai * coef1 * ao * omeosq * (eta * (2 + 0.5 * etasq) + ecco * (0.5 + 2 * etasq) - 0.001082616 * tsi / (ao * psisq) * (-3 * con41 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta)) + 0.75 * x1mth2 * (2 * etasq - eeta * (1 + etasq)) * _M0FPC14math3cos(2 * elements.argument_of_perigee_rad)));
  const cc5 = 2 * coef1 * ao * omeosq * (1 + 2.75 * (etasq + eeta) + eeta * etasq);
  const cosio4 = cosio2 * cosio2;
  const temp1 = 0.0016239240000000001 * pinvsq * no_unkozai;
  const temp2 = 0.5 * temp1 * 0.001082616 * pinvsq;
  const temp3 = 7.762359375e-007 * pinvsq * pinvsq * no_unkozai;
  const mdot = no_unkozai + 0.5 * temp1 * rteosq * con41 + 0.0625 * temp2 * rteosq * (13 - 78 * cosio2 + 137 * cosio4);
  const argpdot = -0.5 * temp1 * con42 + 0.0625 * temp2 * (7 - 114 * cosio2 + 395 * cosio4) + temp3 * (3 - 36 * cosio2 + 49 * cosio4);
  const xhdot1 = -temp1 * cosio;
  const nodedot = xhdot1 + (0.5 * temp2 * (4 - 19 * cosio2) + 2 * temp3 * (3 - 7 * cosio2)) * cosio;
  const omgcof = elements.bstar * cc3 * _M0FPC14math3cos(elements.argument_of_perigee_rad);
  const xmcof = ecco > 0.0001 ? -0.66666666666666663 * coef * elements.bstar / eeta : 0;
  const nodecf = 3.5 * omeosq * xhdot1 * cc1;
  const t2cof = 1.5 * cc1;
  const xlcof = Math.abs(cosio + 1) > 1.5e-012 ? 0.000586267430002882 * sinio * (3 + 5 * cosio) / (1 + cosio) : 0.000586267430002882 * sinio * (3 + 5 * cosio) / 1.5e-012;
  const aycof = 0.0011725348600057639 * sinio;
  const delmotemp = 1 + eta * _M0FPC14math3cos(elements.mean_anomaly_rad);
  const delmo = delmotemp * delmotemp * delmotemp;
  const sinmao = _M0FPC14math3sin(elements.mean_anomaly_rad);
  const x7thm1 = 7 * cosio2 - 1;
  let d2_d3_d4;
  if (isimp) {
    d2_d3_d4 = _M0FP26oillee10moonsatkit17sgp4__init__modelN5tupleS1386;
  } else {
    const cc1sq = cc1 * cc1;
    const d2 = 4 * ao * tsi * cc1sq;
    const temp = d2 * tsi * cc1 / 3;
    const d3 = (17 * ao + sfour) * temp;
    const d4 = 0.5 * temp * ao * tsi * (221 * ao + 31 * sfour) * cc1;
    d2_d3_d4 = { _0: d2, _1: d3, _2: d4 };
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit9Sgp4ModelRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit9Sgp4Model(elements.bstar, ecco, elements.argument_of_perigee_rad, inclo, elements.mean_anomaly_rad, elements.right_ascension_rad, no_unkozai, con41, eta, cc1, cc4, cc5, d2_d3_d4._0, d2_d3_d4._1, d2_d3_d4._2, delmo, sinmao, mdot, argpdot, nodedot, omgcof, xmcof, nodecf, t2cof, d2_d3_d4._0 + 2 * cc1 * cc1, 0.25 * (3 * d2_d3_d4._1 + cc1 * (12 * d2_d3_d4._0 + 10 * cc1 * cc1)), 0.2 * (3 * d2_d3_d4._2 + 12 * cc1 * d2_d3_d4._1 + 6 * d2_d3_d4._0 * d2_d3_d4._0 + 15 * cc1 * cc1 * (2 * d2_d3_d4._0 + cc1 * cc1)), x1mth2, x7thm1, aycof, xlcof, isimp));
}
function _M0FP26oillee10moonsatkit18parse__tle__double(text) {
  if ((text.end - text.start | 0) === 0) {
    return _M0DTPC16option6OptionGdE4None__;
  }
  const sign = new _M0TPB8MutLocalGdE(1);
  const value = new _M0TPB8MutLocalGdE(0);
  const scale = new _M0TPB8MutLocalGdE(0.1);
  const after_decimal = new _M0TPB8MutLocalGbE(false);
  const seen_digit = new _M0TPB8MutLocalGbE(false);
  const valid = new _M0TPB8MutLocalGbE(true);
  const index = new _M0TPB8MutLocalGiE(0);
  const _p = _M0MPC16string10StringView4iter(text);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (index.val === 0 && _p$4 === 45) {
        sign.val = -1;
      } else {
        if (index.val === 0 && _p$4 === 43) {
        } else {
          if (_p$4 === 46 && !after_decimal.val) {
            after_decimal.val = true;
          } else {
            if (_p$4 >= 48 && _p$4 <= 57) {
              seen_digit.val = true;
              const _p$5 = (_p$4 - 48 | 0) + 0;
              if (after_decimal.val) {
                value.val = value.val + _p$5 * scale.val;
                scale.val = scale.val * 0.1;
              } else {
                value.val = value.val * 10 + _p$5;
              }
            } else {
              valid.val = false;
            }
          }
        }
      }
      index.val = index.val + 1 | 0;
      continue;
    }
  }
  return valid.val && seen_digit.val ? new _M0DTPC16option6OptionGdE4Some(sign.val * value.val) : _M0DTPC16option6OptionGdE4None__;
}
function _M0FP26oillee10moonsatkit17parse__tle__epoch(epoch) {
  if (epoch.length < 8) {
    return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE epoch must use YYDDD.dddddddd format", epoch, 0));
  }
  const year_text = _M0MPC16string6String12view_2einner(epoch, 0, _M0FP26oillee10moonsatkit17parse__tle__epochN6constrS1387);
  const day_text = _M0MPC16string6String12view_2einner(epoch, 2, _M0FP26oillee10moonsatkit17parse__tle__epochN6constrS1388);
  const fraction_text = _M0MPC16string6String12view_2einner(epoch, 6, undefined);
  const _bind = _M0FP26oillee10moonsatkit14parse__decimal(year_text);
  let year_short;
  if (_bind === undefined) {
    return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE epoch year is invalid", _M0MPC16string10StringView9to__owned(year_text), 0));
  } else {
    const _Some = _bind;
    year_short = _Some;
  }
  const _bind$2 = _M0FP26oillee10moonsatkit14parse__decimal(day_text);
  let day_of_year;
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE epoch day is invalid", _M0MPC16string10StringView9to__owned(day_text), 0));
  } else {
    const _Some = _bind$2;
    day_of_year = _Some;
  }
  const _bind$3 = `0.${_M0MPC16string10StringView9to__owned(fraction_text)}`;
  const _bind$4 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
  let fraction;
  if (_bind$4.$tag === 1) {
    const _Some = _bind$4;
    fraction = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE epoch fraction is invalid", _M0MPC16string10StringView9to__owned(fraction_text), 0));
  }
  const year = year_short < 57 ? 2000 + year_short | 0 : 1900 + year_short | 0;
  const max_day = _M0FP26oillee10moonsatkit14is__leap__year(year) ? 366 : 365;
  if (day_of_year < 1 || day_of_year > max_day) {
    return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "TLE epoch day is out of range", _M0MPC16string10StringView9to__owned(day_text), 0));
  }
  let remaining = day_of_year;
  let month = 1;
  while (true) {
    if (remaining > _M0FP26oillee10moonsatkit15days__in__month(year, month)) {
      remaining = remaining - _M0FP26oillee10moonsatkit15days__in__month(year, month) | 0;
      month = month + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const seconds = fraction * 86400;
  let whole_seconds = _M0MPC16double6Double7to__int(_M0FPC16double5floor(seconds));
  if (whole_seconds >= 86400) {
    whole_seconds = 86399;
  }
  const value = new _M0TP26oillee10moonsatkit11UtcDateTime(year, month, remaining, whole_seconds / 3600 | 0, (whole_seconds % 3600 | 0) / 60 | 0, whole_seconds % 60 | 0);
  const epoch_jd = _M0FP26oillee10moonsatkit11julian__day(value) + (seconds - (whole_seconds + 0)) / 86400;
  return new _M0DTPC16result6ResultGURP26oillee10moonsatkit11UtcDateTimedERP26oillee10moonsatkit8SatErrorE2Ok({ _0: value, _1: epoch_jd });
}
function _M0FP26oillee10moonsatkit15orbit__elements(tle) {
  const _bind = _M0FP26oillee10moonsatkit17parse__tle__epoch(tle.epoch);
  let _bind$2;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    _bind$2 = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _epoch = _bind$2._0;
  const _epoch_jd = _bind$2._1;
  const _bind$3 = tle.inclination;
  const _bind$4 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
  let inclination_deg;
  if (_bind$4.$tag === 1) {
    const _Some = _bind$4;
    inclination_deg = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE inclination is invalid", tle.inclination, 0));
  }
  const _bind$5 = tle.right_ascension;
  const _bind$6 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$5, 0, _bind$5.length));
  let right_ascension_deg;
  if (_bind$6.$tag === 1) {
    const _Some = _bind$6;
    right_ascension_deg = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE right ascension is invalid", tle.right_ascension, 0));
  }
  const _bind$7 = `0.${tle.eccentricity}`;
  const _bind$8 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length));
  let eccentricity;
  if (_bind$8.$tag === 1) {
    const _Some = _bind$8;
    eccentricity = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE eccentricity is invalid", tle.eccentricity, 0));
  }
  const _bind$9 = tle.argument_of_perigee;
  const _bind$10 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$9, 0, _bind$9.length));
  let argument_of_perigee_deg;
  if (_bind$10.$tag === 1) {
    const _Some = _bind$10;
    argument_of_perigee_deg = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE argument of perigee is invalid", tle.argument_of_perigee, 0));
  }
  const _bind$11 = tle.mean_anomaly;
  const _bind$12 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$11, 0, _bind$11.length));
  let mean_anomaly_deg;
  if (_bind$12.$tag === 1) {
    const _Some = _bind$12;
    mean_anomaly_deg = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE mean anomaly is invalid", tle.mean_anomaly, 0));
  }
  const _bind$13 = tle.mean_motion;
  const _bind$14 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$13, 0, _bind$13.length));
  let mean_motion_rev_per_day;
  if (_bind$14.$tag === 1) {
    const _Some = _bind$14;
    mean_motion_rev_per_day = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE mean motion is invalid", tle.mean_motion, 0));
  }
  if (eccentricity < 0 || (eccentricity >= 1 || mean_motion_rev_per_day <= 0)) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "TLE orbital elements are out of range", "", 0));
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit13OrbitElementsRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit13OrbitElements(tle.catalog_number, _epoch, _epoch_jd, inclination_deg, right_ascension_deg, eccentricity, argument_of_perigee_deg, mean_anomaly_deg, mean_motion_rev_per_day, mean_motion_rev_per_day * 2 * 3.1415926535897931 / 1440));
}
function _M0FP26oillee10moonsatkit23parse__tle__exponential(text) {
  const compact = _M0MPC16string10StringView4trim(text, undefined);
  if ((compact.end - compact.start | 0) === 0 || (compact.end - compact.start | 0) < 3) {
    return _M0DTPC16option6OptionGdE4None__;
  }
  const exponent_marker = new _M0TPB8MutLocalGiE(-1);
  const index = new _M0TPB8MutLocalGiE(0);
  const _p = _M0MPC16string10StringView4iter(compact);
  while (true) {
    const _p$2 = _M0MPB4Iter4nextGcE(_p);
    if (_p$2 === -1) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      if (index.val > 0 && ((_p$4 === 43 || _p$4 === 45) && exponent_marker.val < 0)) {
        exponent_marker.val = index.val;
      }
      index.val = index.val + 1 | 0;
      continue;
    }
  }
  if (exponent_marker.val < 1 || (exponent_marker.val + 1 | 0) >= (compact.end - compact.start | 0)) {
    return _M0DTPC16option6OptionGdE4None__;
  }
  const mantissa_text = _M0MPC16string10StringView12view_2einner(compact, 0, exponent_marker.val);
  const exponent_text = _M0MPC16string10StringView12view_2einner(compact, exponent_marker.val, undefined);
  const mantissa_start = new _M0TPB8MutLocalGiE(0);
  const mantissa_sign = new _M0TPB8MutLocalGdE(1);
  const first = new _M0TPB8MutLocalGbE(true);
  const _p$2 = _M0MPC16string10StringView4iter(mantissa_text);
  while (true) {
    const _p$3 = _M0MPB4Iter4nextGcE(_p$2);
    if (_p$3 === -1) {
      break;
    } else {
      const _p$4 = _p$3;
      const _p$5 = _p$4;
      if (first.val) {
        if (_p$5 === 45) {
          mantissa_sign.val = -1;
          mantissa_start.val = 1;
        } else {
          if (_p$5 === 43) {
            mantissa_start.val = 1;
          }
        }
        first.val = false;
      }
      continue;
    }
  }
  const mantissa_digits = _M0MPC16string10StringView12view_2einner(mantissa_text, mantissa_start.val, undefined);
  const _bind = `0.${_M0MPC16string10StringView9to__owned(mantissa_digits)}`;
  const _bind$2 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind, 0, _bind.length));
  let mantissa;
  if (_bind$2.$tag === 1) {
    const _Some = _bind$2;
    mantissa = _Some._0;
  } else {
    return _M0DTPC16option6OptionGdE4None__;
  }
  const _bind$3 = _M0FP26oillee10moonsatkit18parse__tle__double(exponent_text);
  let exponent;
  if (_bind$3.$tag === 1) {
    const _Some = _bind$3;
    const _value = _Some._0;
    exponent = _M0MPC16double6Double7to__int(_value);
  } else {
    return _M0DTPC16option6OptionGdE4None__;
  }
  return new _M0DTPC16option6OptionGdE4Some(mantissa_sign.val * mantissa * _M0FPC14math3pow(10, exponent + 0));
}
function _M0FP26oillee10moonsatkit14sgp4__elements(tle) {
  const _bind = _M0FP26oillee10moonsatkit15orbit__elements(tle);
  let elements;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    elements = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$2 = tle.mean_motion_first_derivative;
  const _bind$3 = _M0FP26oillee10moonsatkit18parse__tle__double(new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
  let first_derivative;
  if (_bind$3.$tag === 1) {
    const _Some = _bind$3;
    first_derivative = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE mean motion first derivative is invalid", tle.mean_motion_first_derivative, 0));
  }
  const _bind$4 = tle.mean_motion_second_derivative;
  const _bind$5 = _M0FP26oillee10moonsatkit23parse__tle__exponential(new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
  let second_derivative;
  if (_bind$5.$tag === 1) {
    const _Some = _bind$5;
    second_derivative = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE mean motion second derivative is invalid", tle.mean_motion_second_derivative, 0));
  }
  const _bind$6 = tle.bstar;
  const _bind$7 = _M0FP26oillee10moonsatkit23parse__tle__exponential(new _M0TPC16string10StringView(_bind$6, 0, _bind$6.length));
  let bstar;
  if (_bind$7.$tag === 1) {
    const _Some = _bind$7;
    bstar = _Some._0;
  } else {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(5, "TLE BSTAR drag term is invalid", tle.bstar, 0));
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit12Sgp4ElementsRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit12Sgp4Elements(elements.catalog_number, elements.epoch, elements.epoch_julian_day, elements.inclination_deg * 0.017453292519943295, elements.right_ascension_deg * 0.017453292519943295, elements.eccentricity, elements.argument_of_perigee_deg * 0.017453292519943295, elements.mean_anomaly_deg * 0.017453292519943295, elements.mean_motion_rad_per_min, first_derivative, second_derivative, bstar));
}
function _M0FP26oillee10moonsatkit15propagate__sgp4(tle, instant) {
  const _bind = _M0FP26oillee10moonsatkit14sgp4__elements(tle);
  let elements;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    elements = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _bind$2 = _M0FP26oillee10moonsatkit17sgp4__init__model(elements);
  let model;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    model = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const tsince = (_M0FP26oillee10moonsatkit11julian__day(instant) - elements.epoch_julian_day) * 1440;
  const xmdf = model.mo + model.mdot * tsince;
  const argpdf = model.argpo + model.argpdot * tsince;
  const nodedf = model.nodeo + model.nodedot * tsince;
  const t2 = tsince * tsince;
  let argpm = argpdf;
  let mm = xmdf;
  let nodem = nodedf + model.nodecf * t2;
  let tempa = 1 - model.cc1 * tsince;
  let tempe = model.bstar * model.cc4 * tsince;
  let templ = model.t2cof * t2;
  if (!model.isimp) {
    const delomg = model.omgcof * tsince;
    const delmtemp = 1 + model.eta * _M0FPC14math3cos(xmdf);
    const delm = model.xmcof * (delmtemp * delmtemp * delmtemp - model.delmo);
    const temp = delomg + delm;
    mm = xmdf + temp;
    argpm = argpdf - temp;
    const t3 = t2 * tsince;
    const t4 = t3 * tsince;
    tempa = tempa - model.d2 * t2 - model.d3 * t3 - model.d4 * t4;
    tempe = tempe + model.bstar * model.cc5 * (_M0FPC14math3sin(mm) - model.sinmao);
    templ = templ + model.t3cof * t3 + t4 * (model.t4cof + tsince * model.t5cof);
  }
  let em = model.ecco - tempe;
  if (em >= 1 || em < -0.001) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11sgp4__error("propagated eccentricity is outside [0, 1)"));
  }
  if (em < 1e-006) {
    em = 1e-006;
  }
  const am = _M0FPC14math3pow(0.0743669161 / model.no_unkozai, 0.66666666666666663) * tempa * tempa;
  const nm = 0.0743669161 / _M0FPC14math3pow(am, 1.5);
  mm = mm + model.no_unkozai * templ;
  const xlm = mm + argpm + nodem;
  nodem = _M0FP26oillee10moonsatkit15sgp4__normalize(nodem);
  argpm = _M0FP26oillee10moonsatkit15sgp4__normalize(argpm);
  const xlm$2 = _M0FP26oillee10moonsatkit15sgp4__normalize(xlm);
  mm = _M0FP26oillee10moonsatkit15sgp4__normalize(xlm$2 - argpm - nodem);
  const sinim = _M0FPC14math3sin(model.inclo);
  const cosim = _M0FPC14math3cos(model.inclo);
  const ep = em;
  const xincp = model.inclo;
  const argpp = argpm;
  const nodep = nodem;
  const mp = mm;
  const axnl = ep * _M0FPC14math3cos(argpp);
  const temp = 1 / (am * (1 - ep * ep));
  const aynl = ep * _M0FPC14math3sin(argpp) + temp * model.aycof;
  const xl = mp + argpp + nodep + temp * model.xlcof * axnl;
  const u = _M0FP26oillee10moonsatkit15sgp4__normalize(xl - nodep);
  let eo1 = u;
  let correction = 1;
  let iteration = 0;
  while (true) {
    if (Math.abs(correction) >= 1e-012 && iteration < 10) {
      const sineo1 = _M0FPC14math3sin(eo1);
      const coseo1 = _M0FPC14math3cos(eo1);
      const denominator = 1 - coseo1 * axnl - sineo1 * aynl;
      correction = (u - aynl * coseo1 + axnl * sineo1 - eo1) / denominator;
      if (Math.abs(correction) >= 0.95) {
        correction = correction > 0 ? 0.95 : -0.95;
      }
      eo1 = eo1 + correction;
      iteration = iteration + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const sineo1 = _M0FPC14math3sin(eo1);
  const coseo1 = _M0FPC14math3cos(eo1);
  const ecose = axnl * coseo1 + aynl * sineo1;
  const esine = axnl * sineo1 - aynl * coseo1;
  const el2 = axnl * axnl + aynl * aynl;
  const pl = am * (1 - el2);
  if (pl <= 0) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE3Err(_M0FP26oillee10moonsatkit11sgp4__error("semi-latus rectum is not positive"));
  }
  const rl = am * (1 - ecose);
  const rdotl = Math.sqrt(am) * esine / rl;
  const rvdotl = Math.sqrt(pl) / rl;
  const betal = Math.sqrt(1 - el2);
  const temp$2 = esine / (1 + betal);
  const sinu = am / rl * (sineo1 - aynl - axnl * temp$2);
  const cosu = am / rl * (coseo1 - axnl + aynl * temp$2);
  let su = _M0FPC14math5atan2(sinu, cosu);
  const sin2u = 2 * cosu * sinu;
  const cos2u = 1 - 2 * sinu * sinu;
  const temp$3 = 1 / pl;
  const temp1 = 0.000541308 * temp$3;
  const temp2 = temp1 * temp$3;
  const mrt = rl * (1 - 1.5 * temp2 * betal * model.con41) + 0.5 * temp1 * model.x1mth2 * cos2u;
  su = su - 0.25 * temp2 * model.x7thm1 * sin2u;
  const xnode = nodep + 1.5 * temp2 * cosim * sin2u;
  const xinc = xincp + 1.5 * temp2 * cosim * sinim * cos2u;
  const mvt = rdotl - nm * temp1 * model.x1mth2 * sin2u / 0.0743669161;
  const rvdot = rvdotl + nm * temp1 * (model.x1mth2 * cos2u + 1.5 * model.con41) / 0.0743669161;
  const sinsu = _M0FPC14math3sin(su);
  const cossu = _M0FPC14math3cos(su);
  const snod = _M0FPC14math3sin(xnode);
  const cnod = _M0FPC14math3cos(xnode);
  const sini = _M0FPC14math3sin(xinc);
  const cosi = _M0FPC14math3cos(xinc);
  const xmx = -snod * cosi;
  const xmy = cnod * cosi;
  const ux = xmx * sinsu + cnod * cossu;
  const uy = xmy * sinsu + snod * cossu;
  const uz = sini * sinsu;
  const vx = xmx * cossu - cnod * sinsu;
  const vy = xmy * cossu - snod * sinsu;
  const vz = sini * cossu;
  const radius_scale = mrt * 6378.135;
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10OrbitStateRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit10OrbitState(instant, new _M0TP26oillee10moonsatkit7Vector3(radius_scale * ux, radius_scale * uy, radius_scale * uz), new _M0TP26oillee10moonsatkit7Vector3((mvt * ux + rvdot * vx) * 7.9053705069912246, (mvt * uy + rvdot * vy) * 7.9053705069912246, (mvt * uz + rvdot * vz) * 7.9053705069912246)));
}
function _M0FP26oillee10moonsatkit18normalize__radians(angle) {
  const wrapped = _M0IPC16double6DoublePB3Mod3mod(angle, 6.2831853071795862);
  return wrapped < 0 ? wrapped + 6.2831853071795862 : wrapped;
}
function _M0FP26oillee10moonsatkit11gmst__angle(julian_day_value) {
  const centuries = (julian_day_value - 2451545) / 36525;
  const degrees = 280.46061837 + 360.98564736629 * (julian_day_value - 2451545) + 0.000387933 * centuries * centuries - centuries * centuries * centuries / 38710000;
  return _M0FP26oillee10moonsatkit18normalize__radians(degrees * 3.1415926535897931 / 180);
}
function _M0FP26oillee10moonsatkit31greenwich__mean__sidereal__time(value) {
  return _M0FP26oillee10moonsatkit11gmst__angle(_M0FP26oillee10moonsatkit11julian__day(value));
}
function _M0FP26oillee10moonsatkit13eci__to__ecef(position, instant) {
  const theta = _M0FP26oillee10moonsatkit31greenwich__mean__sidereal__time(instant);
  const cosine = _M0FPC14math3cos(theta);
  const sine = _M0FPC14math3sin(theta);
  return new _M0TP26oillee10moonsatkit7Vector3(cosine * position.x + sine * position.y, -sine * position.x + cosine * position.y, position.z);
}
function _M0FP26oillee10moonsatkit20eci__to__ecef__state(state) {
  const theta = _M0FP26oillee10moonsatkit31greenwich__mean__sidereal__time(state.epoch);
  const cosine = _M0FPC14math3cos(theta);
  const sine = _M0FPC14math3sin(theta);
  const rotation_adjusted_velocity_x = state.velocity_km_s.x + 7.2921151467e-005 * state.position_km.y;
  const rotation_adjusted_velocity_y = state.velocity_km_s.y - 7.2921151467e-005 * state.position_km.x;
  const rotation_adjusted_velocity_z = state.velocity_km_s.z;
  return new _M0TP26oillee10moonsatkit9EcefState(state.epoch, _M0FP26oillee10moonsatkit13eci__to__ecef(state.position_km, state.epoch), new _M0TP26oillee10moonsatkit7Vector3(cosine * rotation_adjusted_velocity_x + sine * rotation_adjusted_velocity_y, -sine * rotation_adjusted_velocity_x + cosine * rotation_adjusted_velocity_y, rotation_adjusted_velocity_z));
}
function _M0FP26oillee10moonsatkit18geodetic__to__ecef(value) {
  const latitude = value.latitude_deg * 3.1415926535897931 / 180;
  const longitude = value.longitude_deg * 3.1415926535897931 / 180;
  const sine_latitude = _M0FPC14math3sin(latitude);
  const cosine_latitude = _M0FPC14math3cos(latitude);
  const prime_vertical_radius = 6378.137 / Math.sqrt(1 - 0.0066943799901413165 * sine_latitude * sine_latitude);
  const radius = prime_vertical_radius + value.altitude_km;
  return new _M0TP26oillee10moonsatkit7Vector3(radius * cosine_latitude * _M0FPC14math3cos(longitude), radius * cosine_latitude * _M0FPC14math3sin(longitude), (prime_vertical_radius * 0.99330562000985867 + value.altitude_km) * sine_latitude);
}
function _M0FP26oillee10moonsatkit25ground__station__to__ecef(station) {
  return _M0FP26oillee10moonsatkit18geodetic__to__ecef(new _M0TP26oillee10moonsatkit16GeodeticPosition(station.latitude_deg, station.longitude_deg, station.altitude_m / 1000));
}
function _M0FP26oillee10moonsatkit31normalize__observation__degrees(angle) {
  const wrapped = _M0IPC16double6DoublePB3Mod3mod(angle, 360);
  return wrapped < 0 ? wrapped + 360 : wrapped;
}
function _M0MP26oillee10moonsatkit7Vector33sub(self, other) {
  return new _M0TP26oillee10moonsatkit7Vector3(self.x - other.x, self.y - other.y, self.z - other.z);
}
function _M0FP26oillee10moonsatkit13observe__ecef(state, station) {
  const station_position = _M0FP26oillee10moonsatkit25ground__station__to__ecef(station);
  const relative_position = _M0MP26oillee10moonsatkit7Vector33sub(state.position_km, station_position);
  const latitude = station.latitude_deg * 3.1415926535897931 / 180;
  const longitude = station.longitude_deg * 3.1415926535897931 / 180;
  const sine_latitude = _M0FPC14math3sin(latitude);
  const cosine_latitude = _M0FPC14math3cos(latitude);
  const sine_longitude = _M0FPC14math3sin(longitude);
  const cosine_longitude = _M0FPC14math3cos(longitude);
  const east = -sine_longitude * relative_position.x + cosine_longitude * relative_position.y;
  const north = -sine_latitude * cosine_longitude * relative_position.x - sine_latitude * sine_longitude * relative_position.y + cosine_latitude * relative_position.z;
  const up = cosine_latitude * cosine_longitude * relative_position.x + cosine_latitude * sine_longitude * relative_position.y + sine_latitude * relative_position.z;
  const horizontal_range = Math.sqrt(east * east + north * north);
  const range = Math.sqrt(horizontal_range * horizontal_range + up * up);
  let azimuth;
  if (horizontal_range < 1e-012) {
    azimuth = 0;
  } else {
    const raw_degrees = _M0FPC14math5atan2(east, north) * 180 / 3.1415926535897931;
    azimuth = _M0FP26oillee10moonsatkit31normalize__observation__degrees(raw_degrees);
  }
  const elevation = range < 1e-012 ? 90 : _M0FPC14math5atan2(up, horizontal_range) * 180 / 3.1415926535897931;
  let range_rate;
  if (range < 1e-012) {
    range_rate = 0;
  } else {
    const _p = state.velocity_km_s;
    range_rate = (relative_position.x * _p.x + relative_position.y * _p.y + relative_position.z * _p.z) / range;
  }
  return new _M0TP26oillee10moonsatkit11Observation(azimuth, elevation, range, range_rate, elevation >= 0);
}
function _M0FP26oillee10moonsatkit7observe(state, station) {
  return _M0FP26oillee10moonsatkit13observe__ecef(_M0FP26oillee10moonsatkit20eci__to__ecef__state(state), station);
}
function _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, instant) {
  const _bind = _M0FP26oillee10moonsatkit15propagate__sgp4(tle, instant);
  let state;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    state = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  return new _M0DTPC16result6ResultGdRP26oillee10moonsatkit8SatErrorE2Ok(_M0FP26oillee10moonsatkit7observe(state, station).elevation_deg);
}
function _M0FP26oillee10moonsatkit27refine__sgp4__pass__maximum(tle, station, from, lower_offset, upper_offset, seed_offset, seed_elevation) {
  let lower = seed_offset - 60 | 0;
  if (lower < lower_offset) {
    lower = lower_offset;
  }
  let upper = seed_offset + 60 | 0;
  if (upper > upper_offset) {
    upper = upper_offset;
  }
  let best_offset = seed_offset;
  let best_elevation = seed_elevation;
  let cursor = lower;
  while (true) {
    if (cursor <= upper) {
      const _bind = _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, cursor));
      let elevation;
      if (_bind.$tag === 1) {
        const _Ok = _bind;
        elevation = _Ok._0;
      } else {
        const _Err = _bind;
        const _error = _Err._0;
        return new _M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE3Err(_error);
      }
      if (elevation > best_elevation) {
        best_offset = cursor;
        best_elevation = elevation;
      }
      cursor = cursor + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGUidERP26oillee10moonsatkit8SatErrorE2Ok({ _0: best_offset, _1: best_elevation });
}
function _M0FP26oillee10moonsatkit24make__sgp4__pass__window(tle, station, from, minimum_elevation_deg, aos_offset, los_offset, maximum_offset, maximum_elevation) {
  const _bind = _M0FP26oillee10moonsatkit27refine__sgp4__pass__maximum(tle, station, from, aos_offset, los_offset, maximum_offset, maximum_elevation);
  let _bind$2;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    _bind$2 = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  const _tca_offset = _bind$2._0;
  const _refined_maximum = _bind$2._1;
  if (_refined_maximum < minimum_elevation_deg) {
    return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "pass maximum elevation is below threshold", "", 0));
  }
  return new _M0DTPC16result6ResultGRP26oillee10moonsatkit10PassWindowRP26oillee10moonsatkit8SatErrorE2Ok(new _M0TP26oillee10moonsatkit10PassWindow(_M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, aos_offset), _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, _tca_offset), _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, los_offset), _refined_maximum));
}
function _M0FP26oillee10moonsatkit31refine__sgp4__horizon__crossing(tle, station, from, lower_offset, upper_offset, minimum_elevation_deg, rising) {
  let lower = lower_offset;
  let upper = upper_offset;
  while (true) {
    if ((upper - lower | 0) > 1) {
      const middle = lower + ((upper - lower | 0) / 2 | 0) | 0;
      const _bind = _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, middle));
      let elevation;
      if (_bind.$tag === 1) {
        const _Ok = _bind;
        elevation = _Ok._0;
      } else {
        const _Err = _bind;
        const _error = _Err._0;
        return new _M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE3Err(_error);
      }
      if (rising) {
        if (elevation >= minimum_elevation_deg) {
          upper = middle;
        } else {
          lower = middle;
        }
      } else {
        if (elevation >= minimum_elevation_deg) {
          lower = middle;
        } else {
          upper = middle;
        }
      }
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGiRP26oillee10moonsatkit8SatErrorE2Ok(rising ? upper : lower);
}
function _M0FP26oillee10moonsatkit21predict__passes__sgp4(tle, station, from, duration_hours, minimum_elevation_deg) {
  if (duration_hours <= 0) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "pass prediction duration must be positive", "", 0));
  }
  if (minimum_elevation_deg < -90 || minimum_elevation_deg > 90) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "minimum elevation must be between -90 and 90 degrees", "", 0));
  }
  const duration_seconds = Math.imul(duration_hours, 3600) | 0;
  const passes = [];
  let previous_offset = 0;
  const _bind = _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, from);
  let previous_elevation;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    previous_elevation = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
  }
  let in_pass = previous_elevation >= minimum_elevation_deg;
  let aos_offset = 0;
  let maximum_offset = 0;
  let maximum_elevation = previous_elevation;
  let offset = 60;
  while (true) {
    if (offset <= duration_seconds) {
      const _bind$2 = _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, offset));
      let current_elevation;
      if (_bind$2.$tag === 1) {
        const _Ok = _bind$2;
        current_elevation = _Ok._0;
      } else {
        const _Err = _bind$2;
        const _error = _Err._0;
        return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
      }
      if (!in_pass) {
        if (previous_elevation < minimum_elevation_deg && current_elevation >= minimum_elevation_deg) {
          const _bind$3 = _M0FP26oillee10moonsatkit31refine__sgp4__horizon__crossing(tle, station, from, previous_offset, offset, minimum_elevation_deg, true);
          let _tmp;
          if (_bind$3.$tag === 1) {
            const _Ok = _bind$3;
            _tmp = _Ok._0;
          } else {
            const _Err = _bind$3;
            const _error = _Err._0;
            return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
          }
          aos_offset = _tmp;
          maximum_offset = offset;
          maximum_elevation = current_elevation;
          in_pass = true;
        }
      } else {
        if (current_elevation >= minimum_elevation_deg) {
          if (current_elevation > maximum_elevation) {
            maximum_offset = offset;
            maximum_elevation = current_elevation;
          }
        } else {
          const _bind$3 = _M0FP26oillee10moonsatkit31refine__sgp4__horizon__crossing(tle, station, from, previous_offset, offset, minimum_elevation_deg, false);
          let los_offset;
          if (_bind$3.$tag === 1) {
            const _Ok = _bind$3;
            los_offset = _Ok._0;
          } else {
            const _Err = _bind$3;
            const _error = _Err._0;
            return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
          }
          const _bind$4 = _M0FP26oillee10moonsatkit24make__sgp4__pass__window(tle, station, from, minimum_elevation_deg, aos_offset, los_offset, maximum_offset, maximum_elevation);
          let window;
          if (_bind$4.$tag === 1) {
            const _Ok = _bind$4;
            window = _Ok._0;
          } else {
            const _Err = _bind$4;
            const _error = _Err._0;
            return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
          }
          _M0MPC15array5Array4pushGRP26oillee10moonsatkit10PassWindowE(passes, window);
          in_pass = false;
          maximum_elevation = current_elevation;
        }
      }
      previous_offset = offset;
      previous_elevation = current_elevation;
      offset = offset + 60 | 0;
      continue;
    } else {
      break;
    }
  }
  if (previous_offset < duration_seconds) {
    const _bind$2 = _M0FP26oillee10moonsatkit21sgp4__pass__elevation(tle, station, _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, duration_seconds));
    let current_elevation;
    if (_bind$2.$tag === 1) {
      const _Ok = _bind$2;
      current_elevation = _Ok._0;
    } else {
      const _Err = _bind$2;
      const _error = _Err._0;
      return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
    }
    if (!in_pass) {
      if (previous_elevation < minimum_elevation_deg && current_elevation >= minimum_elevation_deg) {
        const _bind$3 = _M0FP26oillee10moonsatkit31refine__sgp4__horizon__crossing(tle, station, from, previous_offset, duration_seconds, minimum_elevation_deg, true);
        let _tmp;
        if (_bind$3.$tag === 1) {
          const _Ok = _bind$3;
          _tmp = _Ok._0;
        } else {
          const _Err = _bind$3;
          const _error = _Err._0;
          return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
        }
        aos_offset = _tmp;
        maximum_offset = duration_seconds;
        maximum_elevation = current_elevation;
        in_pass = true;
      }
    } else {
      if (current_elevation >= minimum_elevation_deg) {
        if (current_elevation > maximum_elevation) {
          maximum_offset = duration_seconds;
          maximum_elevation = current_elevation;
        }
      } else {
        const _bind$3 = _M0FP26oillee10moonsatkit31refine__sgp4__horizon__crossing(tle, station, from, previous_offset, duration_seconds, minimum_elevation_deg, false);
        let los_offset;
        if (_bind$3.$tag === 1) {
          const _Ok = _bind$3;
          los_offset = _Ok._0;
        } else {
          const _Err = _bind$3;
          const _error = _Err._0;
          return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
        }
        const _bind$4 = _M0FP26oillee10moonsatkit24make__sgp4__pass__window(tle, station, from, minimum_elevation_deg, aos_offset, los_offset, maximum_offset, maximum_elevation);
        let window;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          window = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _error = _Err._0;
          return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
        }
        _M0MPC15array5Array4pushGRP26oillee10moonsatkit10PassWindowE(passes, window);
        in_pass = false;
      }
    }
  }
  if (in_pass) {
    const _bind$2 = _M0FP26oillee10moonsatkit24make__sgp4__pass__window(tle, station, from, minimum_elevation_deg, aos_offset, duration_seconds, maximum_offset, maximum_elevation);
    let window;
    if (_bind$2.$tag === 1) {
      const _Ok = _bind$2;
      window = _Ok._0;
    } else {
      const _Err = _bind$2;
      const _error = _Err._0;
      return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE3Err(_error);
    }
    _M0MPC15array5Array4pushGRP26oillee10moonsatkit10PassWindowE(passes, window);
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP26oillee10moonsatkit10PassWindowERP26oillee10moonsatkit8SatErrorE2Ok(passes);
}
function _M0FP26oillee10moonsatkit18ecef__to__geodetic(position) {
  const distance_from_axis = Math.sqrt(position.x * position.x + position.y * position.y);
  if (distance_from_axis < 1e-012) {
    const latitude = position.z < 0 ? -90 : 90;
    return new _M0TP26oillee10moonsatkit16GeodeticPosition(latitude, 0, Math.abs(position.z) - 6356.7523142451792);
  } else {
    const longitude = _M0FPC14math5atan2(position.y, position.x);
    let latitude = _M0FPC14math5atan2(position.z, distance_from_axis * 0.99330562000985867);
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < 8) {
        const sine_latitude = _M0FPC14math3sin(latitude);
        const prime_vertical_radius = 6378.137 / Math.sqrt(1 - 0.0066943799901413165 * sine_latitude * sine_latitude);
        const altitude = distance_from_axis / _M0FPC14math3cos(latitude) - prime_vertical_radius;
        latitude = _M0FPC14math5atan2(position.z, distance_from_axis * (1 - 0.0066943799901413165 * prime_vertical_radius / (prime_vertical_radius + altitude)));
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const sine_latitude = _M0FPC14math3sin(latitude);
    const prime_vertical_radius = 6378.137 / Math.sqrt(1 - 0.0066943799901413165 * sine_latitude * sine_latitude);
    const altitude = distance_from_axis / _M0FPC14math3cos(latitude) - prime_vertical_radius;
    return new _M0TP26oillee10moonsatkit16GeodeticPosition(latitude * 180 / 3.1415926535897931, longitude * 180 / 3.1415926535897931, altitude);
  }
}
function _M0FP26oillee10moonsatkit22orbit__state__geodetic(state) {
  return _M0FP26oillee10moonsatkit18ecef__to__geodetic(_M0FP26oillee10moonsatkit13eci__to__ecef(state.position_km, state.epoch));
}
function _M0FP26oillee10moonsatkit23pass__windows__to__json(passes) {
  let output = "[";
  let first = true;
  const _bind = passes.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const pass = passes[_];
      if (!first) {
        output = `${output},`;
      }
      first = false;
      const _tmp$2 = output;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(53);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{\"aos\":\"");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MP26oillee10moonsatkit11UtcDateTime10to__string(pass.aos));
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\",\"tca\":\"");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MP26oillee10moonsatkit11UtcDateTime10to__string(pass.tca));
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\",\"los\":\"");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MP26oillee10moonsatkit11UtcDateTime10to__string(pass.los));
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\",\"maximum_elevation_deg\":");
      _M0MPB13StringBuilder13write__objectGdE(_string_builder, pass.maximum_elevation_deg);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "}");
      output = `${_tmp$2}${_string_builder.val}`;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${output}]`;
}
function _M0FP26oillee10moonsatkit20track__geojson__sgp4(tle, from, duration_seconds, step_seconds) {
  if (duration_seconds < 0) {
    return new _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "track duration must not be negative", "", 0));
  }
  if (step_seconds <= 0) {
    return new _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE3Err(_M0MP26oillee10moonsatkit8SatError11new_2einner(9, "track step must be positive", "", 0));
  }
  let coordinates = "";
  let first = true;
  let offset = 0;
  while (true) {
    if (offset <= duration_seconds) {
      const instant = _M0MP26oillee10moonsatkit11UtcDateTime12add__seconds(from, offset);
      const _bind = _M0FP26oillee10moonsatkit15propagate__sgp4(tle, instant);
      let state;
      if (_bind.$tag === 1) {
        const _Ok = _bind;
        state = _Ok._0;
      } else {
        const _Err = _bind;
        const _error = _Err._0;
        return new _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE3Err(_error);
      }
      const geodetic = _M0FP26oillee10moonsatkit22orbit__state__geodetic(state);
      if (!first) {
        coordinates = `${coordinates},`;
      }
      first = false;
      const _tmp = coordinates;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "[");
      _M0MPB13StringBuilder13write__objectGdE(_string_builder, geodetic.longitude_deg);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ",");
      _M0MPB13StringBuilder13write__objectGdE(_string_builder, geodetic.latitude_deg);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ",");
      _M0MPB13StringBuilder13write__objectGdE(_string_builder, geodetic.altitude_km);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "]");
      coordinates = `${_tmp}${_string_builder.val}`;
      offset = offset + step_seconds | 0;
      continue;
    } else {
      break;
    }
  }
  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(148);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{\"type\":\"Feature\",\"properties\":{\"catalog_number\":");
  _M0MPB13StringBuilder13write__objectGiE(_string_builder, tle.catalog_number);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ",\"start\":\"");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MP26oillee10moonsatkit11UtcDateTime10to__string(from));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\",\"duration_seconds\":");
  _M0MPB13StringBuilder13write__objectGiE(_string_builder, duration_seconds);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, ",\"step_seconds\":");
  _M0MPB13StringBuilder13write__objectGiE(_string_builder, step_seconds);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "},\"geometry\":{\"type\":\"LineString\",\"coordinates\":[");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, coordinates);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "]}}");
  return new _M0DTPC16result6ResultGsRP26oillee10moonsatkit8SatErrorE2Ok(_string_builder.val);
}
function _M0FP46oillee10moonsatkit3web4wasm11error__json(error) {
  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(23);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{\"ok\":false,\"error\":\"");
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MP26oillee10moonsatkit8SatError10to__string(error));
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "\"}");
  return _string_builder.val;
}
function _M0FP46oillee10moonsatkit3web4wasm24moon__sat__validate__tle(line1, line2) {
  const _bind = _M0FP26oillee10moonsatkit13validate__tle(line1, line2);
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    const _tle = _Ok._0;
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(29);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{\"ok\":true,\"catalog_number\":");
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, _tle.catalog_number);
    _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "}");
    return _string_builder.val;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
}
function _M0FP46oillee10moonsatkit3web4wasm25moon__sat__track__geojson(line1, line2, from_text, duration_seconds, step_seconds) {
  const _bind = _M0FP26oillee10moonsatkit13validate__tle(line1, line2);
  let tle;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    tle = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
  const _bind$2 = _M0FP26oillee10moonsatkit20parse__utc__datetime(from_text);
  let from;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    from = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
  const _bind$3 = _M0FP26oillee10moonsatkit20track__geojson__sgp4(tle, from, duration_seconds, step_seconds);
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    const _value = _Ok._0;
    return `{\"ok\":true,\"track\":${_value}}`;
  } else {
    const _Err = _bind$3;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
}
function _M0FP46oillee10moonsatkit3web4wasm23moon__sat__passes__json(line1, line2, station_latitude_deg, station_longitude_deg, station_altitude_m, from_text, duration_hours, minimum_elevation_deg) {
  const _bind = _M0FP26oillee10moonsatkit13validate__tle(line1, line2);
  let tle;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    tle = _Ok._0;
  } else {
    const _Err = _bind;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
  const _bind$2 = _M0FP26oillee10moonsatkit20parse__utc__datetime(from_text);
  let from;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    from = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
  const station = new _M0TP26oillee10moonsatkit13GroundStation(station_latitude_deg, station_longitude_deg, station_altitude_m);
  const _bind$3 = _M0FP26oillee10moonsatkit21predict__passes__sgp4(tle, station, from, duration_hours, minimum_elevation_deg);
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    const _passes = _Ok._0;
    return `{\"ok\":true,\"passes\":${_M0FP26oillee10moonsatkit23pass__windows__to__json(_passes)}}`;
  } else {
    const _Err = _bind$3;
    const _error = _Err._0;
    return _M0FP46oillee10moonsatkit3web4wasm11error__json(_error);
  }
}
export { _M0FP46oillee10moonsatkit3web4wasm24moon__sat__validate__tle as moon_sat_validate_tle, _M0FP46oillee10moonsatkit3web4wasm25moon__sat__track__geojson as moon_sat_track_geojson, _M0FP46oillee10moonsatkit3web4wasm23moon__sat__passes__json as moon_sat_passes_json }
