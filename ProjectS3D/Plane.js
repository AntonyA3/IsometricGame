class Plane{
    constructor(position, normal){
        this.normal = normal;
        this.position = position;   
    }

    normalize(){
        this.normal = this.normal.normalize();
    }
}
