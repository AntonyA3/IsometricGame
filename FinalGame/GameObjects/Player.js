class Player {
  static startPosition = new Vector3(64,0,0);
  static startPlayerCapsule = new Capsule(new Vector3(64,-32 ,0), new Vector3(64,32,0), new Vector3(16,0,0));

  constructor() {
    this.position = Player.startPosition;
    this.capsuleCollider = Player.startPlayerCapsule;

    this.sprite = undefined;

  }
  draw(ctx){
    ShapeDebug.drawCapsule(this.capsuleCollider, ctx, "orange");
  }


}
