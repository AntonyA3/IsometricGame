class Camera {
    constructor() {
      this.focalpoint = new Vector3(64,16-16,0)
      this.bounds = new Rect(0,0,640,480);
      this.initialize_focal_point(this.focalpoint);
      this.displacement = Vector3.zero();
    }
  
    initialize_focal_point(focalpoint){
      this.focalpoint = focalpoint;
      var c = this.focalpoint.toIsometric();
  
      this.bounds = new Rect(
        c.x - this.bounds.sx * 0.5,
        c.y - this.bounds.sy * 0.5,
        this.bounds.sx,
        this.bounds.sy)
    }
  
    move_by_position(position){
      this.focalpoint = Vector3.add(this.focalpoint, position);
      var d2d = position.toIsometric();
      this.bounds.x += d2d.x;
      this.bounds.y += d2d.y;
  
    }
  }
  