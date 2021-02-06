
class World{
    constructor(controlpad){

        this.controlPad = controlpad;

        this.imageMap = new Map();
        this.camera = new Camera();
        this.player = new Player();
        this.roomMap = new Map();

        this.roomIsTransitioning = false;
        this.roomTransition = new Map();
        this.roomTransition.set(1, new RoomTransition());
        this.roomTransition.get(1).nextRoom = 2;

        this.roomTransition.set(2, new RoomTransition());
        this.roomTransition.get(2).nextRoom = 1;

 
        this.activeRoomId = null;
        
        this.activeRoomTransition = new RoomTransition() ;
        

     
    }

    freezePlayer(value){
        this.roomMap.get(this.activeRoomId).freezePlayer(value);

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

    requestRoomByTransitionID(id){
        if(!this.activeRoomTransition.transitioning){
            this.activeRoomTransition = this.roomTransition.get(id);
            this.activeRoomTransition.startTransition(this);
        }
        

    }

    update(elapsed){
        
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).update(elapsed)
        }
        if(this.activeRoomTransition.transitioning){
            this.activeRoomTransition.update(elapsed, this)
        }

        
    }

    draw(ctx){
        
        
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).draw(ctx)
        }
        if(this.activeRoomTransition.transitioning){
            this.activeRoomTransition.drawOverlay(ctx, this.camera.bounds);
        }
       
        
    }
}