const MAIN_MENU_STATE ={
    TITLE_INTRO: 0,
    PRESS_START: 1,
    PRESS_START_TO_MAIN_SCREEN: 2,
    MAIN_SCREEN: 3,
    PRESSED_NEW_GAME: 4,
    PRESSED_CONTINUE_GAME: 5,
    PRESSED_LOAD_GAME: 6,
    PRESSED_SETTINGS: 7,
    SETTINGS_SCREEN: 8,
    CONFIRM_CONTINUE: 9,
    AUDIO_SETTINGS_SCREEN: 10,
    CONTROLS_SETTING_SCREEN: 11,
    LOAD_GAME_SCREEN: 12,
    CONTINUE_GAME_MENU: 13,
    REQUEST_NEW_GAME: 14
    
    
}

const FOCUS_CHANGE_MODE = {
    CHANGE_ON_PRESSED: 0,
    CHANGE_ON_HOLD_LONG: 1,
    CHANGE_ON_HOLD_SHORT: 2
}

const BUTTON_SWITCH_DIRECTION = {
    NONE: 0,
    UP: 1,
    DOWN: 2

}

const FOCUS_SWITCH_METHOD = {
    KEYBOARD: 0, 
    MOUSE: 1
}
class MainMenu{
    constructor(){

        this.musicActivated = false;
        this.music = document.getElementById("music");

        this.input = undefined;
        this.elapsed = 0;
        this.state = MAIN_MENU_STATE.TITLE_INTRO
        this.minTileIntroTime = 1;
        this.titleIntroEndTime = 5;
        this.loadingTimeStamp = 0;
        this.focus = 0;

        this.mainMenuButtons = [];
        this.settingsMenuButtons = [];
        this.newGameButton = new MainMenuButton();
        this.newGameButton.text = "New Game";
        this.newGameButton.textPosition = new Vector2(425,64)
        this.newGameButton.area = new Rect(425,64-16,64*3,32)

        this.continueButton = new MainMenuButton();
        this.continueButton.text = "Continue";
        this.continueButton.textPosition = new Vector2(425, 64*2)
        this.continueButton.area = new Rect(425,64*2-16,64*3,32)

        this.loadGameButton = new MainMenuButton();
        this.loadGameButton.text = "Load Game"
        this.loadGameButton.textPosition = new Vector2(425,64 *3)
        this.loadGameButton.area = new Rect(425,64*3-16,64*3, 32)

        this.settingsButton = new MainMenuButton();
        this.settingsButton.text = "Settings" 
        this.settingsButton.textPosition = new Vector2(425,64 * 4)
        this.settingsButton.area = new Rect(425,64*4-16,64*3,32)

        this.mainMenuButtons.push(this.newGameButton);
        this.mainMenuButtons.push(this.continueButton);
        this.mainMenuButtons.push(this.loadGameButton);
        this.mainMenuButtons.push(this.settingsButton)



        this.audioSettingButton = new MainMenuButton();
        this.audioSettingButton.text = "Audio";
        this.audioSettingButton.area = new Rect(0,0,64,32);

        this.controlSettingsButton  = new MainMenuButton();
        this.controlSettingsButton.text = "Controls";
        this.controlSettingsButton.area = new Rect(0,64, 64, 32); 

        this.settingsMenuButtons.push(this.audioSettingButton);
        this.settingsMenuButtons.push(this.controlSettingsButton);
    
        this.confirmContinueButton = new MainMenuButton();
        this.confirmContinueButton.text = "Yes"


        this.cancelContinueButton = new MainMenuButton();
        this.cancelContinueButton.text = "No"
        


        this.canContinue = false;
        this.buttonSwitchDirection = BUTTON_SWITCH_DIRECTION.NONE

        this.focusChangeModeUp = FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED;
        this.focusChangeModeDown = FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED;
        this.focusSwitchMethod = FOCUS_SWITCH_METHOD.KEYBOARD;
        this.lastMoveUp = 0;
        this.timesMovedUp = 0;
        this.lastMoveDown = 0;
        this.timesMovedDown = 0;

        this.waitingForFileLabel = new MainMenuLabel();
        this.waitingForFileLabel.textColor = "white"
        this.waitingForFileLabel.text = "Waiting For Save File";

        this.creditsLabel = new MainMenuLabel();
        this.creditsLabel.text = "Credits - Lex0nimus"
   
    }

