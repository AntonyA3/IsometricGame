class Sprite3D {
  constructor() {
    this.position = Vector3.zero();
    this.volume = AA_Box.empty();
    this.source_area = AA_Rect.empty();
    this.draw_area = AA_Rect.empty();
    this.texture = null;
  }

  moveBy(displacement){
    var twoD = displacement.toIsometric();
    this.position = Vector3.add(this.position, displacement);
    this.volume = this.volume.offset(displacement);
    this.draw_area = this.draw_area.offset(twoD);
  }
  draw(ctx){

    ctx.drawImage(this.texture.image, this.source_area.x, this.source_area.y,
    this.source_area.sx, this.source_area.sy,
    this.draw_area.x, this.draw_area.y, this.draw_area.sx, this.draw_area.sy);

    ShapeDebug.debug_AA_Box(this.volume,ctx, "green")
  }
}
