class Camera {
  constructor() {
    this.focalPoint = Vector3.zero();
    this.bounds = AA_Rect.empty();

  }

  moveFocalPoint(displacement){
    this.focalPoint = Vector3.add(this.focalPoint,displacement);
    this.bounds = this.bounds.offset(displacement.toIsometric());

  }
}
