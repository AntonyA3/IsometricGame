class Vector3 {
  constructor(x,y,z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  copy(){
    return new Vector3(this.x, this.y, this.z);
  }
  length(){
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }
  lengthSquared(){
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
  toIsometric(){
    return new Vector2(this.x - this.z,0.5 * (this.x + this.z) - this.y)
  }
  normalize(){
    return Vector3.scale(this,1/this.length())
  }
  static zero(){
    return new Vector3(0,0,0);
  }
  static add(v0, v1){
    return new Vector3(v0.x + v1.x, v0.y + v1.y, v0.z + v1.z);
  }
  static subtract(v0, v1){
    return new Vector3(v0.x - v1.x, v0.y - v1.y, v0.z - v1.z)
  }

  static multiple(v0, v1){
    return new Vector3(v0.x * v1.x, v0.y * v1.y, v0.z * v1.z)
  }

  static divide(v0, v1){
    return new Vector3(v0.x / v1.x, v0.y / v1.y, v0.z / v1.z);
  }

  static negate(v){
    return new Vector3(-v.x, -v.y, -v.z);
  }
  static scale(v, s){
    return new Vector3(v.x * s, v.y * s, v.z * s)
  }

  static dot(v0, v1){
    return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z
  }

  static equals(v0, v1){
    return v0.x == v1.x && v0.y == v1.y && v0.z == v1.z;
  }
}
