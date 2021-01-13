class Sprite3D {
  constructor() {
    this.position = Vector3.zero();
    this.boundingvolume = AABB.empty()
    this.drawarea = Rect.empty();
    this.sourcearea = Rect.empty();
    this.image = undefined
  }
}
