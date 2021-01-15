class Player {
  static startPosition = new Vector3(64,0,0);
  static startPlayerCapsule = new Capsule(new Vector3(64,-32 ,0), new Vector3(64,32,0), new Vector3(16,0,0));
  static startPlayerFloorCollider = new AABB(new Vector3(64,-16-8,0), new Vector3(16,8,16));
  static startPlayerCeilingCollider = new AABB(new Vector3(64,16+8,0), new Vector3(16,8,16));
  static startPlayerMidCollider = new AABB(new Vector3(64,16-16,0), new Vector3(16,16,16));
  static startPlayerBallCollider = new Sphere(new Vector3(64,16-16,0), 32);

  constructor() {
    this.position = Player.startPosition;
    this.velocity = Vector3.zero();
    this.capsuleCollider = Player.startPlayerCapsule;
    this.floorBoxCollider = Player.startPlayerFloorCollider;
    this.ceilBoxCollider = Player.startPlayerCeilingCollider;
    this.midBoxCollider = Player.startPlayerMidCollider;
    this.sprite = undefined;
    this.onFloor = false;

  }

  move_by_position(movement){
    this.position = Vector3.add(this.position, movement)
    this.capsuleCollider.min = Vector3.add(this.capsuleCollider.min , movement)
    this.capsuleCollider.max = Vector3.add(this.capsuleCollider.max , movement)
    this.floorBoxCollider.position =  Vector3.add(this.floorBoxCollider.position, movement)
    this.ceilBoxCollider.position = Vector3.add(this.ceilBoxCollider.position, movement)
    this.midBoxCollider.position = Vector3.add(this.midBoxCollider.position, movement)
    //this.sprite.move_by_position(movement);
  }

  move_to_position(position){
    var dp = Vector3.subtract(position, this.position);
    this.position = Vector3.add(this.position, dp)
    this.capsuleCollider.min = Vector3.add(this.capsuleCollider.min,dp)
    this.capsuleCollider.max = Vector3.add(this.capsuleCollider.max,dp)
    this.floorBoxCollider.position =  Vector3.add(this.floorBoxCollider.position, dp);
    this.ceilBoxCollider.position = Vector3.add(this.ceilBoxCollider.position, dp);
    this.midBoxCollider.position = Vector3.add(this.midBoxCollider.position, dp);
    //this.sprite.move_by_position(dp);
  }
  draw(ctx){
    ShapeDebug.drawCapsule(this.capsuleCollider, ctx, "orange");
    ShapeDebug.drawAABB(this.floorBoxCollider, ctx, "blue");
    ShapeDebug.drawAABB(this.ceilBoxCollider, ctx, "blue");
    ShapeDebug.drawAABB(this.midBoxCollider, ctx, "pink");

  }


}
