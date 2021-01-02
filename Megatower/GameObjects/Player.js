class Player {
  constructor() {
    this.position = Vector3.zero();
    this.velocity = Vector3.zero();
    this.box = new AA_Box(0,0,0,32,64,32);
    this.sprite = new Sprite3D();

  }

  moveBy(offset){
    this.box = this.box.offset(offset);
    this.position = Vector3.add(this.position,offset);
    this.sprite.moveBy(offset);
  }
}
