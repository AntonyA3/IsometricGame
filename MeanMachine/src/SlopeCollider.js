const SlopeColliderType = {
    DXDY: 0,
    NDXDY: 1,
    DZDY: 2,
    NDZDY: 3



}

class SlopeCollider{
    constructor(position, size,
        canCollideLeftFace = true, canCollideRightFace = true, 
        canCollideBottomFace = true, canCollideSlopeFace = true,
        canCollideBackFace = true, type){
        this.position = position;
        this.halfsize = halfsize;


    }

    point_inside(){

    }
}