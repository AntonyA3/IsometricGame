class Game {
  constructor() {

    this.world = new World();
    this.controlpad = new VirtualControlPad();
    this.world.controlpad = this.controlpad;

  }

  init(){


  }

  update(elapsed){
    this.world.update(elapsed);
    this.controlpad.postUpdate();

  }

  draw(elapsed, ctx){
    this.world.draw(elapsed, ctx);
  }

}
