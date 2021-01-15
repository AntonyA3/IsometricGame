class Sprite3D {
  constructor() {
    this.position = Vector3.zero();
    this.boundingvolume = AABB.empty()
    this.drawarea = Rect.empty();
    this.sourcearea = Rect.empty();
    this.image = undefined
  }

  move_by_position(movement){
    this.position = Vector3.add(this.position, movement);
    this.boundingvolume.position = Vector3.add(this.boundingvolume.position, movement);

    var movement_2d = movement.toIsometric();
    this.drawarea.position = Vector3.add(this.boundingvolume.position, movement_2d);
  }


}
