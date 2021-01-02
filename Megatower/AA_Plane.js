const AA_Plane_Axis = {
  XY: 0,
  XZ: 1,
  ZY: 2
}

class AA_Plane {
  constructor(x,y,z,axis,s0,s1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.axis = axis;
    this.s0 = s0;
    this.s1 = s1;
  }

  verticies(){
    switch (this.axis) {
      case AA_Plane_Axis.XY:
        return [
          new Vector3(this.x, this.y,this.z),
          new Vector3(this.x, this.y + this.s1,this.z),
          new Vector3(this.x + this.s0, this.y + this.s1,this.z),
          new Vector3(this.x + this.s0, this.y,this.z)
        ];

      case AA_Plane_Axis.XZ:
      return [
        new Vector3(this.x, this.y,this.z),
        new Vector3(this.x, this.y ,this.z + this.s1),
        new Vector3(this.x + this.s0, this.y, this.z + this.s1),
        new Vector3(this.x + this.s0, this.y,this.z)
      ];
      case AA_Plane_Axis.ZY:
      return [
        new Vector3(this.x, this.y,this.z),
        new Vector3(this.x, this.y + this.s1 ,this.z),
        new Vector3(this.x , this.y + this.s1, this.z + this.s0),
        new Vector3(this.x, this.y,this.z + this.s0)
      ];
    }
  }

  copy(){
    return new AA_Plane(this.x, this.y, this.z, this.axis, this.s0, this.s1);
  }
  left(){
    return this.x * (this.axis != AA_Plane_Axis.ZY)
     + this.z * (this.axis == AA_Plane_Axis.ZY);
  }
  right(){
    return this.x * (this.axis != AA_Plane_Axis.ZY)
     + this.z * (this.axis == AA_Plane_Axis.ZY) + this.s0;
  }

  bottom(){
    return this.y * (this.axis != AA_Plane_Axis.XZ)
     + this.z * (this.axis == AA_Plane_Axis.XZ);
  }
  top(){
    return this.y * (this.axis != AA_Plane_Axis.XZ)
     + this.z * (this.axis == AA_Plane_Axis.XZ) + this.s1;
  }

  contains(point){
    switch (this.axis) {
      case AA_Plane_Axis.XY:
        return this.z == point.z &&
        point.x >= this.left() && point.x <= this.right() &&
        point.y >= this.bottom() && point.y <= this.top();
      case AA_Plane_Axis.XZ:
        return (this.y == point.y) &&
        point.x >= this.left() && point.x <= this.right() &&
        point.z >= this.bottom() && point.z <= this.top();
      case AA_Plane_Axis.ZY:
        return (this.x == point.x) &&
        point.z >= this.left() && point.z <= this.right() &&
        point.y >= this.bottom() && point.y <= this.top();
    }
  }

  static isOverlaps(pl0, pl1){
    if(pl0.axis != pl1.axis){
      return false;
    }
    var r = false ;
    switch (this.axis) {
      case AA_Plane_Axis.XY:
        r = pl0.z == pl1.z
        break;
      case AA_Plane_Axis.XZ:
        r = pl0.y == pl1.y
        break;
      case AA_Plane_Axis.ZY:
        r = pl0.x == pl1.x
        break;
    }
    if(!r){
      return false;
    }

    var pl0_left = pl0.left();
    var pl0_right = pl0.right();
    var pl0_bottom = pl0.bottom();
    var pl0_top = pl0.top();
    var pl1_left = pl1.left();
    var pl1_right = pl1.right();
    var pl1_bottom = pl1.bottom();
    var pl1_top = pl1.top();

    if((pl0_left >= pl1_left && pl0_left <= pl1_right &&
      pl0_bottom >= pl1_bottom && pl0_bottom <= pl1_top)){
        return true
    }

    return (pl1_left >= pl0_left && pl1_left <= pl0_right &&
      pl1_bottom >= pl0_bottom && pl1_bottom <= pl0_top)
  }


}
