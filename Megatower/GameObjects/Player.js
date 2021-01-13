class Player {
  constructor() {
    this.position = Vector3.zero();
    this.velocity = Vector3.zero();
    this.sphere = new Sphere(new Vector3(16,16,16),16);
    this.sprite = new Sprite3D();

  }

  moveBy(offset){
    this.sphere = this.sphere.offset(offset);
    this.position = Vector3.add(this.position,offset);
    this.sprite.moveBy(offset);
  }
}
