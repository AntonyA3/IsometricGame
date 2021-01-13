
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var game = new Game();

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
