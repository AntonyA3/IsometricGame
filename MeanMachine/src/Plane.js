class Plane{
    constructor(position, direction){
        this.position = position;
        this.direction = direction;
    }

    min(){
        return Vector3.subtract(this.position, this.direction);
    }
    max(){
        return Vector3.add(this.position, this.direction);
    }
}