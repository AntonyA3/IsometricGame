class Sphere {
  constructor(position, radius) {
    this.position = position || Vector3.zero();
    this.radius = radius || 0;
  }

  copy(){
    return new Sphere(this.position, this.radius);
  }

  asAABB(){
    return new AABB(this.position, new Vector3(this.radius, this.radius, this.radius));
  }
}
