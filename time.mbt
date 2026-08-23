///|
fn parse_decimal(text : StringView) -> Int? {
  if text.is_empty() {
    return None
  }
  let mut value = 0
  let mut valid = true
  text
  .iter()
  .each(char => {
    if char >= '0' && char <= '9' {
      value = value * 10 + (char.to_int() - '0'.to_int())
    } else {
      valid = false
    }
  })
  if valid {
    Some(value)
  } else {
    None
  }
}

///|
pub fn is_leap_year(year : Int) -> Bool {
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

///|
pub fn days_in_month(year : Int, month : Int) -> Int {
  match month {
    1 | 3 | 5 | 7 | 8 | 10 | 12 => 31
    4 | 6 | 9 | 11 => 30
    2 => if is_leap_year(year) { 29 } else { 28 }
    _ => 0
  }
}

///|
fn validate_date(year : Int, month : Int, day : Int) -> Bool {
  month >= 1 && month <= 12 && day >= 1 && day <= days_in_month(year, month)
}

///|
fn validate_time(hour : Int, minute : Int, second : Int) -> Bool {
  hour >= 0 &&
  hour <= 23 &&
  minute >= 0 &&
  minute <= 59 &&
  second >= 0 &&
  second <= 59
}

///|
fn time_error(
  kind : SatErrorKind,
  fragment : StringView,
  message : String,
) -> SatError {
  SatError::new(kind, message, fragment=fragment.to_owned())
}

///|
pub fn parse_utc_datetime(text : String) -> Result[UtcDateTime, SatError] {
  let trimmed = text.trim()
  if trimmed.is_empty() {
    return Err(time_error(EmptyInput, text, "timestamp must not be empty"))
  }
  let without_z = trimmed.split("Z").to_array()[0]
  let date_time_parts = without_z
    .split("T")
    .filter(part => !part.is_empty())
    .to_array()
  let parts = if date_time_parts.length() == 2 {
    date_time_parts
  } else {
    without_z.split(" ").filter(part => !part.is_empty()).to_array()
  }
  if parts.length() != 2 {
    return Err(
      time_error(
        InvalidDateTime,
        text,
        "timestamp must use YYYY-MM-DDTHH:MM[:SS] format",
      ),
    )
  }
  let date_parts = parts[0].split("-").to_array()
  let time_parts = parts[1].split(":").to_array()
  if date_parts.length() != 3 {
    return Err(
      time_error(
        InvalidDateTime,
        parts[0],
        "timestamp date must use YYYY-MM-DD format",
      ),
    )
  }
  if time_parts.length() < 2 || time_parts.length() > 3 {
    return Err(
      time_error(
        InvalidDateTime,
        parts[1],
        "timestamp time must use HH:MM or HH:MM:SS format",
      ),
    )
  }
  let year = match parse_decimal(date_parts[0]) {
    Some(value) => value
    None =>
      return Err(
        time_error(
          InvalidDateTime,
          date_parts[0],
          "year must be a non-negative integer",
        ),
      )
  }
  let month = match parse_decimal(date_parts[1]) {
    Some(value) => value
    None =>
      return Err(
        time_error(
          InvalidDateTime,
          date_parts[1],
          "month must be a non-negative integer",
        ),
      )
  }
  let day = match parse_decimal(date_parts[2]) {
    Some(value) => value
    None =>
      return Err(
        time_error(
          InvalidDateTime,
          date_parts[2],
          "day must be a non-negative integer",
        ),
      )
  }
  let hour = match parse_decimal(time_parts[0]) {
    Some(value) => value
    None =>
      return Err(
        time_error(
          InvalidDateTime,
          time_parts[0],
          "hour must be a non-negative integer",
        ),
      )
  }
  let minute = match parse_decimal(time_parts[1]) {
    Some(value) => value
    None =>
      return Err(
        time_error(
          InvalidDateTime,
          time_parts[1],
          "minute must be a non-negative integer",
        ),
      )
  }
  let second = if time_parts.length() == 3 {
    match parse_decimal(time_parts[2]) {
      Some(value) => value
      None =>
        return Err(
          time_error(
            InvalidDateTime,
            time_parts[2],
            "second must be a non-negative integer",
          ),
        )
    }
  } else {
    0
  }
  if !validate_date(year, month, day) {
    return Err(
      time_error(OutOfRange, parts[0], "timestamp date is out of range"),
    )
  }
  if !validate_time(hour, minute, second) {
    return Err(
      time_error(OutOfRange, parts[1], "timestamp time is out of range"),
    )
  }
  Ok({ year, month, day, hour, minute, second })
}

///|
/// Add an integral number of seconds to a UTC civil timestamp.
///
/// This helper is intentionally calendar-based, so pass-search event times
/// remain integer-second UTC values without relying on a platform date API.
pub fn UtcDateTime::add_seconds(
  self : UtcDateTime,
  seconds : Int,
) -> UtcDateTime {
  let mut total_seconds = self.hour * 3600 +
    self.minute * 60 +
    self.second +
    seconds
  let mut day_shift = 0
  while total_seconds >= 86400 {
    total_seconds = total_seconds - 86400
    day_shift = day_shift + 1
  }
  while total_seconds < 0 {
    total_seconds = total_seconds + 86400
    day_shift = day_shift - 1
  }
  let mut year = self.year
  let mut month = self.month
  let mut day = self.day
  while day_shift > 0 {
    day_shift = day_shift - 1
    day = day + 1
    if day > days_in_month(year, month) {
      day = 1
      if month == 12 {
        month = 1
        year = year + 1
      } else {
        month = month + 1
      }
    }
  }
  while day_shift < 0 {
    day_shift = day_shift + 1
    day = day - 1
    if day == 0 {
      if month == 1 {
        month = 12
        year = year - 1
      } else {
        month = month - 1
      }
      day = days_in_month(year, month)
    }
  }
  {
    year,
    month,
    day,
    hour: total_seconds / 3600,
    minute: total_seconds % 3600 / 60,
    second: total_seconds % 60,
  }
}

///|
pub fn UtcDateTime::next_second(self : UtcDateTime) -> UtcDateTime {
  if self.second < 59 {
    {
      year: self.year,
      month: self.month,
      day: self.day,
      hour: self.hour,
      minute: self.minute,
      second: self.second + 1,
    }
  } else if self.minute < 59 {
    {
      year: self.year,
      month: self.month,
      day: self.day,
      hour: self.hour,
      minute: self.minute + 1,
      second: 0,
    }
  } else if self.hour < 23 {
    {
      year: self.year,
      month: self.month,
      day: self.day,
      hour: self.hour + 1,
      minute: 0,
      second: 0,
    }
  } else {
    let next_day = self.day + 1
    let limit = days_in_month(self.year, self.month)
    if next_day <= limit {
      {
        year: self.year,
        month: self.month,
        day: next_day,
        hour: 0,
        minute: 0,
        second: 0,
      }
    } else if self.month < 12 {
      {
        year: self.year,
        month: self.month + 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
      }
    } else {
      { year: self.year + 1, month: 1, day: 1, hour: 0, minute: 0, second: 0 }
    }
  }
}

///|
/// Convert a UTC civil timestamp to the astronomical Julian Day.
///
/// The result follows the standard convention where 2000-01-01 12:00:00 UTC
/// is 2451545.0. This helper uses the proleptic Gregorian calendar.
pub fn julian_day(value : UtcDateTime) -> Double {
  let month_adjust = (14 - value.month) / 12
  let adjusted_year = value.year + 4800 - month_adjust
  let adjusted_month = value.month + 12 * month_adjust - 3
  let julian_day_number = value.day +
    (153 * adjusted_month + 2) / 5 +
    365 * adjusted_year +
    adjusted_year / 4 -
    adjusted_year / 100 +
    adjusted_year / 400 -
    32045
  let fraction = (
      value.hour.to_double() * 3600.0 +
      value.minute.to_double() * 60.0 +
      value.second.to_double()
    ) /
    86400.0
  julian_day_number.to_double() - 0.5 + fraction
}

///|
/// Return the elapsed seconds from `start` to `end`.
pub fn seconds_between(start : UtcDateTime, end : UtcDateTime) -> Double {
  (julian_day(end) - julian_day(start)) * 86400.0
}
