class Sprite3D{
    constructor(texture){
        this.position = Vector3.zero();
        this.drawRect= Rect.empty();
        this.srcRect = Rect.empty();
        this.volume = AABB.empty();
        this.layer = 0;
        this.texture = texture;
    }

    moveBy(v){
        this.position = Vector3.add(this.position, v);
        this.volume.position = Vector3.add(this.volume.position, v);
        var iso = v.toIsometric();
        this.drawRect.x += iso.x;
        this.drawRect.y += iso.y;
    }

    moveTo(v){
        var d3d = Vector3.subtract(v,this.position);
        var d2d = d3d.toIsometric();
        this.volume.position = Vector3.add(this.volume.position, d3d);
        this.position = v;
        this.drawRect += d2d.x;
        this.drawRect += d2d.y;
    }

    draw(ctx){
        ctx.drawImage(this.texture, 
            this.srcRect.x, this.srcRect.y, 
            this.srcRect.sx, this.srcRect.sy,
            this.drawRect.x, this.drawRect.y,
            this.drawRect.sx, this.drawRect.sy
        )
    }
}