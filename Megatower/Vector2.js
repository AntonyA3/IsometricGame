class Vector2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  copy(){
    return new Vector2(this.x, this.y);
  }
  length(){
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  lengthSquared(){
    return this.x * this.x + this.y * this.y
  }
  static zero(){
    return new Vector2(0,0);
  }
  static add(v0, v1){
    return new Vector2(v0.x + v1.x, v0.y + v1.y);
  }
  static subtract(v0, v1){
    return new Vector2(v0.x - v1.x, v0.y - v1.y )
  }

  static multiple(v0, v1){
    return new Vector2(v0.x * v1.x, v0.y * v1.y)
  }

  static divide(v0, v1){
    return new Vector2(v0.x / v1.x, v0.y / v1.y);
  }

  static scale(v, s){
    return new Vector2(v.x * s, v.y * s)
  }

  static dot(v0, v1){
    return v0.x * v1.x + v0.y * v1.y
  }

}
