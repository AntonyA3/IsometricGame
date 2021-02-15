
const WORLD_STATE = {
    NO_STATE: 0,
    NEW_GAME: 1,
    BASE_GAME: 2,
    PAUSED: 3,
    INTRO_SCENE: 4

}
class World{
    constructor(input, game){
        this.game = game;
        this.input = input;
        this.lastState = WORLD_STATE.NO_STATE;
        this.state =  WORLD_STATE.NEW_GAME;
        this.camera = new Camera();
        this.player = new Player();
        this.ui = new GameUI();
        this.introScene = new IntroScene(this); 
        this.roomMap = new Map();
        var room0 = new Room(); 
        room0.input = input;
        room0.player = this.player;

        this.roomMap.set(0, room0);
        this.roomId =  0;
        this.activeRoom = room0;
    }

    setRoom(id){
        this.roomId = id;
        this.activeRoom = this.roomMap.get(id);
    }

    update(elapsed){
        switch(this.state){
            case WORLD_STATE.NEW_GAME:

                this.lastState = WORLD_STATE.NEW_GAME;
                this.state = WORLD_STATE.INTRO_SCENE;
                break;
            case WORLD_STATE.INTRO_SCENE:
                this.introScene.update(elapsed);

                if(this.introScene.state == INTRO_SCENE_STATE.END){
                    this.state = WORLD_STATE.BASE_GAME;
                }
                break;
            case WORLD_STATE.BASE_GAME:
                this.activeRoom.update(elapsed);
                this.camera.moveTo(this.player.position)
                if(this.input.exitKey.isPressed){
                    this.lastState = WORLD_STATE.BASE_GAME;
                    this.state = WORLD_STATE.PAUSED;
                }
                break;
            case WORLD_STATE.PAUSED:
                if(this.input.exitKey.isPressed){
                    if(this.lastState = WORLD_STATE.BASE_GAME){
                        this.state = WORLD_STATE.BASE_GAME;
                        this.lastState = WORLD_STATE.PAUSED;
                    }
                }
                break;
            
        }
        
    }

    draw(ctx){
        
        
        switch(this.state){
            case WORLD_STATE.INTRO_SCENE:
                ctx.clearRect(0,0, canvas.width, canvas.height)
                ctx.setTransform(
                    1, 0,
                    0, 1,
                    0, 0
                )
                this.introScene.draw(ctx);
                break;
            case WORLD_STATE.PAUSED:
                ctx.clearRect(this.camera.bounds.x, this.camera.bounds.y, canvas.width, canvas.height)
                ctx.setTransform(
                    1, 0,
                    0, 1,
                    -this.camera.bounds.x, -this.camera.bounds.y
                )
                this.activeRoom.draw(ctx);

                ctx.setTransform(
                    1, 0,
                    0, 1,
                    0, 0
                )
                ctx.fillText("PAUSED", 640*0.5, 480 *0.5);

                

                break;
            case WORLD_STATE.BASE_GAME:
                ctx.clearRect(this.camera.bounds.x, this.camera.bounds.y, canvas.width, canvas.height)
                ctx.setTransform(
                    1, 0,
                    0, 1,
                    -this.camera.bounds.x, -this.camera.bounds.y
                )
                this.activeRoom.draw(ctx);
                break;
            
        }
       
        
    }
}