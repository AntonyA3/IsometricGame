class Game{
    constructor(){
        this.controlPad = new VirtualControlPad();
        this.world = new World(this.controlPad);
    }

    init(){

        this.initAssets();
        this.initRoom(this)

    }

    static createRoom(request ,game){
       

        var j = request.response.slice(1);
        var room = JSON.parse(j);
        var data =  JSON.parse(room.data);
        var roomID = JSON.parse(room.id);
        var imageMap = game.world.imageMap


        var result = DataLoader.RoomFromJson(data, imageMap);
   
        game.world.addRoom(roomID,result);
        game.world.setActiveRoomByID(1)

        

       
    }

    update(elapsed){
        elapsed = Math.min(0.5, elapsed)
        this.world.update(elapsed);
        this.controlPad.postUpdate();
    }
    
    initAssets(){
        game.world.imageMap = new Map();
        game.world.imageMap.set("test_tiles", new Image());
        game.world.imageMap.get("test_tiles").onload = function(){}
        game.world.imageMap.get("test_tiles").src = "../assets/test_tiles.png"
    }

    initRoom(the_game){  
        var request = new XMLHttpRequest();
    
        request.onreadystatechange = function(){

            if(this.readyState ==4 && this.status ==200){
                
                Game.createRoom(this, the_game)
            }
        }
        
        request.open("POST","http://127.0.0.1:8000/index.php?roomid=1", true);
        request.send();
        request = new XMLHttpRequest();
        request.onreadystatechange = function(){

            if(this.readyState ==4 && this.status ==200){
                
                Game.createRoom(this, the_game)
            }
        }
        request.open("POST","http://127.0.0.1:8000/index.php?roomid=2", true);
        request.send();


        request = new XMLHttpRequest();
        request.onreadystatechange = function(){

            if(this.readyState ==4 && this.status ==200){
                
                World.createRoomTransition(this, game.world)
            }
        }
        request.open("POST","http://127.0.0.1:8000/index.php?roomtransitionid=1", true);
        request.send();


        request = new XMLHttpRequest();
        request.onreadystatechange = function(){

            if(this.readyState ==4 && this.status ==200){
                
                World.createRoomTransition(this, game.world)
            }
        }
        request.open("POST","http://127.0.0.1:8000/index.php?roomtransitionid=2", true);
        request.send();
            
    }

    draw(ctx){
    
        ctx.clearRect(this.world.camera.bounds.x-20, this.world.camera.bounds.y-20,this.world.camera.bounds.sx+40, this.world.camera.bounds.sy +40)
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