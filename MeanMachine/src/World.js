
const TRANSITION_STATE = {
    TRANSITIONING: 0,
    NOT_TRANSITIONING: 1
}
class World{
    constructor(controlpad){

        this.controlPad = controlpad;

        this.imageMap = new Map();
        this.camera = new Camera();
        this.player = new Player();
        this.roomMap = new Map();

        this.roomIsTransitioning = false;
        this.transitionState = TRANSITION_STATE.NOT_TRANSITIONING;
        this.roomTransition = new Map();
        this.activeRoomId = null;
        this.activeRoomTransition = new RoomTransition() ;
        

     
    }

    static createRoomTransition(request,world){
        var json = request.response.slice(1);
        var data = JSON.parse(json);
        var transition =  JSON.parse(data.data);
        var id = JSON.parse(data.id);
        var result = DataLoader.RoomTransitionFromJSON(transition);
        world.roomTransition.set(id, result);


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
        this.activeRoomTransition = this.roomTransition.get(id);
        this.activeRoomTransition.state = ROOM_TRANSITION_STATE.TRANSITIONING;
        this.activeRoomTransition.transition = true;
        
        
    }

    update(elapsed){
        
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).update(elapsed)
        }
    
        if(this.activeRoomTransition != null){
            this.activeRoomTransition.update(elapsed, this)

        }
        
     


        
        
    }

    draw(ctx){
        
        
        if(this.activeRoomId != null){
            this.roomMap.get(this.activeRoomId).draw(ctx)
        }
        this.activeRoomTransition.drawOverlay(ctx, this.camera.bounds);
        
       
        
    }
}