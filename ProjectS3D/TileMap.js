class TileMap{
    constructor(texture){
        this.position = Vector3.zero();
        this.iVector = new Vector3(32,0,0);
        this.jVector = new Vector3(0,0, 32)
        this.sprites = [];
        this.texture = texture;
    }



}