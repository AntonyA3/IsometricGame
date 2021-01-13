class OBB {
  constructor(position, rightVector, upVector, depthVector) {
    this.position = position || Vector3.zero();
    this.rightVector = rightVector || Vector3.zero();
    this.upVector = upVector || Vector3.zero();
    this.depthVector = depthVector || Vector3.zero();
  }

  minX(){
    return this.position.x - Math.abs(this.rightVector.x) - Math.abs(this.upVector.x) - Math.abs(this.depthVector.x);

  }

  maxX(){
    return this.position.x + Math.abs(this.rightVector.x) + Math.abs(this.upVector.x) + Math.abs(this.depthVector.x);

  }

  minY(){
    return this.position.y - Math.abs(this.rightVector.y) - Math.abs(this.upVector.y) - Math.abs(this.depthVector.y);

  }

  maxY(){
    return this.position.y + Math.abs(this.rightVector.y) + Math.abs(this.upVector.y) + Math.abs(this.depthVector.y);

  }

  minZ(){
    return this.position.z - Math.abs(this.rightVector.z) - Math.abs(this.upVector.z) - Math.abs(this.depthVector.z);

  }

  maxZ(){
    return this.position.z + Math.abs(this.rightVector.z) + Math.abs(this.upVector.z) + Math.abs(this.depthVector.z);

  }

  verticies(){
    var min_x = this.minX();
    var max_x = this.maxX();
    var min_y = this.minY();
    var max_y = this.maxY();
    var min_z = this.minZ();
    var max_z = this.maxZ();

    return [
      Vector3.subtract(Vector3.subtract(Vector3.subtract(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.subtract(Vector3.add(Vector3.subtract(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.subtract(Vector3.add(Vector3.add(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.subtract(Vector3.subtract(Vector3.add(this.position, this.rightVector),this.upVector),this.depthVector),

      Vector3.add(Vector3.subtract(Vector3.subtract(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.add(Vector3.add(Vector3.subtract(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.add(Vector3.add(Vector3.add(this.position, this.rightVector),this.upVector),this.depthVector),
      Vector3.add(Vector3.subtract(Vector3.add(this.position, this.rightVector),this.upVector),this.depthVector),
    ];
  }
}
