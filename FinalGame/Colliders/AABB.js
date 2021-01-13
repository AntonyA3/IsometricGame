class AABB {
  constructor(position, halfsize) {
    this.position = position || Vector3.zero();
    this.halfsize = halfsize || Vector3.zero();
  }
  left(){
    return this.position.x - this.halfsize.x;
  }
  right(){
    return this.position.x + this.halfsize.x;
  }
  bottom(){
    return this.position.y - this.halfsize.y;
  }
  top(){
    return this.position.y + this.halfsize.y;
  }
  front(){
      return this.position.z - this.halfsize.z;
  }
  back(){
    return this.position.z + this.halfsize.z;
  }
  copy(){
    return new AABB(this.position, this.halfsize);
  }

  expand(v){
    this.position.x = this.position.x - v.x;
    this.position.y = this.position.y - v.y;
    this.position.z = this.position.z - v.z;
    this.halfsize += 2 * v.x;
    this.halfsize += 2 * v.y;
    this.halfsize += 2 * v.z;
  }

  verticies(){
    var left = this.left();
    var right = this.right();
    var bottom = this.bottom();
    var top = this.top();
    var front = this.front();
    var back = this.back();
    return[
      new Vector3(left, bottom, front),
      new Vector3(left, top, front),
      new Vector3(right, top, front),
      new Vector3(right, bottom, front),
      new Vector3(left, bottom, back),
      new Vector3(left, top, back),
      new Vector3(right, top, back),
      new Vector3(right, bottom, back)
    ];
  }

  static empty(){
    return new AABB(new Vector3(0,0,0), new Vector3(0,0,0))
  }
}