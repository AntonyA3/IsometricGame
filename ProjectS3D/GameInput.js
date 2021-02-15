
class GameInput{
    constructor(){
        this.startGameKey = {key:"ENTER", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.upKey = {key:"W", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.downKey = {key:"S", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.leftKey = {key:"A", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.rightKey = {key:"D", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.exitKey = {key:"ESCAPE", isPressed: false, isDown: false, isReleased: false, isUp: true};
        this.backKey = {key:"BACKSPACE", isPressed: false, isDown: false, isReleased: false, isUp:true};

        this.action1Key = {key:"J",  isPressed: false, isDown: false, isReleased: false, isUp:true}
        this.mousePosition = Vector2.zero();
        this.mouseMoved = false;
        this.mousebutton1 = { isPressed: false, isDown: false, isReleased: false, isUp:true}
    }

    update(){
        var k = this.startGameKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.upKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.downKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.leftKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.rightKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.exitKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.backKey;
        k.isPressed = false;
        k.isReleased = false;

        k = this.action1Key;
        k.isPressed = false;
        k.isReleased = false;

        k = this.mousebutton1;
        k.isPressed = false;
        k.isReleased = false;

        this.mouseMoved = false;
    }


}