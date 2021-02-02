class VolumeBox{
    constructor(start, size){
        this.start = start;
        this.size = size;
    }

    minX(){
        return this.start.x;
    }

    maxX(){
        return this.start.x + this.size.x;
    }

    midX(){
        return (this.maxX() + this.minX()) * 0.5
    }
    minY(){
        return this.start.y;
    }

    maxY(){
        return this.start.y + this.size.y;
    }

    midY(){
        return (this.maxY() + this.minY()) * 0.5
    }

    minZ(){
        return this.start.z;
    }

    maxZ(){
        return this.start.z + this.size.z;
    }

    midZ(){
        return (this.maxZ() + this.minZ()) * 0.5
    }
}