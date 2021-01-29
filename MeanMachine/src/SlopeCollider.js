const SlopeColliderType = {
    SLOPE_010_110: 0,
    SLOPE_110_111: 1,
    SLOPE_111_011: 2,
    SLOPE_011_010: 3,
}

class SlopeCollider{
    constructor(position, size, type,
        canCollideLeftFace = true, canCollideRightFace = true, 
        canCollideBottomFace = true, canCollideSlopeFace = true,
        canCollideBackFace = true){
        this.position = position;
        this.size = size;
        this.type = type;
        this.canCollideLeftFace = canCollideLeftFace;
        this.canCollideRightFace = canCollideRightFace;
        this.canCollideBottomFace = canCollideBottomFace;
        this.canCollideSlopeFace = canCollideSlopeFace;
        this.canCollideBackFace = canCollideBackFace;
    }

    getBoundingBox(){
        var halfsize = Vector3.scale(this.size, 0.5);
        return new AxisAlignedBox(Vector3.add(this.position, halfsize),halfsize);
    }

    center(){
        var hs = Vector3.scale(this.size, 0.5);
        return Vector3.add(this.position, hs);
    }
    getPlane(){
        var center =  this.center();
        switch(this.type){
            case SlopeColliderType.SLOPE_010_110:
                return new Plane(center.copy(),Vector3.cross(new Vector3(0, this.size.y, -this.size.z ), new Vector3(-1,0,0)).normalize());
            case SlopeColliderType.SLOPE_110_111:
                return new Plane(center.copy(),Vector3.cross(new Vector3(0,0,1), new Vector3(-this.size.x,-this.size.y,0)).normalize());
            case SlopeColliderType.SLOPE_111_011:
                return new Plane(center.copy(),Vector3.cross(new Vector3(-1,0,0), new Vector3(0, -this.size.y, -this.size.z)).normalize());
            case SlopeColliderType.SLOPE_011_010:
                return new Plane(center.copy(),Vector3.cross(new Vector3(0,0,-1), new Vector3(this.size.x, -this.size.y, 0)).normalize());

        }
    }

    leftFaceAsPlane(){
        switch(this.type){
            case SlopeColliderType.SLOPE_010_110:
            case SlopeColliderType.SLOPE_111_011:
                var hs = new Vector3(0, this.size.y * 0.5, this.size.z * 0.5);
                var p = Vector3.add(this.position, hs);
                return new RectPlane(p, hs);
            case SlopeColliderType.SLOPE_110_111:
            case SlopeColliderType.SLOPE_011_010:
                var hs = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0);
                var p = Vector3.add(this.position, hs);
                return new RectPlane(p, hs);

        }
    }

    rightFaceAsPlane(){
        switch(this.type){
            case SlopeColliderType.SLOPE_010_110:
            case SlopeColliderType.SLOPE_111_011:
                var hs = new Vector3(0, this.size.y * 0.5, this.size.z * 0.5);
                var p = Vector3.add(this.position, hs);
                p.x += this.size.x;
                return new RectPlane(p, hs);
            case SlopeColliderType.SLOPE_110_111:
            case SlopeColliderType.SLOPE_011_010:
                var hs = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0);
                var p = Vector3.add(this.position, hs);
                p.z += this.size.z;
                return new RectPlane(p, hs);
        }
    }

    bottomFaceAsPlane(){
        switch(this.type){
            case SlopeColliderType.SLOPE_010_110:
            case SlopeColliderType.SLOPE_110_111:
            case SlopeColliderType.SLOPE_111_011:
            case SlopeColliderType.SLOPE_011_010:
                var hs = new Vector3(this.size.x * 0.5, 0, this.size.z * 0.5);
                var p = Vector3.add(this.position, hs);
                return new RectPlane(p, hs)

        }
    }

    backFaceAsPlane(){
        switch(this.type){
            case SlopeColliderType.SLOPE_010_110:
                var hs = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0);
                var p = Vector3.add(this.position, hs);
                return new RectPlane(p, hs)
            case SlopeColliderType.SLOPE_110_111:
                var hs = new Vector3(0, this.size.y * 0.5, this.size.z * 0.5);
                var p = Vector3.add(this.position, hs);
                p.x += this.size.x;
                return new RectPlane(p, hs)
            case SlopeColliderType.SLOPE_111_011:
                var hs = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0);
                var p = Vector3.add(this.position, hs);
                p.z += this.size.z;
                return new RectPlane(p, hs)
            case SlopeColliderType.SLOPE_011_010:
                var hs = new Vector3(0, this.size.y * 0.5, this.size.z * 0.5);
                var p = Vector3.add(this.position, hs);
                return new RectPlane(p, hs)

        }
    }

    minX(){
        return this.position.x;
    }

    maxX(){
        return this.position.x + this.size.x;
    }

    minY(){
        return this.position.y;
    }

    maxY(){
        return this.position.y + this.size.y;
    }


    minZ(){
        return this.position.z;
    }

    maxZ(){
        return this.position.z + this.size.z;
    }

}