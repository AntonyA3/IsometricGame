const AA_Box_Side= {
  Left: 0,
  Right: 1,
  Bottom: 2,
  Top: 3,
  Front: 4,
  Back: 5
}

class AA_Box {
  constructor(x,y,z,sx,sy,sz) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.sx = sx || 0;
    this.sy = sy || 0;
    this.sz = sz || 0;
  }
  setPosition(position){
    return new AA_Box(position.x, position.y, position.z, this.sx, this.sy, this.sz);
  }

  center(){
    return new Vector3(this.x + 0.5 * this.sx, this.y + 0.5 * this.sy, this.z + 0.5 * this.sz)
  }

  offset(offset){
    return new AA_Box(this.x + offset.x, this.y + offset.y, this.z + offset.z, this.sx, this.sy, this.sz);

  }

  expand(expand){
    return new AA_Box(this.x - expand.x,this.y - expand.y, this.z - expand.z,
      this.sx + 2*expand.x,this.sy + 2*expand.y,this.sz + 2*expand.z)
  }
  setSize(size){
    return new AA_Box(this.x, this.y, this.z, this.size.x, this.size.y, this.size.z);

  }
  getPlane(side){
    switch (side) {
      case AA_Box_Side.Left:
        return new AA_Plane(this.x, this.y, this.z, AA_Plane_Axis.ZY, this.sz, this.sy);
      case AA_Box_Side.Right:
        return new AA_Plane(this.x + this.sx, this.y, this.z, AA_Plane_Axis.ZY, this.sz, this.sy);
      case AA_Box_Side.Bottom:
        return new AA_Plane(this.x, this.y, this.z, AA_Plane_Axis.XZ, this.sx, this.sz);
      case AA_Box_Side.Top:
        return new AA_Plane(this.x, this.y + this.sy, this.z, AA_Plane_Axis.XZ, this.sx, this.sz);
      case AA_Box_Side.Front:
        return new AA_Plane(this.x, this.y, this.z, AA_Plane_Axis.XY, this.sx, this.sy);
      case AA_Box_Side.Back:
        return new AA_Plane(this.x, this.y, this.z + this.sz, AA_Plane_Axis.XY, this.sx, this.sy);
    }
  }

  verticies(){
    return [
      new Vector3(this.x, this.y, this.z),
      new Vector3(this.x, this.y + this.sy, this.z),
      new Vector3(this.x + this.sx, this.y + this.sy, this.z),
      new Vector3(this.x + this.sx, this.y, this.z),
      new Vector3(this.x, this.y, this.z + this.sz),
      new Vector3(this.x, this.y + this.sy, this.z  + this.sz),
      new Vector3(this.x + this.sx, this.y + this.sy, this.z  + this.sz),
      new Vector3(this.x + this.sx, this.y, this.z  + this.sz)
    ]
  }
  copy(){
    return new Box(this.x, this.y,this.z, this.sx,this.sy,this.sz);
  }

  static empty(){
    return new AA_Box(0,0,0,0,0,0);
  }
  static isIntersecting(box0, box1){
    return (box0.x >= box1.x && box0.x <= (box1.x + box1.sx) &&
      box0.y >= box1.y && box0.y <= (box1.y + box1.sy) &&
      box0.z >= box1.z && box0.z <= (box1.z + box1.sz)) ||
      (box1.x >= box0.x && box1.x <= (box0.x + box0.sx) &&
        box1.y >= box0.y && box1.y <= (box0.y + box0.sy) &&
        box1.z >= box0.z && box1.z <= (box0.z + box0.sz));
  }

  static intersection(box0, box1){
    var maxLeft = Math.max(box0.x, box1.x);
    var maxBottom = Math.max(box0.y, box1.y);
    var maxFront = Math.max(box0.z, box1.z);
    var sx = Math.min(box0.x + box0.sx, box1.x + box1.sx) - maxLeft;
    var sy = Math.min(box0.y + box0.sy, box1.y + box1.sy) - maxBottom;
    var sz = Math.min(box0.z + box0.sz, box1.z + box1.sz) - maxFront;

    if(sx <= 0 || sy <= 0 || sz <=0){
      return AA_Box.empty();
    }
    return new AA_Box(maxLeft,maxBottom,maxFront, sx, sy, sz)
  }
  static empty(){
    return new AA_Box(0,0,0,0,0,0)
  }
  static union(box0, box1){
    var minX = Math.min(box0.x, box1.x);
    var minY = Math.min(box0.y, box1.y);
    var minZ = Math.min(box0.z, box1.z);
    return new AA_Box(
      minX, minY, minZ,
      Math.max(box0.x + box0.sx, box1.x + box1.sx) - minX,
      Math.max(box0.y + box0.sy, box1.y + box1.sy) - minY,
      Math.max(box0.z + box0.sz, box1.z + box1.sz) - minZ
    );

  }

}
