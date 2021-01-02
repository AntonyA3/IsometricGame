class Ray {
  constructor(x,y,z,dx,dy,dz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
  }

  direction(){
    return new Vector3(this.dx, this.dy, this.dz)

  }
  normalizedDirection(){
    return new Vector3(this.dx, this.dy, this.dz).normalize();
  }
}
