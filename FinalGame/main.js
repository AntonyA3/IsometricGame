
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var game = new Game();




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
function loop() {
  update(1/60);
  draw(1/60, ctx);
  window.requestAnimationFrame(loop)
}
function update(elapsed){
  game.update(elapsed);
}

function draw(elapsed, ctx){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  game.draw(elapsed, ctx);

}
loop();
