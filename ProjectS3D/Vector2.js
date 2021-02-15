class Vector2{

    static zero(){
        return new Vector2(0,0)
    }
    static add(v0, v1){
        return new Vector2(
            v0.x + v1.x, v0.y + v1.y
        )
    }

    static subtract(v0, v1){
        return new Vector2(
            v0.x - v1.x, v0.y - v1.y
        )
    }
    static divide(v0, v1){
        return new Vector2(
            v0.x / v1.x, v0.y / v1.y
        )
    }
    static multiply(v0, v1){
        return new Vector2(
            v0.x * v1.x, v0.y * v1.y
        )
    }
    static scale(v0, s){
        return new Vector2(
            v0.x * s, v0.y * s
        )
    }
    static dot(v0, v1){
        return v0.x * v1.x + 
        v0.y * v1.y 
    }

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    negate(){
        return new Vector3(-this.x,-this.y,-this.z)
    }
    length(){
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    normalize(){
        var sqt = 1 / length();
        return Vector3.scale(this,sqt);
    }
}