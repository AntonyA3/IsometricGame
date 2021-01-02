class Texture {
  constructor(src) {
    this.image = new Image();
    this.image.onload = function(){};
    this.image.src = src;
  }
}
