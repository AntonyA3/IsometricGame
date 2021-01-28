
class AxisAlignedBox {


    static empty(){
        return new AxisAlignedBox(Vector3.zero(), Vector3.zero())
    }
    static fromStartAndSize(start, size){
        var halfsize =  Vector3.scale(size, 0.5);
        var position = Vector3.add(start, halfsize);
        var aabb = new AxisAlignedBox(position, halfsize)
        return aabb;
    }

    constructor(position, halfsize){
        this.position = position
        this.halfsize = halfsize
    }

    copy(){
        return new AxisAlignedBox(this.position.copy(), this.halfsize.copy())
    }

    minX(){
        return this.position.x - this.halfsize.x;
    }

    maxX(){
        return this.position.x + this.halfsize.x;
    }

    minY(){
        return this.position.y - this.halfsize.y;
    }
    
    maxY(){
        return this.position.y + this.halfsize.y;
    }

    minZ(){
        return this.position.z - this.halfsize.z;
    }

    maxZ(){
        return this.position.z + this.halfsize.z;
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

    bottomPlane(){
        var p = this.position.copy();
        p.y -=  this.halfsize.y;
        return new Plane(p, new Vector3(this.halfsize.x, 0, this.halfsize.z));
    }

    topPlane(){
        var p = this.position.copy();
        p.y +=  this.halfsize.y;
        return new Plane(p, new Vector3(this.halfsize.x, 0, this.halfsize.z));
    }

    frontPlane(){
        var p = this.position.copy();
        p.z -=  this.halfsize.z;
        return new Plane(p, new Vector3(this.halfsize.x, this.halfsize.y, 0));

    }

    backPlane(){
        var p = this.position.copy();
        p.z +=  this.halfsize.z;
        return new Plane(p, new Vector3(this.halfsize.x, this.halfsize.y, 0));
    }
    contains(point){
        if(point.x < this.minX()) return false;
        if(point.x > this.maxX()) return false;
        if(point.y < this.minY()) return false;
        if(point.y > this.maxY()) return false;
        if(point.z < this.minZ()) return false;
        if(point.z > this.maxZ()) return false;
        return true;
    }
    

    bottomVerticies(){
        return[
            Vector3.add(this.position, new Vector3(-this.halfsize.x, -this.halfsize.y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(this.halfsize.x, -this.halfsize.y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(this.halfsize.x, -this.halfsize.y, this.halfsize.z)),
            Vector3.add(this.position, new Vector3(this.halfsize.x, -this.halfsize.y, -this.halfsize.z)),
        ];
    }

    verticies(){
        return [
            Vector3.add(this.position, new Vector3(-this.halfsize.x, -this.halfsize,y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(-this.halfsize.x, this.halfsize,y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(this.halfsize.x, this.halfsize,y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(-this.halfsize.x, this.halfsize,y, -this.halfsize.z)),
            Vector3.add(this.position, new Vector3(-this.halfsize.x, -this.halfsize,y, this.halfsize.z)),
            Vector3.add(this.position, new Vector3(-this.halfsize.x, this.halfsize,y, this.halfsize.z)),
            Vector3.add(this.position, new Vector3(this.halfsize.x, this.halfsize,y, this.halfsize.z)),
            Vector3.add(this.position, new Vector3(-this.halfsize.x, this.halfsize,y, this.halfsize.z)),
        ]
    }
}