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
    var min_x = minX();
    var max_x = maxX();
    var min_y = minY();
    var max_y = maxY();
    var min_z = minZ();
    var max_z = maxZ();

    return [
      new Vector3(min_x, min_y, min_z),
      new Vector3(min_x, max_y, min_z),
      new Vector3(max_x, max_y, min_z),
      new Vector3(max_x, min_y, min_z),
      new Vector3(min_x, min_y, max_z),
      new Vector3(min_x, max_y, max_z),
      new Vector3(max_x, max_y, max_z),
      new Vector3(max_x, min_y, max_z)
    ];
  }
}
