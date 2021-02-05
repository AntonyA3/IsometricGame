class World{
    constructor(controlpad){
        this.controlPad = controlpad;
        this.imageMap = new Map();

        this.imageMap.set("test_tiles", new Image());
        this.imageMap.get("test_tiles").onload = function(){}
        this.imageMap.get("test_tiles").src = "../assets/test_tiles.png"

        //this.imageMap.set("test_player", new Image());


        this.camera = new Camera();
        this.player = new Player();
        this.roomMap = new Map();

        this.roomTransition = new Map();
        
        this.roomTransition.set(1, new Map());
        var b = this.roomTransition.get(1)
        b.set(2, new RoomTransition());

        this.roomTransition.set(2, new Map());

        b = this.roomTransition.get(2)
        b.set(1, new RoomTransition());

        this.activeRoomId = null;

     
    }

    setActiveRoomByID(id){
        this.activeRoomId = id
    }

    addRoom(id,room){
        room.camera = this.camera;
        room.player = this.player;
        room.controlPad = this.controlPad; 
        room.world = this; 


        this.roomMap.set(id, room);


    }

    requestRoomByID(id){
        var previousId = this.activeRoomId;
        
        console.log(id)
        var roomTransition = this.roomTransition.get(previousId).get(id);
        this.activeRoomId = id;
        this.player.move_to_position(roomTransition.playerStartPosition);
        this.camera.move_to_focus(roomTransition.cameraStartPosition)
        this.camera.mode = Camera_Mode.PERFECT_FOLLOW;

        //use the room transition system to change the player, and the camera;
    }

    update(elapsed){
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).update(elapsed)
        }
    }

    draw(ctx){
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).draw(ctx)
        }
    }
}