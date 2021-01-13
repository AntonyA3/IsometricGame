class World {
  constructor() {
    this.player = new Player();
  }


  update(elapsed){

  }

  draw(elapsed, ctx){
    this.player.draw(ctx);
  }
}