    update(elapsed){

        var startGameKey = this.input.startGameKey
        this.elapsed += elapsed;
        switch(this.state){
            case MAIN_MENU_STATE.TITLE_INTRO:
                
                if(this.elapsed >= this.titleIntroEndTime){
                    this.state = MAIN_MENU_STATE.PRESS_START;             
                }
                if(startGameKey.isPressed || this.elapsed > this.minTileIntroTime){
                    this.state = MAIN_MENU_STATE.PRESS_START
                }
                this.music.volume = 0.0;
                break;
            case MAIN_MENU_STATE.PRESS_START:

                
                if(startGameKey.isPressed){
                    this.state = MAIN_MENU_STATE.PRESS_START_TO_MAIN_SCREEN
                    this.loadingTimeStamp = this.elapsed;
                }
                break;
            case MAIN_MENU_STATE.PRESS_START_TO_MAIN_SCREEN:
                if(!this.musicActivated){
                    this.musicActivated = true;
                    this.music.loop = true;
                    this.music.play();
                    this.music.volume = Math.min(1.0, this.music.volume + 0.1 * elapsed)
                    this.musicActivated = true;
                }
                if(this.elapsed - this.loadingTimeStamp > 1){
                    this.state = MAIN_MENU_STATE.MAIN_SCREEN;
                } 
                break;
            case MAIN_MENU_STATE.MAIN_SCREEN:
                this.music.volume = Math.min(1.0, this.music.volume + elapsed *0.1)


       
                this.focusChange()

                
                if(this.focus < 0){
                    this.focus =3;
                }else{
                    this.focus = (this.focus % 4);
                }

                if(this.input.startGameKey.isPressed || (this.input.mousebutton1.isPressed
                    && this.mainMenuButtons[this.focus].area.contains(this.input.mousePosition))){
                    switch(this.focus){
                        case 0:
                            this.state = MAIN_MENU_STATE.PRESSED_NEW_GAME;
                            break;
                        case 1:
                            if(this.canContinue){
                                this.state = MAIN_MENU_STATE.PRESSED_CONTINUE_GAME;
                            }
                            break;
                        case 2:
                            this.state = MAIN_MENU_STATE.PRESSED_LOAD_GAME;
                            break;
                        case 3:
                            this.state = MAIN_MENU_STATE.PRESSED_SETTINGS
                            break;
                        
                    }
                }

                for(var i = 0; i < this.mainMenuButtons.length; i++){
                    if(i == this.focus){
                        this.mainMenuButtons[i].textColor = "gold"
                        if(this.mainMenuButtons[i].focusState == BUTTON_FOCUS_STATE.NOT_FOCUSED){
                            this.mainMenuButtons[i].focusState = BUTTON_FOCUS_STATE.FOCUSING;
                        }
                    }else{
                        this.mainMenuButtons[i].textColor ="white"
                        if(this.mainMenuButtons[i].focusState == BUTTON_FOCUS_STATE.FOCUSED){
                            this.mainMenuButtons[i].focusState = BUTTON_FOCUS_STATE.UNFOCUSING;
                        }

                    }
                    this.mainMenuButtons[i].updateFocus(elapsed);

                    
                }

                
          
                break;
            case MAIN_MENU_STATE.PRESSED_NEW_GAME:
                this.music.currenTime = 0;
                this.music.pause()
                this.state = MAIN_MENU_STATE.REQUEST_NEW_GAME
                break;
            case MAIN_MENU_STATE.PRESSED_CONTINUE_GAME:
                this.state = MAIN_MENU_STATE.CONTINUE_GAME_MENU;
                break;
            case MAIN_MENU_STATE.PRESSED_LOAD_GAME:
                this.state= MAIN_MENU_STATE.LOAD_GAME_SCREEN;
                break;
            case MAIN_MENU_STATE.PRESSED_SETTINGS:
                this.focus = 0;
                this.state = MAIN_MENU_STATE.SETTINGS_SCREEN;
                break;
            case MAIN_MENU_STATE.SETTINGS_SCREEN:
                this.focusChange();
                if(this.focus > 1){
                    this.focus = 0;
                }else if(this.focus < 0){
                    this.focus = 1;
                    
                }

                for(var i = 0; i < this.settingsMenuButtons.length; i++){
                    if(i == this.focus){
                        this.settingsMenuButtons[i].textColor = "gold"
                        if(this.settingsMenuButtons[i].focusState == BUTTON_FOCUS_STATE.NOT_FOCUSED){
                            this.settingsMenuButtons[i].focusState = BUTTON_FOCUS_STATE.FOCUSING;
                        }
                    }else{
                        this.settingsMenuButtons[i].textColor = "white";
                        if(this.settingsMenuButtons[i].focusState == BUTTON_FOCUS_STATE.FOCUSED){
                            this.settingsMenuButtons[i].focusState = BUTTON_FOCUS_STATE.UNFOCUSING;
                        }
                    }
                    this.settingsMenuButtons[i].updateFocus(elapsed);

                }

                if(this.input.startGameKey.isPressed){
                    switch(this.focus){
                        case 0:
                            this.state = MAIN_MENU_STATE.AUDIO_SETTINGS_SCREEN;
                            break;
                        case 1:
                            this.state = MAIN_MENU_STATE.CONTROLS_SETTING_SCREEN;
                            break;

                    }
                }else if(this.input.backKey.isPressed){
                    this.state = MAIN_MENU_STATE.MAIN_SCREEN;
                }
                break;
            case MAIN_MENU_STATE.AUDIO_SETTINGS_SCREEN:
                if(this.input.backKey.isPressed){
                    this.state = MAIN_MENU_STATE.SETTINGS_SCREEN;
                }
                break;
            case MAIN_MENU_STATE.CONTROLS_SETTING_SCREEN:
                if(this.input.backKey.isPressed){
                    this.state = MAIN_MENU_STATE.SETTINGS_SCREEN;
                }
                break;
            case MAIN_MENU_STATE.LOAD_GAME_SCREEN:

                if(this.input.backKey.isPressed){
                    this.state = MAIN_MENU_STATE.MAIN_SCREEN;
                }
                break;
            case MAIN_MENU_STATE.CONTINUE_GAME_MENU:
                if(this.input.backKey.isPressed){
                    this.state = MAIN_MENU_STATE.MAIN_SCREEN;
                }
                break;
            


            
        }

    }

