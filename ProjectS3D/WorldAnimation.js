const WORLD_EVENTS = {
    SET_ROOM: 0,
    SET_STATE: 1
}

class WorldAnimation{
    constructor(world){
        this.world = world;
        this.animations = []
        this.cameraAnimations = new CameraAnimation(world.camera)
        
    }

    update(elapsed){
        for(var i = 0; i < this.cameraAnimations.length; i++){
            this.cameraAnimations[i].update(elapsed);
        }
        for (var i = 0; i < this.animations.length; i++){
            switch(this.animations[i].type){
                case WORLD_EVENTS.SET_ROOM:

                    break;
                case WORLD_EVENTS.SET_STATE:
                    break;
            }
        }
    }
}