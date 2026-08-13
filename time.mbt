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
