class Capsule {
  constructor(min, max, radiusVector) {
    this.min = min || Vector3.zero();
    this.max = max || Vector3.zero();
    this.radiusVector = radiusVector || Vector3.zero();

  }
  position(){
    return Vector3.add(this.min,Vector3.scale(Vector3.subtract(this.max, this.min), 0.5))
  }
}
