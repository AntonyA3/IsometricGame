class Sprite3d{
    constructor(image){
        this.position = Vector3.zero();
        this.volume = new VolumeBox(Vector3.zero(), Vector3.zero())
        this.srcRect = Rect.empty();
        this.drawRect = Rect.empty();
        this.image = image
        this.layer = 0;

    }
    copy(){
        var s = new Sprite3d(this.image)
        s.position = this.position.copy()
        s.volume = new VolumeBox(this.volume.start.copy(), this.volume.size.copy())

        s.srcRect = this.srcRect.copy();
        s.drawRect = this.drawRect.copy();
        return s;
    }

    move_to_position(posnew){
        var deltaPosition3d = Vector3.subtract(posnew, this.position);
        var deltaPosition2d = deltaPosition3d.toIsometric();
        this.position = Vector3.add(this.position, deltaPosition3d);
        this.volume.start = Vector3.add(this.volume.start, deltaPosition3d);
        this.drawRect.x += deltaPosition2d.x;
        this.drawRect.y += deltaPosition2d.y;

    }

    move_by_position(v){
        this.position = Vector3.add(this.position, v);
        this.volume.start = Vector3.add(this.volume.start, v);
        var iso = v.toIsometric();
        this.drawRect.x += iso.x;
        this.drawRect.y += iso.y;
    }


    draw(ctx){
        ctx.drawImage(this.image, this.srcRect.x, this.srcRect.y, this.srcRect.sx, this.srcRect.sy,
          Math.round(this.drawRect.x*256*256)/(256*256), Math.round(this.drawRect.y*256*256)/(256*256), this.drawRect.sx, this.drawRect.sy );
    }
}