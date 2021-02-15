class BoxPlane{
    constructor(position, halfsize, planeNormal){
        this.position = position;
        this.halfsize = halfsize;
        this.planeNormal = planeNormal;
    }

    static fromStartAndSize(start, size, planeNormal){
        var halfsize = Vector3.scale(size, 0.5);
        return new BoxPlane(Vector3.add(start, halfsize), halfsize,
        planeNormal.normalize()
        );

    }

    aabb(){
        return new AABB(this.position, this.halfsize);
    }

    plane(){
        return new Plane(this.position, this.planeNormal);
    }
}