    focusChange(){

        if(this.input.mouseMoved){
            this.focusSwitchMethod = FOCUS_SWITCH_METHOD.MOUSE;
        }
        else{
            this.focusSwitchMethod = FOCUS_SWITCH_METHOD.KEYBOARD;
        }

        if (this.focusSwitchMethod == FOCUS_SWITCH_METHOD.MOUSE){
            switch(this.state){
                case MAIN_MENU_STATE.MAIN_SCREEN:
                    if(this.newGameButton.area.contains(this.input.mousePosition)){
                        this.focus = 0;
                    }
                    if(this.continueButton.area.contains(this.input.mousePosition)){
                        this.focus = 1;
                    }
                    if(this.loadGameButton.area.contains(this.input.mousePosition)){
                        this.focus = 2;
                    }if(this.settingsButton.area.contains(this.input.mousePosition)){
                        this.focus = 3;
                    }
                    break;

                case MAIN_MENU_STATE.SETTINGS_SCREEN:
                    if(this.audioSettingButton.area.contains(this.input.mousePosition)){
                        this.focus = 0;
                    }
                    if(this.controlSettingsButton.area.contains(this.input.mousePosition)){
                        this.focus = 1;
                    }
                    break;
            }
        }
        
        switch(this.buttonSwitchDirection){
            case BUTTON_SWITCH_DIRECTION.NONE:
                this.downSelection();
                this.upSelection();
                break;
            case BUTTON_SWITCH_DIRECTION.UP:
                this.upSelection();
                break;
            case BUTTON_SWITCH_DIRECTION.DOWN:
                this.downSelection();
                break;
        }

        
        

    
        
    }

       
    downSelection(){
    
        switch(this.focusChangeModeDown){
            case FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED:
                if(this.input.downKey.isPressed || this.input.downKey.isDown){
                    this.focus +=1;
                    this.buttonSwitchDirection = BUTTON_SWITCH_DIRECTION.DOWN;
                    this.focusChangeModeDown = FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_LONG;
                    this.lastMoveDown = this.elapsed;
                }
                break;
            case FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_LONG:
                if(this.timesMovedDown > 2){
                    this.timesMovedDown = 0;
                    this.focusChangeModeDown = FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_SHORT;
                }
                if(this.input.downKey.isDown){
                    
                    if(this.elapsed - this.lastMoveDown > 0.5){
                        this.focus +=1;
                        this.lastMoveDown = this.elapsed;
                        this.timesMovedDown += 1;
                    }
                }
                break;
            case FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_SHORT:
                if(this.input.downKey.isDown){
                    if(this.elapsed - this.lastMoveDown > 0.1){
                        this.focus +=1;
                        this.lastMoveDown = this.elapsed;
                    }
                }
                break;

            
        }

        
        if(this.input.downKey.isReleased){
            this.buttonSwitchDirection = BUTTON_SWITCH_DIRECTION.NONE;
            this.focusChangeModeDown =  FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED
        }
      
            
    }

    
    upSelection(){
        
                
        switch(this.focusChangeModeUp){
            case FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED:
                if(this.input.upKey.isPressed || this.input.upKey.isDown){
                    this.focus -=1;
                    this.buttonSwitchDirection = BUTTON_SWITCH_DIRECTION.UP;
                    this.focusChangeModeUp = FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_LONG;
                    this.lastMoveUp = this.elapsed;
                }
                break;
            case FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_LONG:
                if(this.timesMovedUp > 2){
                    this.timesMovedUp = 0;
                    this.focusChangeModeUp = FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_SHORT;
                }
                if(this.input.upKey.isDown){
                    
                    if((this.elapsed - this.lastMoveUp)> 0.5){
                        this.focus -=1;
                        this.lastMoveUp = this.elapsed;
                        this.timesMovedUp += 1;
                    }
                }
                break;
            case FOCUS_CHANGE_MODE.CHANGE_ON_HOLD_SHORT:
                if(this.input.upKey.isDown){
                    if((this.elapsed - this.lastMoveUp) > 0.1){
                        this.focus -=1;
                        this.lastMoveUp = this.elapsed;
                    }
                }
                break;

            
        }
        if(this.input.upKey.isReleased){
            this.buttonSwitchDirection = BUTTON_SWITCH_DIRECTION.NONE;
            this.focusChangeModeUp = FOCUS_CHANGE_MODE.CHANGE_ON_PRESSED
        }
        
        
    }

