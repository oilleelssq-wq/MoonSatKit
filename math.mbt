///|
pub fn Vector3::zero() -> Vector3 {
  { x: 0.0, y: 0.0, z: 0.0 }
}

///|
pub fn Vector3::add(self : Vector3, other : Vector3) -> Vector3 {
  { x: self.x + other.x, y: self.y + other.y, z: self.z + other.z }
}

///|
pub fn Vector3::sub(self : Vector3, other : Vector3) -> Vector3 {
  { x: self.x - other.x, y: self.y - other.y, z: self.z - other.z }
}

///|
pub fn Vector3::scale(self : Vector3, factor : Double) -> Vector3 {
  { x: self.x * factor, y: self.y * factor, z: self.z * factor }
}

///|
pub fn Vector3::dot(self : Vector3, other : Vector3) -> Double {
  self.x * other.x + self.y * other.y + self.z * other.z
}

///|
pub fn Vector3::to_string(self : Vector3) -> String {
  "(\{self.x}, \{self.y}, \{self.z})"
}
