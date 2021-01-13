class Game {
  constructor() {
    this.world = new World();
    this.pausemenu = new GameMenu();
    this.pause_not_cleared = false;
    this.controlpad = new VirtualControlPad();
    this.world.controlpad = this.controlpad;
    this.background_context = null;
    this.width = 640;
    this.height = 480;
    this.ui_context  = null;
    this.world_context = null;
    this.paused = false;

  }

  init(){

    this.world.camera.focalPoint = Vector3.zero();
    this.world.camera.bounds = new AA_Rect(-640/2, -480/2, 640, 480)
    this.world_context.imageSmoothingEnabled = false;
    this.background_context.fillStyle = "hotpink";
    this.background_context.fillRect(0,0,this.width,this.height);

    this.world.player.sprite.position = Vector3.zero();
    this.world.player.sprite.texture = new Texture("Assets/Images/colors.png")
    this.world.player.sprite.volume = new AA_Box(0,0,0,32* 3/4,48* 3/4,32 *3/4);
    this.world.player.sprite.source_area = new AA_Rect(0,0,64,80)
    this.world.player.sprite.draw_area = new AA_Rect(-32 * 3/4,-48 * 3/4,64 * 3/4,80 * 3/4);

    //add resume game  button
    this.pausemenu.button_position.push(new Vector2(32,32));
    this.pausemenu.button_area.push(new AA_Rect(32,32,64,16));
    this.pausemenu.button_text.push("Resume");
    this.pausemenu.button_on_pressed.push(() =>{
      this.paused = false;
    });

    //options button
    this.pausemenu.button_position.push(new Vector2(32,64));
    this.pausemenu.button_area.push(new AA_Rect(32,64,64,16));
    this.pausemenu.button_text.push("Options");
    this.pausemenu.button_on_pressed.push(() =>{

    });



    //add save game button
    this.pausemenu.button_position.push(new Vector2(32,96));
    this.pausemenu.button_area.push(new AA_Rect(32,96,64,16));
    this.pausemenu.button_text.push("Save");
    this.pausemenu.button_on_pressed.push(() =>{

    });



    //add quit game button
    this.pausemenu.button_position.push(new Vector2(32,128));
    this.pausemenu.button_area.push(new AA_Rect(32,128,64,16));
    this.pausemenu.button_text.push("Quit");
    this.pausemenu.button_on_pressed.push(() =>{

    });

    //add tilemap
    var tilemap = new Tilemap();
    tilemap.tile_depth = 32;
    tilemap.tile_width = 32;
    tilemap.tile_height = 32;
    tilemap.texture = new Texture("Assets/Images/colors.png")
    for(var i = 0; i < 10; i++){
      tilemap.tile_position.push([])
      tilemap.tile_box.push([])
      tilemap.tile_source_area.push([])
      tilemap.tile_draw_area.push([])
      for(var j = 0; j < 10; j++){
        var pos = Vector3.add(
          Vector3.scale(new Vector3(tilemap.tile_width,0,0),i),
          Vector3.scale(new Vector3(0,0,tilemap.tile_depth),j));
        var pos2d = pos.toIsometric();
        tilemap.tile_position[i].push(pos);
        tilemap.tile_box[i].push(new AA_Box(pos.x, pos.y,pos.z, tilemap.tile_width,tilemap.tile_height, tilemap.tile_depth));
        tilemap.tile_source_area[i].push(new AA_Rect(0,0,64,64));
        tilemap.tile_draw_area[i].push(new AA_Rect(pos2d.x-32,pos2d.y-32,64,64));
      }
    }

    this.world.tilemaps.push(tilemap);

    var tilemap2 = new Tilemap();
    tilemap2.tile_depth = 32;
    tilemap2.position = new Vector3(15*32,0,0);

    tilemap2.tile_width = 32;
    tilemap2.tile_height = 32;
    tilemap2.texture = new Texture("Assets/Images/colors.png")
    for(var i = 0; i < 10; i++){
      tilemap2.tile_position.push([])
      tilemap2.tile_box.push([])
      tilemap2.tile_source_area.push([])
      tilemap2.tile_draw_area.push([])
      for(var j = 0; j < 10; j++){
        var pos = Vector3.add(
          Vector3.scale(new Vector3(tilemap2.tile_width,0,0),i),
          Vector3.scale(new Vector3(0,0,tilemap2.tile_depth),j));
        pos = Vector3.add(pos, tilemap2.position);
        var pos2d = pos.toIsometric();
        tilemap2.tile_position[i].push(pos);
        tilemap2.tile_box[i].push(new AA_Box(pos.x, pos.y,pos.z, tilemap.tile_width,tilemap.tile_height, tilemap.tile_depth));
        tilemap2.tile_source_area[i].push(new AA_Rect(0,0,64,64));
        tilemap2.tile_draw_area[i].push(new AA_Rect(pos2d.x-32,pos2d.y-32,64,64));
      }
    }
    this.world.tilemaps.push(tilemap2);
    this.world.player.moveBy(new Vector3(0,100,0))

  }


  update(elapsed){
    if(this.controlpad.button_START.isPressed){
      this.paused =!this.paused;
    }
    if(!this.paused){
      this.world.update(elapsed);
    }else {
      if(this.controlpad.down.isPressed){
        this.pausemenu.nextFocus();
      }
      if(this.controlpad.up.isPressed){
        this.pausemenu.prevFocus();
      }
      if(this.controlpad.button_A.isPressed){
        this.pausemenu.activateFocused();

      }
    }

    this.controlpad.postUpdate();
  }

  draw(elapsed){
    if(!this.paused){
      this.world_context.setTransform(
        1,0,
        0,1,
        -this.world.camera.bounds.x, - this.world.camera.bounds.y);

      this.world_context.clearRect(this.world.camera.bounds.x,this.world.camera.bounds.y,this.width, this.height)
      this.world.draw(elapsed, this.world_context);
      if(this.pause_not_cleared ){
        this.ui_context.clearRect(0,0,this.width, this.height)
        this.pause_not_cleared = !this.pause_not_cleared;
      }
    }

    if(this.paused){
      this.pause_not_cleared = true;
      this.ui_context.clearRect(0,0,this.width, this.height)
      this.pausemenu.draw(elapsed, this.ui_context);
    }


  }
}
