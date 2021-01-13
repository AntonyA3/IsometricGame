class Game {
  constructor() {

    this.world = new World();

  }

  init(){


  }

  update(elapsed){
    this.world.update(elapsed);
  }

  draw(elapsed, ctx){
    this.world.draw(elapsed, ctx);
  }

}
