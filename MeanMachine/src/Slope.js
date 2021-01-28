const Slope_Type = {
    DX_DY: 0,
    NDX_DY: 1,
    DZ_DY: 2,
    NDZ_DY: 3
}

class Slope{    
    static fromStartAndSize(start, size, type){
        var halfsize =  Vector3.scale(size, 0.5);
        var position = Vector3.add(start, halfsize);
        var slope = new Slope(position, halfsize, type)
        return slope;
    }

    static empty(){
        return new Slope(Vector3.zero(), Vector3.zero(), Slope_Type.DX_DY);
    }
    constructor(position, halfsize, type){
        this.position = position;
        this.halfsize = halfsize; 
        this.type = type
    }

    getSlopeNormal(){
        switch(this.type){
            case Slope_Type.DX_DY:
                return Vector3.cross(new Vector3(0,0,1), new Vector3(this.halfsize.x, this.halfsize.y,0 )).normalize()
            case Slope_Type.NDX_DY:
                return Vector3.cross(new Vector3(-this.halfsize.x, this.halfsize.y,0 ), new Vector3(0,0,1)).normalize()
            case Slope_Type.DZ_DY:
                return Vector3.cross(new Vector3(0, this.halfsize.y,this.halfsize.z ),new Vector3(1,0,0)).normalize()
            case Slope_Type.NDZ_DY:
                return Vector3.cross( new Vector3(1,0,0),new Vector3(0 , this.halfsize.y, -this.halfsize.z)).normalize()


        }
    }
   
    asAxisAlignedBox(){
        return new AxisAlignedBox(this.position, this.halfsize);
    }
}