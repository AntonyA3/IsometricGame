class BoxCollider{
    constructor(position, size, 
        canCollideLeft = true, canCollideRight = true, 
        canCollideBottom = true, canCollideTop = true, 
        canCollideFront = true, canCollideBack = true){

        this.position = position;
        this.size = size;
        this.canCollideLeft = canCollideLeft;
        this.canCollideRight = canCollideRight;
        this.canCollideBottom = canCollideBottom;
        this.canCollideTop = canCollideTop;
        this.canCollideFront = canCollideFront;
        this.canCollideBack = canCollideBack;

    }  

    leftPlane(){
        var p = this.position.copy();
        p.x -=  this.halfsize.x;
        return new Plane(p, new Vector3(0, this.halfsize.y, this.halfsize.z));
    }

    rightPlane(){
        var p = this.position.copy();
        p.x +=  this.halfsize.x;
        return new Plane(p, new Vector3(0, this.halfsize.y, this.halfsize.z));
    }

    getBoundingBox(){
        var halfsize = Vector3.scale(this.size, 0.5);
        return new AxisAlignedBox(Vector3.add(this.position, halfsize),halfsize)
    }

        
}