    drawMainMenu(ctx){

        ctx.fillStyle = "green"
        for( var i = 0; i < this.mainMenuButtons.length; i++){
            var b = this.mainMenuButtons[i].area;
            ctx.fillRect(b.x, b.y, b.sx, b.sy)
        }
        ctx.textAlign = "center|left"; 
        ctx.font = `${this.newGameButton.textSize}px sans serif`;
        ctx.fillStyle =this.newGameButton.textColor;

        ctx.fillText( this.newGameButton.text, 
            this.newGameButton.textPosition.x, 
            this.newGameButton.textPosition.y
        );

        ctx.font = `${this.continueButton.textSize}px sans serif`;
        if(this.canContinue){
            ctx.fillStyle =this.continueButton.textColor;
        }else{
            ctx.fillStyle ="lightgray";

        }
        ctx.fillText(this.continueButton.text,
            this.continueButton.textPosition.x,
            this.continueButton.textPosition.y);

        ctx.font = `${this.loadGameButton.textSize}px sans serif`;
        ctx.fillStyle =this.loadGameButton.textColor;
        ctx.fillText(this.loadGameButton.text,
             this.loadGameButton.textPosition.x, 
             this.loadGameButton.textPosition.y);

        ctx.font = `${this.settingsButton.textSize}px sans serif`;
        ctx.fillStyle =this.settingsButton.textColor;
        ctx.fillText(this.settingsButton.text, 
            this.settingsButton.textPosition.x
            , this.settingsButton.textPosition.y);

        ctx.font = '16px sans serif';
        ctx.fillStyle ="green";
        ctx.fillText(this.creditsLabel.text, 40, 440, 200);
        ctx.fillText('Load', 50, 1580)
    }

    drawSettingsScreen(ctx){
        ctx.font = '16px sans serif';

        ctx.font = `${this.audioSettingButton.textSize}px sans serif`;
        ctx.fillStyle = this.audioSettingButton.textColor;
        ctx.fillText(this.audioSettingButton.text, 50, 120);

        ctx.font = `${this.controlSettingsButton.textSize}px sans serif`;
        ctx.fillStyle = this.controlSettingsButton.textColor;
        ctx.fillText(this.controlSettingsButton.text, 50, 150);

    }

    drawLoadGameScreen(){
        ctx.font = '16px sans serif';
        ctx.fillStyle = this.waitingForFileLabel.textColor;
        ctx.fillText(this.waitingForFileLabel.text, 50, 120);

     

    }
    draw(ctx){
        ctx.fillStyle ="pink"
        ctx.fillRect(0,0,canvas.width, canvas.height)

        ctx.fillStyle ="orange"
        ctx.fillRect(0, 42,640, 480-42*2)

        ctx.fillStyle ="red"
        ctx.fillRect(640-245, 42,640-245, 480-42*2)



        switch(this.state){
            case MAIN_MENU_STATE.TITLE_INTRO:
                ctx.font = '50px serif';
                ctx.fillStyle ="green"

                ctx.fillText('Intro', 50, 90)
                break;
            case MAIN_MENU_STATE.PRESS_START:

                ctx.font = '50px serif';
                ctx.fillStyle ="black"

                ctx.fillText('Press Start', 50, 90)
                break;
            case MAIN_MENU_STATE.PRESS_START_TO_MAIN_SCREEN:
                ctx.font = '50px serif';
                ctx.fillStyle ="green"
                ctx.fillText('Loading...', 50, 90)
                break;
            case MAIN_MENU_STATE.MAIN_SCREEN:
                this.drawMainMenu(ctx)
                break;
            case MAIN_MENU_STATE.SETTINGS_SCREEN:
                this.drawSettingsScreen(ctx);
                break
            case MAIN_MENU_STATE.LOAD_GAME_SCREEN:
                this.drawLoadGameScreen(ctx);
                break;

            



        }

    }
}