const CAMERA_EVENT = {
    SET_FOCUS: 0,
    SET_MODE: 1,

}

class CameraAnimation{
    constructor(camera){
        this.camera = camera;
        this.elapsed = 0;
        this.events = {

        }

    }

    update(elapsed){
        this.elapsed += elapsed;
        for(var i = 0; i < this.events; i++){
            switch(this.events[i].type){
                case CAMERA_EVENT.SET_FOCUS:
                    break;
                case CAMERA_EVENT.SET_MODE:
                    break;
            }
        }

    }
}