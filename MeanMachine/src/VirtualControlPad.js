class VirtualControlPad {
  constructor() {
    this.left = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.right = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.down = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.up = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.button_START = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.button_A = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.button_B = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.button_C = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
    this.button_START = {isDown: 0, isUp: 1, isPressed: 0, isReleased: 0, isDown_TIME:0, isUp_TIME:0,  isPressed_TIME:0, isReleased_TIME:0 };
  }

  postUpdate(){
    this.left.isPressed = 0;
    this.right.isPressed = 0;
    this.down.isPressed = 0;
    this.up.isPressed = 0;
    this.button_START.isPressed = 0;
    this.button_A.isPressed = 0;
    this.button_B.isPressed = 0;
    this.button_C.isPressed = 0;

    this.left.isReleased = 0;
    this.right.isReleased = 0;
    this.down.isReleased = 0;
    this.up.isReleased = 0;
    this.button_START.isReleased = 0;
    this.button_A.isReleased = 0;
    this.button_B.isReleased = 0;
    this.button_C.isReleased = 0;

    this.left.isUp_TIME =  Math.max(this.left.isUp_TIME, Date.now() * (this.left.isUp == 1));
    this.right.isUp_TIME = Math.max(this.right.isUp_TIME, Date.now() * (this.right.isUp == 1));
    this.down.isUp_TIME = Math.max(this.down.isUp_TIME, Date.now() * (this.down.isUp == 1));
    this.up.isUp_TIME = Math.max(this.up.isUp_TIME, Date.now() * (this.up.isUp == 1));
    this.button_START.isUp_TIME = Math.max(this.button_START.isUp_TIME, Date.now() * (this.button_START.isUp == 1));
    this.button_A.isUp_TIME = Math.max(this.button_A.isUp_TIME, Date.now() * (this.button_A.isUp == 1));
    this.button_B.isUp_TIME = Math.max(this.button_B.isUp_TIME, Date.now() * this.button_B.isUp);
    this.button_C.isUp_TIME = Math.max(this.button_C.isUp_TIME, Date.now() * this.button_C.isUp);


  }
}
