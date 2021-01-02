class AA_Slope {
  constructor(x,y,z,sx,sy,sz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
    this.orientation = 0;

  }

  verticies(){
    return [
      new Vector3(this.x, this.y, this.z),
      new Vector3(this.x, this.y + this.sy, this.z),
      new Vector3(this.x + this.sx, this.y, this.z),
      new Vector3(this.x, this.y, this.z + this.sz),
      new Vector3(this.x, this.y + this.sy, this.z  + this.sz),
      new Vector3(this.x + this.sx, this.y, this.z  + this.sz)
    ]
  }

  static isIntersecting(box, slope){

    var c0y = slope.y;
    c0y += slope.sy * (box.x - slope.x - slope.sx) /(slope.x - slope.x - slope.sx)

    return box.y >= slope.y && box.y <= c0y &&(

    (box.x >= slope.x && box.x <= (slope.x + slope.sx) &&
      box.z >= slope.z && box.z <= (slope.z + slope.sz)) ||

      (slope.x >= box.x && slope.x <= (box.x + box.sx) &&
        slope.z >= box.z && slope.z <= (box.z + box.sz)));

  }

  static intersection(box, slope){

  }
}
console.log(AA_Slope.isIntersecting(
  new AA_Box(0,0,0,10,10,10),
  new AA_Slope(0,-9,0,10,10,10)
));
