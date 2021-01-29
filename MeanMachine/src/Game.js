class Game{
    constructor(){
        this.controlPad = new VirtualControlPad();
        this.world = new World(this.controlPad);
        this.level_num = -1;
        this.leveldata=""
        this.started = false;
        this.initWorld(this)
    }

    init(){
    }
    static setLevel(request, game){
        var level = JSON.parse(request.responseText.slice(1))
       
        var textures = [];
        if (level.hasOwnProperty('texture_assets')){
            for (var i = 0; i < level['texture_assets'].length; i++){
                var img = new Image();
                img.onload = function(){
                }
                img.src = level['texture_assets'][i];
                console.log(img)
                textures.push(img);
            }
        }
      
        game.world.tilemap = []
        for(var i = 0; i < level["tilemap"].length; i++){
            var tilemap_data = level["tilemap"][i]
            var tilemap = new Tilemap();
            var i_vector = tilemap_data["i_vector"];
            var j_vector = tilemap_data["j_vector"];
            var ivv = new Vector3(i_vector[0], i_vector[1], i_vector[2])
            var jvv = new Vector3(j_vector[0], j_vector[1], j_vector[2])
            tilemap.jVector = jvv;
            tilemap.iVector = ivv;
            tilemap.texture = textures [level['tilemap'][i].texture_index]
            tilemap.position = new Vector3(
                tilemap_data.position[0],
                 tilemap_data.position[1],
                tilemap_data.position[2])
            
            var tile_setdata = tilemap_data["tiles"];
            var tile_hash_map = new Map();
            for (var j = 0; j < tile_setdata.length; j++){
                var tile = tile_setdata[j]
                var sprite = new Sprite3d();
                sprite.srcRect = new Rect(tile.src_area[0], tile.src_area[1], tile.src_area[2], tile.src_area[3]);
                sprite.position = new Vector3(
                    tile.volume[0],
                    tile.volume[1],
                    tile.volume[2]
                );
                sprite.drawRect = Rect.fromAxisAlignedBox(
                    AxisAlignedBox.fromStartAndSize(
                        new Vector3(
                            tile.volume[0],
                            tile.volume[1],
                            tile.volume[2]
                        ),
                        new Vector3(
                            tile.volume[3],
                            tile.volume[4],
                            tile.volume[5]
                        )
                    )
                )
                sprite.image = tilemap.texture
                tile_hash_map.set(tile["key"], sprite)
            }
            
            var tile_layout = tilemap_data.data;
            for(var j = 0; j < tile_layout.length; j++){
                tilemap.tileSprites.push([])
                for(var k = 0; k < tile_layout[j].length; k++){
                    var t = tile_hash_map.get(tile_layout[j][k]).copy()
                    

                    t.offset(tilemap.position);
                    t.offset(Vector3.scale(tilemap.iVector, j));
                    t.offset(Vector3.scale(tilemap.jVector, k))
                    tilemap.tileSprites[j].push(t)
                }
            }
            game.world.tilemap.push(tilemap)
        }
        this.started = true

    }
    update(elapsed){
        this.world.update(elapsed);
        this.controlPad.postUpdate();
    }
    
    initWorld(the_game){
        switch(this.level_num){
            case -1:
                var request = new XMLHttpRequest();
            
                request.onreadystatechange = function(){

                    if(this.readyState ==4 && this.status ==200){
                        Game.setLevel(this, the_game)
                    }
                }
                
                request.open("POST","http://127.0.0.1:8000/index.php?level=level_i", true);
                request.send();
                break;
        }       
    }

    draw(ctx){
        
        ctx.clearRect(this.world.camera.bounds.x, this.world.camera.bounds.y,this.world.camera.bounds.sx, this.world.camera.bounds.sy)
        ctx.setTransform(
            1,0,
            0,1,
            -this.world.camera.bounds.x, -this.world.camera.bounds.y
            )
        this.world.draw(ctx);
    }

    loop(time){
        this.update()
       
        window.requestAnimationFrame(loop)

    }
}