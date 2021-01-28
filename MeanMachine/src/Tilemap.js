class Tilemap{
    constructor(){
        this.position = Vector3.zero();
        this.tileSprites = [];
        this.iVector = new Vector3(24,0,0);
        this.jVector = new Vector3(0,0,24);
        this.texture = undefined;
    }

    draw(ctx){
        for(var i = 0; i < this.tileSprites.length; i++){
            for(var j = 0; j < this.tileSprites.length; i++){
                this.tileSprites[i][j].draw(ctx)
            }
        }
    }
}