const GAME_STATE = {
    INIT:0,
    MAIN_MENU: 1,
    NEW_GAME: 2,
    LOADING_GAME: 3,
    PLAYING_GAME: 4
}
const PHI = (1 + Math.sqrt(5)) / 2;
class Game{
    constructor(){
        this.input = new GameInput();
        this.state = GAME_STATE.INIT;
        this.elapsed = 0;
        this.world = new World(this.input, this);
        this.world.input = this.input;
        this.mainMenu = new MainMenu()
        this.mainMenu.input = this.input;
    }

    init(){
        //initialize player sprite;
        var texture = new Image();
        texture.onload = function(){

        };
        texture.src = "assets/graphics/test_player.png"


        this.world.player.sprite = new Sprite3D(texture);
        this.world.player.sprite.position = Vector3.zero();
        this.world.player.sprite.drawRect = Rect.fromAABB(AABB.fromStartAndSize(
            new Vector3(0,0,0),
            new Vector3(32,64,32)
        )); 

        this.world.player.sprite.srcRect.x = 48;
        this.world.player.sprite.srcRect.y = 0;
        this.world.player.sprite.srcRect.sx = 64;
        this.world.player.sprite.srcRect.sy = 32*3;





    }
    update(elapsed){
        this.elapsed += elapsed;

        switch(this.state){
            case GAME_STATE.INIT:
                this.init();
                this.state = GAME_STATE.MAIN_MENU;
                break;
            case GAME_STATE.MAIN_MENU:
                this.mainMenu.update(elapsed);
                switch(this.mainMenu.state){
                    case MAIN_MENU_STATE.REQUEST_NEW_GAME:
                        this.state = GAME_STATE.PLAYING_GAME;
                        break;

                }
         
                break;
            case GAME_STATE.LOADING_GAME:
                break;
            case GAME_STATE.PLAYING_GAME:
                this.world.update(elapsed);
                break;
        }
    }

    draw(ctx){
        switch(this.state){
            case GAME_STATE.MAIN_MENU:
                this.mainMenu.draw(ctx);
                break;
            case GAME_STATE.PLAYING_GAME:
                this.world.draw(ctx);
                
        }

    }

}