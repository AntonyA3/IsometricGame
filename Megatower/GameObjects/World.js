class World {
  constructor() {
    this.player = new Player();
    this.controlpad = null;
    this.camera = new Camera();
    this.tilemaps = [];
    this.gravity = new Vector3(0, -1000, 0)
  }

  update(elapsed){

    {
      this.player.velocity.x = this.controlpad.right.isDown*300 - this.controlpad.left.isDown*300 * (!this.controlpad.right.isDown),
      this.player.velocity.y -=20 ;
      this.player.velocity.z = this.controlpad.down.isDown*300 - this.controlpad.up.isDown *300 * (!this.controlpad.down.isDown)
      this.player.velocity.y += this.controlpad.button_A.isPressed * 600

      var deltaposition = Vector3.scale(this.player.velocity, elapsed);
      this.player.moveBy(deltaposition);

    }


    var boxes = [];
    for(var i = 0; i < this.tilemaps.length; i++){
      for (var j = 0; j < this.tilemaps[i].tile_position.length; j++){
        for (var k= 0; k < this.tilemaps[i].tile_position[j].length; k++){

          boxes.push(this.tilemaps[i].tile_box[j][k]);
        }
      }
    }

    var phResult = Collision.AABBvsSphere(boxes[0], this.player.sphere);
    if(phResult.length != 0){
      if(phResult[1].length > 0){
        this.player.moveBy(Vector3.scale(phResult[1][1].normal, phResult[1][1].depth))
        if(phResult[1][1].normal.y != 0){
          this.player.velocity.y = 0
        }
      }
      if(phResult[1].normal != undefined){
        this.player.moveBy(Vector3.scale(phResult[1].normal, phResult[1].depth))
        if(phResult[1].normal.y != 0){
          this.player.velocity.y = 0
        }
      }
    }

    this.camera.moveFocalPoint(Vector3.subtract(this.player.position, this.camera.focalPoint));





  }

  draw(elapsed,ctx){
    for(var i = 0; i < this.tilemaps.length; i++){
      this.tilemaps[i].draw(ctx);
    }

    this.player.sprite.draw(ctx);
    ShapeDebug.debug_AA_Box(this.tilemaps[0].tile_box[0][0],ctx, "green")
    
  }
}
