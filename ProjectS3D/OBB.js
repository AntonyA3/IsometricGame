class OBB{

    static fromStartAndSizes(start, iVector2, jVector2, kVector2){
        var iv =  Vector3.scale(iVector2, 0.5);
        var jv = Vector3.scale(jVector2, 0.5);
        var kv  =Vector3.scale(kVector2, 0.5);
        var position  = Vector3.add(Vector3.add(start, iv),Vector3.add(jv, kv));

        return new OBB(position, iv, jv, kv);

    }

    constructor(position, iVector, jVector, kVector){
        this.position = position;
        this.iVector = iVector;
        this.jVector = jVector;
        this.kVector = kVector;
    }

    aabb(){
        var h = Vector3.add(this.iVector, Vector3.add(this.jVector, this.kVector));

        var min = Vector3.subtract(this.position, h);
        var max = Vector3.add(this.position, h);
        var abb = AABB.fromStartAndSize(min, Vector3.subtract(max, min))
    
        return AABB.fromStartAndSize(min, Vector3.subtract(max, min))
    }
    leftPlane(){
        var position = Vector3.subtract(this.position, this.iVector);
        return new Plane(position,this.iVector.negate().normalize())

    }

    rightPlane(){
        var position = Vector3.add(this.position, this.iVector);
        return new Plane(position,this.iVector.normalize())

    }

    bottomPlane(){
        var position = Vector3.subtract(this.position, this.jVector);
        return new Plane(position,this.jVector.negate().normalize())

    }

    topPlane(){
        var position = Vector3.add(this.position, this.jVector);
        return new Plane(position,this.jVector.normalize())

    }

    frontPlane(){
        var position = Vector3.subtract(this.position, this.kVector);
        return new Plane(position,this.kVector.negate().normalize())

    }

    backPlane(){
        var position = Vector3.add(this.position, this.kVector);
        return new Plane(position,this.kVector.normalize())
    }
}