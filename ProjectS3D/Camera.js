class Camera{
    constructor(){
        this.focalPoint = new Vector3(0,0,0);
        this.bounds = new Rect(
            -canvas.width *0.5,
            -canvas.height * 0.5,
            canvas.width,
            canvas.height);
    }

    moveBy(v){
        this.focalPoint = Vector3.add(this.focalPoint, v);
        var iso = this.focalPoint.toIsometric();
        this.bounds.x += iso.x;
        this.bounds.y += iso.y;
    }

    moveTo(v){
        var d3d = Vector3.subtract(v, this.focalPoint);
        var d2d = d3d.toIsometric();
        this.focalPoint = Vector3.add(this.focalPoint, d3d);
        this.bounds.x += d2d.x;
        this.bounds.y += d2d.y;
    }


}