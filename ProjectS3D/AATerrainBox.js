const AA_TERRAIN_BOX_TYPE = {
    H: 0,
    V: 1
}

class AATerrainBox{

    static fromStartAndSize(start,si, sj,  h0,h1,h2,h3,type){
        var hsi = si * 0.5;
        var hsj = sj * 0.5;
        var position = start;
        position.x += hsi;
        position.z += hsj;
        return new AATerrainBox(position,hsi, hsj, h0, h1, h2, h3, type);
    }
    constructor(position,hsi,hsj, h0,h1,h2,h3,type){
        this.position = position;
        this.hsi = hsi;
        this.hsj = hsj;
        this.h0 = h0;
        this.h1 = h1;
        this.h2 = h2;
        this.h3 = h3;
        this.type = type;
    }

    p0(){

        return Vector3.add(this.position,new Vector3(-this.hsi,this.h0,-this.hsj))
    }

    p1(){
        return Vector3.add(this.position,new Vector3(this.hsi,this.h1,-this.hsj))
    }

    p2(){
        return Vector3.add(this.position,new Vector3(this.hsi,this.h2,this.hsj))
    }

    p3(){
        return Vector3.add(this.position,new Vector3(-this.hsi,this.h3,this.hsj))
    }

    plane0(){
        var normal = undefined;
        switch(this.type){
            case AA_TERRAIN_BOX_TYPE.H:
                var p0 = this.p0();
                var v0 = Vector3.subtract(this.p3(), p0);
                var v1 = Vector3.subtract(this.p1(), p0);
                normal = Vector3.cross(v0, v1);
                return new Plane(p0,normal);
                
            case AA_TERRAIN_BOX_TYPE.V:
                var p3 = this.p3();
                var v0 = Vector3.subtract(this.p0(), p3);
                var v1 = Vector3.subtract(this.p2(), p3);
                normal = Vector3.cross(v1, v0);
                return new Plane(p3, normal);
        }
    }
   
    plane1(){
        var normal = undefined;
        switch(this.type){
            case AA_TERRAIN_BOX_TYPE.H:
                var p2 = this.p2();
                var v0 = Vector3.subtract(this.p1(), p2);
                var v1 = Vector3.subtract(this.p3(), p2);
                normal = Vector3.cross(v0, v1);
                return new Plane(p2, normal);
            case AA_TERRAIN_BOX_TYPE.V:
                var p1 = this.p1();
                var v0 = Vector3.subtract(p1, this.p0());
                var v1 = Vector3.subtract(p1, this.p2());
                normal = Vector3.cross(v0,v1);
                return new Plane(p1, normal);
        }
    }

    plane0Maxh(){
        switch(this.type){
            case AA_TERRAIN_BOX_TYPE.H:
                return  Math.max(this.h0, Math.max(this.h1, this.h3))
            case AA_TERRAIN_BOX_TYPE.V:
                return Math.max(this.h0, Math.max(this.h2, this.h3))

        }
    

    }
    plane1Maxh(){
        switch(this.type){
            case AA_TERRAIN_BOX_TYPE.H:
                return  Math.max(this.h1, Math.max(this.h2, this.h3))

            case AA_TERRAIN_BOX_TYPE.V:
                return  Math.max(this.h0, Math.max(this.h1, this.h2))

        }
    }

    maxH(){
        return Math.max(Math.max(this.h0, this.h1),Math.max(this.h2, this.h3));

    }
    aabb(){ 
        var maxH = Math.max(Math.max(this.h0, this.h1),Math.max(this.h2, this.h3));
        var maxHh = maxH * 0.5;
        var p = this.position
        return new AABB(new Vector3(p.x, p.y + maxHh,p.z), new Vector3(this.hsi, maxHh, this.hsj))
    }
}