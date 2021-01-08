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

    var phResult = PH_Solver.AABBvsManyAABB(this.player.box, this.player.velocity, boxes);
    this.player.moveBy(Vector3.scale(phResult.normal,phResult.depth));
    if(phResult.normal.y != 0 && phResult.depth != 0){
      this.player.velocity.y = 0;
    }
    if(phResult.normal.x != 0 && phResult.depth != 0){
      this.player.velocity.x = 0;
    }
    if(phResult.normal.z != 0 && phResult.depth != 0){
      this.player.velocity.z = 0;
    }

    this.camera.moveFocalPoint(Vector3.subtract(this.player.position, this.camera.focalPoint));





  }

  draw(elapsed,ctx){
    for(var i = 0; i < this.tilemaps.length; i++){
      this.tilemaps[i].draw(ctx);
    }

    this.player.sprite.draw(ctx);

  }
}
