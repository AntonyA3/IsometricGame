const MAIN_MENU_BUTTON_STATE ={
    NOTHING: 0,
    HOVERING: 1,
    CLICKED: 2,
}
const BUTTON_FOCUS_STATE ={
    NOT_FOCUSED: 0,
    FOCUSING: 1,
    FOCUSED: 2,
    UNFOCUSING: 3

}
class MainMenuButton{

    constructor(){
        this.text = "Play";
        this.textColor = "white";
        this.textSize = 16;
        this.textPosition = Vector2.zero();
        
        this.area = Rect.empty();
        this.focusState = BUTTON_FOCUS_STATE.NOT_FOCUSED
        this.focusElapsed = 0;
        this.focusDuration = 0.1;
        this.unfocusDuration = 0.1;

    }

   updateFocus(elapsed){
       switch(this.focusState){
           case BUTTON_FOCUS_STATE.FOCUSING:
            
               this.focusElapsed += elapsed;
               this.textSize = Interpolation.lerpFloatEaseInOut(16, 20,0.4,0.6, 0.1, this.focusElapsed)

               if(this.focusElapsed > 0.1){
                   this.focusElapsed = 0;
                   this.focusState = BUTTON_FOCUS_STATE.FOCUSED;
               }
               break;
            case BUTTON_FOCUS_STATE.FOCUSED:
                break;
            case BUTTON_FOCUS_STATE.UNFOCUSING:
                this.focusElapsed += elapsed;
               this.textSize = Interpolation.lerpFloatEaseInOut(20, 16, 0.4, 0.6, 0.1, this.focusElapsed)
               if(this.focusElapsed > 0.1){
                   this.focusElapsed = 0;
                   this.focusState = BUTTON_FOCUS_STATE.NOT_FOCUSED;
               }

       }

   }
}