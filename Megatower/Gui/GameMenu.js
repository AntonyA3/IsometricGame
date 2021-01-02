class GameMenu {
  constructor() {
    this.button_position = [];
    this.button_area = [];
    this.button_text = [];
    this.button_on_pressed = [];
    this.focus_button = 0;
  }

  nextFocus(){
    console.log("change to neext focus")
    this.focus_button = ((this.focus_button + 1) % this.button_area.length);
  }
  prevFocus(){
    this.focus_button = this.focus_button - 1;
    if(this.focus_button < 0){
      this.focus_button = this.button_area.length - 1;

    }
  }

  activateFocused(){
    this.button_on_pressed[this.focus_button]();
  }

  draw(elapsed, ctx){
    for(var i = 0; i < this.button_area.length; i++){
      if(i == this.focus_button){
        ctx.fillStyle = "red"
      }else {
        ctx.fillStyle = "blue"
      }

      ctx.fillRect(this.button_area[i].x, this.button_area[i].y, this.button_area[i].sx, this.button_area[i].sy);
      ctx.fillStyle = "white"

      ctx.fillText(this.button_text[i],this.button_position[i].x, this.button_position[i].y + this.button_area[i].sy *0.5, this.button_area[i].sx)
    }

  }


}
