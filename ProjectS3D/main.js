const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")


var game = new Game();
var elapsed = 1/60;
var time = 0;



document.addEventListener("mousemove", e =>{
    var rect = canvas.getBoundingClientRect();
        
    var x = Math.min(e.clientX - rect.left, 640);
    var y = Math.min(e.clientY - rect.top, 480);
    game.input.mousePosition = new Vector2(x,y);
    game.input.mouseMoved = true;
});

document.addEventListener("mousedown", e =>{
    updateKeyOnDown(game.input.mousebutton1)
});

document.addEventListener("mouseup", e =>{
    updateKeyOnUp(game.input.mousebutton1)
});

document.addEventListener("keydown", e =>{

    switch(e.key.toUpperCase()){
        case game.input.startGameKey.key:
            updateKeyOnDown(game.input.startGameKey);
            break;
        case game.input.upKey.key:
            updateKeyOnDown(game.input.upKey);
            break;
        case game.input.downKey.key:
            updateKeyOnDown(game.input.downKey);
            break;
        case game.input.exitKey.key:
            updateKeyOnDown(game.input.exitKey);
            break;
        case game.input.leftKey.key:
            updateKeyOnDown(game.input.leftKey);
            break;
        case game.input.rightKey.key:
            updateKeyOnDown(game.input.rightKey);
            break;
        case game.input.backKey.key:
            updateKeyOnDown(game.input.backKey);
            break;
        case game.input.action1Key.key:
            updateKeyOnDown(game.input.action1Key);
            break;
    }
   
});

document.addEventListener("keyup", e =>{
    switch(e.key.toUpperCase()){
        case game.input.startGameKey.key:
            updateKeyOnUp(game.input.startGameKey);
            break;
        case game.input.upKey.key:
            updateKeyOnUp(game.input.upKey);
            break;
        case game.input.downKey.key:
            updateKeyOnUp(game.input.downKey);
            break;
        case game.input.exitKey.key:
            updateKeyOnUp(game.input.exitKey);
            break;
        case game.input.leftKey.key:
            updateKeyOnUp(game.input.leftKey);
            break;
        case game.input.rightKey.key:
            updateKeyOnUp(game.input.rightKey);
            break;
        case game.input.backKey.key:
            updateKeyOnUp(game.input.backKey);
            break;
        case game.input.action1Key.key:
            updateKeyOnUp(game.input.action1Key);
            break;
    }
})

function updateKeyOnDown(key){
    key.isDown = true;
    key.isPressed = key.isUp;
    key.isUp = false;
    key.isReleased = false;
}

function updateKeyOnUp(key){
    key.isUp = true;
    key.isReleased = true;
    key.isPressed = false;
    key.isDown = false;
}


function update(){
    game.update(elapsed)
}

function draw(){
    game.draw(ctx);
}

function loop(t){
    update();
    game.input.update();
    draw()
    elapsed = (t -  time) *0.001;
    elapsed = Math.min(elapsed, 0.5)
    time = t
    window.requestAnimationFrame(loop)
}
time = performance.now();
window.requestAnimationFrame(loop)
