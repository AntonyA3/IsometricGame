class Rect{

    static empty(){
        return new Rect(0,0,0,0);
    }
    static fromAxisAlignedBox(box){
        
        var minX = Vector3.add(box.position, new Vector3(-box.halfsize.x, 0, box.halfsize.z)).toIsometric().x
        var maxX = Vector3.add(box.position, new Vector3(box.halfsize.x, 0, -box.halfsize.z)).toIsometric().x

        var maxY = Vector3.add(box.position, new Vector3(box.halfsize.x, -box.halfsize.y, box.halfsize.z)).toIsometric().y
        var minY = Vector3.add(box.position, new Vector3(-box.halfsize.x, box.halfsize.y, -box.halfsize.z)).toIsometric().y

        var r = new Rect(minX,minY,maxX - minX, maxY - minY);
        return r;
    }

    constructor(x,y,sx,sy){
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    }

    copy(){
        return new Rect(this.x, this.y, this.sx, this.sy);
    }
}