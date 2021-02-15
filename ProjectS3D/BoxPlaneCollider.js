class BoxPlaneCollider{
    constructor(boxPlane){
        this.boxPlane = boxPlane;
        this.canCollideLeft = false;
        this.canCollideRight = false;
        this.canCollideBottom = false;
        this.canCollideTop = true;
        this.canCollideFront = false;
        this.canCollideBack = false;
        this.canCollidePlane = true;
    }
}