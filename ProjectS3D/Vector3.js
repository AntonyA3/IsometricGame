class Vector3{
    


    static zero(){
        return new Vector3(0,0,0)
    }

    static up(){
        return new Vector3(0,1,0);
    }
    
    static right(){
        return new Vector3(1,0,0);
    
    }
    static forward(){
        return new Vector3(0,0,1);
    }

    static infinity(){
        return new Vector3(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }

    static add(v0, v1){
        return new Vector3(
            v0.x + v1.x, v0.y + v1.y, v0.z + v1.z
        )
    }

    static subtract(v0, v1){
        return new Vector3(
            v0.x - v1.x, v0.y - v1.y, v0.z - v1.z
        )
    }
    static divide(v0, v1){
        return new Vector3(
            v0.x / v1.x, v0.y / v1.y, v0.z / v1.z
        )
    }
    static multiply(v0, v1){
        return new Vector3(
            v0.x * v1.x, v0.y * v1.y, v0.z * v1.z
        )
    }
    static scale(v0, s){
        return new Vector3(
            v0.x * s, v0.y * s, v0.z * s
        )
    }
    static dot(v0, v1){
        return v0.x * v1.x + 
        v0.y * v1.y +
        v0.z * v1.z;
    }
    static cross(v0, v1){
        return new Vector3(
            v0.y * v1.z - v0.z * v1.y,
            v0.z * v1.x - v0.x * v1.z,
            v0.x * v1.y - v0.y * v1.x
        );
    }
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy(){
        return new Vector3(this.x, this.y, this.z)
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
        var sqt = 1 / this.length();
        return Vector3.scale(this,sqt);
    }
    
    toIsometric(){
        var up = Vector3.scale(new Vector2(0,-1), this.y);
        var right = Vector3.scale( new Vector2(1, 0.5), this.x);
        var depth = Vector3.scale( new Vector2(-1, 0.5), this.z);

        return Vector2.add(up, Vector3.add(right, depth));
      }
}