
const canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
var game = new Game();
var elapsed = 1/60.0;
var time = 0;

game.init();
function keyDownVirtualControlButton(button){
    button.isDown = 1;
    if(button.isUp == 1){
      button.isPressed = 1;
      button.isPressed_TIME = Date.now();
    }
    button.isUp = 0;
    button.isDown_TIME = Date.now();
  }
  
  function keyUpVirtualControlButton(button){
    button.isDown = 0;
    button.isUp = 1;
    button.isUp_TIME = Date.now();
    button.isReleased = 1;
    button.isReleased_TIME = Date.now();
  }
  
  document.addEventListener("keydown", e =>{
    switch (e.keyCode) {
      case 27: //esc
        keyDownVirtualControlButton(game.controlPad.button_START);
        break;
      case 87: //w
        keyDownVirtualControlButton(game.controlPad.up);
        break;
      case 83: //s
        keyDownVirtualControlButton(game.controlPad.down);
        break;
      case 65: //a
        keyDownVirtualControlButton(game.controlPad.left);
        break;
      case 68: //d
        keyDownVirtualControlButton(game.controlPad.right);
        break;
      case 74: //j
        keyDownVirtualControlButton(game.controlPad.button_A);
        break;
  
    }
  });
  
  document.addEventListener("keyup", e =>{
    switch (e.keyCode) {
      case 27: //esc
        keyUpVirtualControlButton(game.controlPad.button_START);
        break;
      case 87: //w
        keyUpVirtualControlButton(game.controlPad.up)
        break;
      case 83: //s
        keyUpVirtualControlButton(game.controlPad.down)
        break;
      case 65: //a
        keyUpVirtualControlButton(game.controlPad.left)
        break;
      case 68: //d
        keyUpVirtualControlButton(game.controlPad.right)
        break;
      case 74: //j
        keyUpVirtualControlButton(game.controlPad.button_A);
        break;
  
    }
  
  });

function update(){
    game.update(elapsed)
}

function draw(){
    game.draw(ctx);
}

function loop(t){
    update();
    draw()
    elapsed = (t -  time) *0.001;
    time = t
    window.requestAnimationFrame(loop)
}
time = performance.now();
window.requestAnimationFrame(loop)

