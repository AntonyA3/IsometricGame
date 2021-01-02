var worldCanvas = document.getElementById("world")
var world_ctx = worldCanvas.getContext('2d')

var background  = document.getElementById("background");
var background_ctx = background.getContext('2d');

var ui = document.getElementById("ui");
var ui_ctx = ui.getContext('2d');

var game = new Game();

game.background_context = background_ctx;
game.ui_context = ui_ctx
game.world_context = world_ctx;
game.init();
var lastTime = performance.now();
var elapsed = 1 /60;


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
      keyDownVirtualControlButton(game.controlpad.button_START);
      break;
    case 87: //w
      keyDownVirtualControlButton(game.controlpad.up);
      break;
    case 83: //s
      keyDownVirtualControlButton(game.controlpad.down);
      break;
    case 65: //a
      keyDownVirtualControlButton(game.controlpad.left);
      break;
    case 68: //d
      keyDownVirtualControlButton(game.controlpad.right);
      break;
    case 74: //j
      keyDownVirtualControlButton(game.controlpad.button_A);
      break;

  }
});

document.addEventListener("keyup", e =>{
  switch (e.keyCode) {
    case 27: //esc
      keyUpVirtualControlButton(game.controlpad.button_START);
      break;
    case 87: //w
      keyUpVirtualControlButton(game.controlpad.up)
      break;
    case 83: //s
      keyUpVirtualControlButton(game.controlpad.down)
      break;
    case 65: //a
      keyUpVirtualControlButton(game.controlpad.left)
      break;
    case 68: //d
      keyUpVirtualControlButton(game.controlpad.right)
      break;
    case 74: //j
      keyUpVirtualControlButton(game.controlpad.button_A);
      break;

  }

});

function update(elapsed){
  game.update(elapsed/1000);
}

function draw(elapsed){
  game.draw(elapsed/1000)
}

function loop(time){

  update(elapsed);
  draw(elapsed);
  elapsed = time - lastTime;
  lastTime = time;
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
