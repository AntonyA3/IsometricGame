const INTRO_SCENE_EVENT = {
    SET_SCREEN_RED: 0,
    SET_SCREEN_GREEN: 1,
    SET_SCREEN_BLUE: 2,
    SET_SCREEN_WHITE: 3,
    SET_END: 4
}

const INTRO_SCENE_STATE = {
    BEGIN: 0,
    ASK_FOR_NAME: 1,
    PLAYING: 2,
    END: 3,
}
class IntroScene{
    constructor(world){
        this.elapsed = 0;
        this.world = world;
        this.cameraBounds = new Rect(0,0,640,480) 
        this.state = INTRO_SCENE_STATE.BEGIN;
        this.music = undefined;
        this.rgbColor = "white";
        this.events = [
            {type : INTRO_SCENE_EVENT.SET_SCREEN_RED, time: 0},
            {type: INTRO_SCENE_EVENT.SET_SCREEN_GREEN, time: 1},
            {type: INTRO_SCENE_EVENT.SET_SCREEN_BLUE, time: 2},
            {type: INTRO_SCENE_EVENT.SET_SCREEN_WHITE, time:3},
            {type: INTRO_SCENE_EVENT.SET_END, time: 4}

        ]
    }

    update(elapsed){
        this.elapsed += elapsed;


       
    }

    draw(ctx){
        for(var i = 0; i < this.events.length; i++){
            var e = this.events[i];
            switch(e.type){
                case INTRO_SCENE_EVENT.SET_SCREEN_RED:
                    if(this.elapsed > e.time && (e.time - this.elapsed) <= e.time ){
                        this.rgbColor = "red";
                    }
                    break;
                case INTRO_SCENE_EVENT.SET_SCREEN_GREEN:
                    if(this.elapsed > e.time && (e.time - this.elapsed) <= e.time ){
                        this.rgbColor = "green";
                    }
                    break;
                case INTRO_SCENE_EVENT.SET_SCREEN_BLUE:
                    if(this.elapsed > e.time && (e.time - this.elapsed) <= e.time ){
                        this.rgbColor = "blue";
                    }
                    break;
                case INTRO_SCENE_EVENT.SET_SCREEN_WHITE:
                    if(this.elapsed > e.time && (e.time - this.elapsed) <= e.time ){
                        this.rgbColor = "white";
                    }
                    break;
                case INTRO_SCENE_EVENT.SET_END:
                    if(this.elapsed > e.time && (e.time - this.elapsed) <= e.time ){
                        this.state = INTRO_SCENE_STATE.END;
                    }
                    break;
            }
        }

        ctx.fillStyle = this.rgbColor;
        ctx.fillRect(0,0, canvas.clientWidth, canvas.height)
    }


}