const PLAYER_MOVE_STATE = {
    WALKING: 0,
    RUNNING: 1,
    JUMPING: 2,
    SWIMMING: 3,
    FALLING: 4
}

const PLAYER_CONTROLLER_METHOD = {
    HUMAN: 0,
    COMPUTER: 1
}
class Player{
    constructor(){
        this.sprite = new Sprite3D();
        this.position = Vector3.zero();
        this.velocity = Vector3.zero();
        this.xSpeed = 0;
        this.xTargetSpeed = 0;
        this.xDirection = new Vector3(1,0,0);

        this.ySpeed = 0;
        this.yDirection = new Vector3(0,1,0);

        this.zSpeed = 0;
        this.zTargetSPeed = 0;
        this.zDirection = new Vector3(0,0,1);
        this.moveState = PLAYER_MOVE_STATE.WALKING;
        this.boxCollider = AABB.fromStartAndSize(Vector3.zero(), new Vector3(32,64,32))
    }

    moveBy(v){
        this.position = Vector3.add(this.position, v);
        this.boxCollider.position = Vector3.add(this.boxCollider.position, v)
        this.sprite.moveBy(v)

    }


}