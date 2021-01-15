class OBB {
  constructor(position, rightVector, upVector, depthVector) {
    this.position = position || Vector3.zero();
    this.rightVector = rightVector || Vector3.zero();
    this.upVector = upVector || Vector3.zero();
    this.depthVector = depthVector || Vector3.zero();
  }

  limits(){
    var verticies = this.verticies()
    var o = {minx: verticies[0].x,
       miny: verticies[0].y,
       minz: verticies[0].z,
       maxx: verticies[0].x,
       maxy: verticies[0].y,
       maxz: verticies[0].z
     }

     for(var i = 1; i < 8; i++){
       o.minx = Math.min(o.minx, verticies[i].x)
       o.maxx = Math.max(o.maxx, verticies[i].x)

       o.miny = Math.min(o.miny, verticies[i].y)
       o.maxy = Math.max(o.maxy, verticies[i].y)

       o.minz = Math.min(o.minz, verticies[i].z)
       o.maxz = Math.max(o.maxz, verticies[i].z)

     }
     return o;



  }

  verticies(){

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
