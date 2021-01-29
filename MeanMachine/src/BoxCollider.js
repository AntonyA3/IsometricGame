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
        var direction = new Vector3(0,this.size.y * 0.5, this.size.z * 0.5)
        var p = new Vector3(this.position.x, 
            this.position.y + direction.y, 
            this.position.z + direction.z);
        
        return new RectPlane(p, direction);
    }

    rightPlane(){
        var direction = new Vector3(0,this.size.y * 0.5, this.size.z * 0.5)
        var p = new Vector3(this.position.x + this.size.x, 
            this.position.y + direction.y, 
            this.position.z + direction.z);
        
        return new RectPlane(p, direction);
    }

    bottomPlane(){
        var direction = new Vector3(this.size.x * 0.5, 0, this.size.z * 0.5)
        var p = new Vector3(this.position.x + direction.x, 
            this.position.y, 
            this.position.z + direction.z);
    
        return new RectPlane(p, direction);
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


    topPlane(){
        var direction = new Vector3(this.size.x * 0.5, 0, this.size.z * 0.5)
        var p = new Vector3(this.position.x + direction.x, 
            this.position.y + this.size.y, 
            this.position.z + direction.z);
        
        return new RectPlane(p, direction);
    }

    frontPlane(){
        var direction = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0)
        var p = new Vector3(this.position.x + direction.x, 
            this.position.y + direction.y, 
            this.position.z );
        
        return new RectPlane(p, direction);
    }

    backPlane(){
        var direction = new Vector3(this.size.x * 0.5, this.size.y * 0.5, 0)
        var p = new Vector3(this.position.x + direction.x, 
            this.position.y + direction.y, 
            this.position.z + this.size.z );
        
        return new RectPlane(p, direction);
    }

    getBottomPoint(){
        return Vector3.add(this.position, new Vector3(this.size.x * 0.5,0, this.size.z * 0.5));
    }

    getBoundingBox(){
        var halfsize = Vector3.scale(this.size, 0.5);
        return new AxisAlignedBox(Vector3.add(this.position, halfsize),halfsize)
    }

        
}