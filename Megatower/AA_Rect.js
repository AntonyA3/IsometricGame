class AA_Rect
 {
  constructor(x,y,sx,sy) {
    this.x = x || 0;
    this.y = y || 0;
    this.sx = sx || 0;
    this.sy = sy || 0;
  }

  offset(offset){
    return new AA_Rect(this.x + offset.x, this.y + offset.y, this.sx, this.sy);
  }

  verticies(){
    return [
      new Vector2(this.x, this.y),
      new Vector2(this.x, this.y + this.sy),
      new Vector2(this.x + this.sx, this.y + this.sy),
      new Vector2(this.x + this.sx, this.y)
    ];
  }
  copy(){
    return new AA_Rect(this.x, this.y, this.sx, this.sy)
  }

  static empty(){
    return new AA_Rect(0,0,0,0);
  }
  static isIntersecting(rect0, rect1){
    return (rect0.x >= rect1.x && rect0.x <= (rect1.x + rect1.sx) &&
      rect0.y >= rect1.y && rect0.y <= (rect1.y + rect1.sy)) ||
      (rect1.x >= rect0.x && rect1.x <= (rect0.x + rect0.sx) &&
        rect1.y >= rect0.y && rect1.y <= (rect0.y + rect0.sy));

  }

  static intersection(rect0, rect1){
    var maxLeft = Math.max(rect0.x, rect1.x);
    var maxTop = Math.max(rect0.y, rect1.y);
    var maxFront = Math.max(rect0.z, rect1.z);
    var sx = Math.min(rect0.x + rect0.sx, rect1.x + rect1.sx) - maxLeft;
    var sy = Math.min(rect0.y + rect0.sy, rect1.y + rect1.sy) - maxTop;
    var sz = Math.min(rect0.z + rect0.sz, rect1.z + rect1.sz) - maxFront;


    if(sx <= 0 || sy <= 0){
      return AA_Rect.empty();
    }
    return new AA_Rect(maxLeft,maxTop, sx, sy)

  }

  static union(rect0, rect1){
    var minX = Math.min(rect0.x, rect1.x);
    var minY = Math.min(rect0.y, rect1.y);
    return new AA_Rect(
      minX, minY,
      Math.max(box0.x + box0.sx, box1.x + box1.sx) - minX,
      Math.max(box0.y + box0.sy, box1.y + box1.sy) - minY,
    );
  }

  static contains(rect, point){
    return point.x >= rect.x && point.x <= (rect.x + rect.sx) &&
      point.y >= rect.y && point.y <= (rect.y + rect.sy)
  }
}
