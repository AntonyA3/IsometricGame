class World {
  constructor() {
    this.player = new Player();
    this.camera = new Camera();
    this.floor = new AABB(new Vector3(0,-60,0), new Vector3(128,280,128));
    this.floor2 = new OBB(
      new Vector3(0,-60,0),
      new Vector3(128,0,0),
      new Vector3(0,280,0),
      new Vector3(0,0,128),


    )
    this.controlpad = undefined;

  }


  update(elapsed){
    this.player.velocity.x = this.controlpad.right.isDown *
      300 - this.controlpad.left.isDown*
      300 * (!this.controlpad.right.isDown);

    this.player.velocity.y -= 20;

    this.player.velocity.z = this.controlpad.down.isDown * 300
    - this.controlpad.up.isDown *300
    * (!this.controlpad.down.isDown);

    if(this.player.airtime > 0.01 && this.player.jumpcount == 1  && this.controlpad.button_A.isPressed){
      this.player.velocity.y = 500;
      this.player.jumpcount += 1;

    }
    if(this.player.onFloor && this.controlpad.button_A.isPressed){
      this.player.velocity.y = 500;
      this.player.jumpcount += 1;

    }

    if(!this.player.onFloor){
      this.player.airtime += elapsed;

    }



    var playerStartPosition = this.player.position;

    var playerMovement = Vector3.scale(this.player.velocity, elapsed);
    this.player.move_by_position(playerMovement);
    console.log(Collision.AABBintersectsOBB(this.player.floorBoxCollider, this.floor2))
    if(Collision.AABBintersectsOBB(this.player.floorBoxCollider, this.floor2)){
      var manifold = Collision.AABBDynamicvsOBB(this.player.floorBoxCollider, this.player.velocity, this.floor2);
      var normal = manifold.normal;
      var depth = manifold.depth;

      this.player.move_to_position(
        new Vector3(this.player.position.x + (manifold.normal.x * manifold.depth),
       this.player.position.y + (manifold.normal.y * manifold.depth) ,
       this.player.position.z + (manifold.normal.z * manifold.depth)
     ));

      this.player.onFloor = true;
      if(normal.x != 0){
        this.player.velocity.x = 0;
      }
      if(normal.y != 0){
        this.player.velocity.y = 0;
      }

      if(normal.z != 0){
        this.player.velocity.z = 0;
      }
      this.player.airtime = 0;
      this.player.jumpcount=0;
    }else {
      this.player.onFloor = false;
    }
    var playerEndPosition = this.player.position;
    var playerDeltaPosition = Vector3.subtract(playerEndPosition, playerStartPosition)

    var cameraStartPosition = this.camera.focalpoint;
    this.camera.move_by_position(playerDeltaPosition);
    var cameraEndPosition = this.camera.focalpoint;
    this.camera.displacement = Vector3.subtract(cameraEndPosition, cameraStartPosition);

  }

  draw(elapsed, ctx){
    ctx.setTransform(
      1,0,
      0,1,
      -this.camera.bounds.x, -this.camera.bounds.y
    );

    ctx.clearRect(
      this.camera.bounds.x,
      this.camera.bounds.y,
      this.camera.bounds.sx,
      this.camera.bounds.sy
    );
    ctx.fillStyle = "gray";
    ctx.fillRect(
      this.camera.bounds.x,
      this.camera.bounds.y,
      this.camera.bounds.sx,
      this.camera.bounds.sy,
    )

    this.player.draw(ctx);
    //ShapeDebug.drawAABB(this.floor, ctx, "pink")
    ShapeDebug.drawOBB(this.floor2, ctx, "purple")

  }
}
