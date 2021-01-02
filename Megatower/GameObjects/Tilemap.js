class Tilemap {
  constructor() {
    this.position = Vector3.zero();
    this.tile_position = [];
    this.tile_box = [];
    this.tile_source_area = [];
    this.tile_draw_area = [];

    this.tile_width = 32;
    this.tile_depth = 32;
    this.tile_height = 32;
    this.texture = null;
  }

  draw(ctx){
    for(var i = 0; i < this.tile_position.length; i++){
      for(var j = 0; j < this.tile_position.length; j++){
        ctx.drawImage(this.texture.image, this.tile_source_area[i][j].x, this.tile_source_area[i][j].y,
        this.tile_source_area[i][j].sx, this.tile_source_area[i][j].sy, this.tile_draw_area[i][j].x,
        this.tile_draw_area[i][j].y, this.tile_draw_area[i][j].sx, this.tile_draw_area[i][j].sy)
      }
    }
  }

}
