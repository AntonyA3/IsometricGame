const HeightPlaneType ={
    V: 0,
    H: 1
}
class HeightPlaneCollider{
    constructor(position, basesize, type, h0, h1, h2, h3,
        canCollideLeft = true, canCollideRight = true,
        canCollideBottom = true, canCollidePlane1 = true,
        canCollidePlane2 = true, canCollideFront = true,
        canCollideBack = true){
        this.position = position;
        this.basesize = basesize;
        this.type = type;
        this.h0 = h0;
        this.h1 = h1;
        this.h2 = h2;
        this.h3 = h3;
        this.canCollideLeft = canCollideLeft;
        this.canCollideRight = canCollideRight;
        this.canCollideBottom = canCollideBottom;
        this.canCollidePlane1 = canCollidePlane1;
        this.canCollidePlane2 = canCollidePlane2;
        this.canCollideFront = canCollideFront;
        this.canCollideBack = canCollideBack;
        
    }

    getBoundingBox(){
        var sizey = Math.max(Math.max(this.h0, this.h1),Math.max(this.h2,this.h3))
        var size = new Vector3(this.basesize.x,sizey,this.basesize.y)
        var halfsize = Vector3.scale(size, 0.5);
    
        return new AxisAlignedBox(Vector3.add(this.position, halfsize), halfsize);
        
    }

    getGradientVectors(point){
        var d1 = PlaneUtils.DistanceToPlane(point, this.getPlane1());
        var d2 = PlaneUtils.DistanceToPlane(point, this.getPlane2());
        //find first plane
        //find second plane
        var mind = Math.min(d1, d2);
        var negX = Vector3.zero();
        var posX = Vector3.zero();
        var negZ = Vector3.zero();
        var posZ = Vector3.zero();

        var p0 = this.p0();
        var p1 = this.p1();
        var p2 = this.p2();
        var p3 = this.p3();
        switch(this.type){
            case HeightPlaneType.H:
                switch(mind){
                    case d1:  
                        negX = Vector3.subtract(p0, p1).normalize();
                        posX = negX.negate();
                        negZ = Vector3.subtract(p0, p3).normalize();
                        posZ = negZ.negate();          
                        break;
                    case d2:
                        negX = Vector3.subtract(p3, p2).normalize();
                        posX = negX.negate();
                        negZ = Vector3.subtract(p1, p2).normalize();
                        posZ = negZ.negate();     
                        break;
                }
                break;
            case HeightPlaneType.V:
                switch(mind){
                    case d1:  
                        negX = Vector3.subtract(p0, p1).normalize();
                        posX = negX.negate();
                        negZ = Vector3.subtract(p1, p2).normalize();
                        posZ = negZ.negate();          
                        break;
                    case d2:
                        negX = Vector3.subtract(p3, p2).normalize();
                        posX = negX.negate();
                        negZ = Vector3.subtract(p0, p3).normalize();
                        posZ = negZ.negate();     
                        break;
                }
                break;
        }
        return {negX: negX, posX: posX, negZ: negZ, posZ: posZ}
        
    }

    getPlane1(){
        switch(this.type){
            case HeightPlaneType.V:
             
                var p0 = this.p0();
                var p1 = this.p1();
                var p2 = this.p2();
                var normal = Vector3.cross(Vector3.subtract(p1,p0), Vector3.subtract(p1,p2)).normalize();
                return new Plane(p0, normal);
            case HeightPlaneType.H:
                var p0 = this.p0();
                var p1 = this.p1();
                var p3 = this.p3();
                var normal = Vector3.cross(Vector3.subtract(p1,p0), Vector3.subtract(p1,p3)).normalize()
                return new Plane(p0, normal);
        }
    }

    bottomPlane(){
        var direction = new Vector3(this.basesize.x * 0.5, 0, this.basesize.y * 0.5)
        var p = new Vector3(this.position.x + direction.x, 
            this.position.y, 
            this.position.z + direction.z);
    
        return new RectPlane(p, direction);
    }

    getPlane2(){
        switch(this.type){
            case HeightPlaneType.V:
                var p0 = this.p0();
                var p3 = this.p3();
                var p2 = this.p2()
                var normal = Vector3.cross( Vector3.subtract(p3,p2), Vector3.subtract(p3,p0)).normalize()
                return new Plane(p0, normal);

            case HeightPlaneType.H:
                var p2 = this.p2();
                var p1 = this.p1();
                var p3 = this.p3();
                var normal = Vector3.cross(Vector3.subtract(p1,p2), Vector3.subtract(p3,p2)).normalize()
                return new Plane(p2, normal);
                
        }
    }

    p0(){
        var p = this.position.copy();
        p.y += this.h0;
        return p;

    }

    p1(){
        var p = this.position.copy();
        p.x += this.basesize.x;
        p.y += this.h1;
        return p;

    }

    p2(){
        var p = this.position.copy();
        p.x += this.basesize.x;
        p.y += this.h2;
        p.z += this.basesize.y; 
        return p;
    }

    p3(){
        var p = this.position.copy();
        p.z += this.basesize.y;
        p.y += this.h3;
        return p;
    }

    minX(){
        return this.position.x;
    }

    maxX(){
        return this.position.x + this.basesize.x;
    }

    minY(){
        return this.position.y;
    }

    maxY(){
        return this.position.y +Math.max(Math.max(this.h0, this.h1), Math.max(this.h2, this.h3));
    }

    minZ(){
        return this.position.z;
    }

    maxZ(){
        return this.position.z + this.basesize.y;
    }

}

var hpc = new HeightPlaneCollider(new Vector3(0,0,0), new Vector2(24,24),HeightPlaneType.V,0,0,0,0);
hpc.getPlane2();