class PH_Solver {
  constructor() {

  }

  static AABBvsAABB(box0, velocity, box1){
    var b_intersect = AA_Box.intersection(box0, box1);
    var b_center = b_intersect.center();

    var xPlane = box1.getPlane( AA_Box_Side.Left *(velocity.x > 0 ) + AA_Box_Side.Right * (velocity.x < 0));
    var yPlane = box1.getPlane( AA_Box_Side.Bottom * (velocity.y > 0 ) + AA_Box_Side.Top * (velocity.y < 0));
    var zPlane = box1.getPlane( AA_Box_Side.Front *(velocity.z > 0 ) + AA_Box_Side.Back * (velocity.z < 0));


    var nx = 1;
    var ny = 1;
    var nz = 1;
    if(velocity.x != 0){
      nx = (xPlane.x - b_center.x) / velocity.x
    }
    if(velocity.y != 0){
      ny = (yPlane.y - b_center.y) / velocity.y
    }
    if(velocity.z != 0){
      nz = (zPlane.z - b_center.z) / velocity.z
    }

    var n = [nx, ny, nz];
    n = n.filter(x => x <= 0);
    if(n.length == 0){
      return  {normal:Vector3.zero(), depth:0 ,hit:false}
    }
    var bestN = n[0];
    for(var i = 0; i < n.length; i++){
      if(n[i] > bestN){
        bestN = n[i];
      }
    }

    var box = box0.offset(Vector3.scale(velocity,2 * bestN))
    var normal = Vector3.zero();
    var depth = 0;
    switch (bestN) {
      case nx:
        depth = b_intersect.sx;
        normal = new Vector3(-1*Math.sign(velocity.x),0,0)
        break;
      case ny:
        depth = b_intersect.sy;
        normal = new Vector3(0,-1*Math.sign(velocity.y),0)
        break;
      case nz:
        depth = b_intersect.sz;
        normal = new Vector3(0,0,-1*Math.sign(velocity.z))
        break;
    }
    return {normal:normal, depth:depth ,hit:true}


  }

  static AABBvsManyAABB(box0, velocity, boxes){
    var result = {depth:0, normal:Vector3.zero(), hit:false}
    var b = AA_Box.empty();
    for(var i = 0; i < boxes.length;i++){
      var tr = PH_Solver.AABBvsAABB(box0, velocity, boxes[i]);

      if(tr.hit){
        if(!result.hit){
          result = tr;
          b = boxes[i];
        }else {
          if(Vector3.subtract(boxes[i].center(), box0.center()).lengthSquared() < Vector3.subtract(b.center(), box0.center()).lengthSquared()){
            result = tr;
            b = boxes[i]

          }
        }

      }
    }
    return result;
  }

  /*
  static AABBvsAABBContact(box0, normal, box1){
    var contactFunction = function(box0Min, box0Max, box1Min, box1Max){
      if(box0Min <=box1Min && box0Max >= box1Max){
          return box1Min +(box1Max - box1Min) * 0.5;
      }

      if(box0Min >= box1Min && box0Max <= box1Max){
          return box0Min +(box0Max - box0Min) * 0.5;
      }

      if(box0Min < box1Min){
          return box1Min
      }
      if(box0Max > box1Max){
          return box1Max;
      }

    };
    var contact = Vector3.zero();
    var box0_center = box0.center();
    var box1_center = box1.center();
    switch (normal) {
      case new Vector3(-1,0,0):
        contact.x = center.x + 0.5 * box0.sx;
        contact.y = contactFunction(box0.y, (box0.y + box0.sy), box1.y, (box1.y + box1.sy));
        contact.z = contactFunction(box0.z, (box0.z + box0.sz), box1.z, (box1.z + box1.sz));
        break;
      case new Vector3(1,0,0):
        contact.x = center.x - 0.5 * box0.sx;
        contact.y = contactFunction(box0.y, (box0.y + box0.sy), box1.y, (box1.y + box1.sy));
        contact.z = contactFunction(box0.z, (box0.z + box0.sz), box1.z, (box1.z + box1.sz));
        break;
      case new Vector3(0, -1, 0):
        contact.x = contactFunction(box0.x, (box0.x + box0.sx), box1.x, (box1.x + box1.sx));
        contact.y = center.y + 0.5 * box0.sy;
        contact.z = contactFunction(box0.z, (box0.z + box0.sz), box1.z, (box1.z + box1.sz));
        break;
      case new Vector3(0, 1, 0):
        contact.x = contactFunction(box0.x, (box0.x + box0.sx), box1.x, (box1.x + box1.sx));
        contact.y = center.y - 0.5 * box0.sy;
        contact.z = contactFunction(box0.z, (box0.z + box0.sz), box1.z, (box1.z + box1.sz));
        break;
      case new Vector3(0,0, -1):
        contact.x = contactFunction(box0.x, (box0.x + box0.sx), box1.x, (box1.x + box1.sx));
        contact.y = center.y - 0.5 * box0.sy;
        contact.z = center.y + 0.5 * box0.sz;
        break;
      case new Vector3(0,0, 1):
        contact.x = contactFunction(box0.x, (box0.x + box0.sx), box1.x, (box1.x + box1.sx));
        contact.y = center.y - 0.5 * box0.sy;
        contact.z = center.y - 0.5 * box0.sz;
        break;
    }
    return contact;
  }
  /*
  static AABBvsRay(ray, box){
    var rayPos = new Vector3(ray.x, ray.y, ray.z);

    //find the three possible planes,
    var xPlane = box.getPlane( AA_Box_Side.Left *(ray.dx > 0 ) + AA_Box_Side.Right * (ray.dx <= 0));
    var yPlane = box.getPlane( AA_Box_Side.Bottom * (ray.dy > 0 ) + AA_Box_Side.Top * (ray.dy <= 0));
    var zPlane = box.getPlane( AA_Box_Side.Front *(ray.dz > 0 ) + AA_Box_Side.Back * (ray.dz <= 0));
    //find the closest contact suface of the three

    var xPlaneResult = PH_Solver.AAPvsRay(ray, xPlane);
    var yPlaneResult = PH_Solver.AAPvsRay(ray, yPlane);
    var zPlaneResult = PH_Solver.AAPvsRay(ray, zPlane);

    var distanceToXPlane = -1;
    var distanceToYPlane = -1;
    var distanceToZPlane = -1;


    if(xPlaneResult.hit){
      distanceToXPlane = Vector3.subtract(xPlaneResult.contact,rayPos).lengthSquared();
    }

    if(yPlaneResult.hit){
      distanceToYPlane = Vector3.subtract(yPlaneResult.contact,rayPos).lengthSquared();

    }

    if(zPlaneResult.hit){
      distanceToZPlane = Vector3.subtract(zPlaneResult.contact,rayPos).lengthSquared();
    }

    var distances = [distanceToXPlane,distanceToYPlane,distanceToZPlane]
    distances = distances.filter(d => d != -1);

    if(distances.length == 0){
      return {contact: Vector3.zero(), normal: Vector3.zero(), hit:false}
    }
    var bestDistance = distances[0];
    for(var i = 1; i < distances.length; i++){
      bestDistance = bestDistance * (distances[i] > bestDistance) + distances[i] * (distances[i] < bestDistance)
    }

    switch (bestDistance) {
      case distanceToXPlane:
        return {contact: xPlaneResult.contact, normal:xPlaneResult.normal, hit:xPlaneResult.hit};
      case distanceToYPlane:
        return {contact: yPlaneResult.contact, normal:yPlaneResult.normal, hit:yPlaneResult.hit};
      case distanceToZPlane:
        return {contact: zPlaneResult.contact, normal:zPlaneResult.normal, hit:zPlaneResult.hit};
      default:
        return {contact: Vector3.zero(), normal: Vector3.zero(), hit:false}

    }

  }

  static AAPvsRay(ray,plane){
    var contact = Vector3.zero();
    var n = 0;
    var normal = Vector3.zero();


    switch (plane.axis) {
      case AA_Plane_Axis.XY:
        if(ray.dz != 0){
          var n = (plane.z - ray.z) / ray.dz
          var normal = new Vector3(0,0,-1*Math.sign(ray.dz))
        }

        break;
      case AA_Plane_Axis.ZY:
        if(ray.dx != 0){
          n = (plane.x - ray.x) / ray.dx
          normal = new Vector3(-1*Math.sign(ray.dx),0,0)
        }
        break;
      case AA_Plane_Axis.XZ:
        if(ray.dy !=0 ){
          n = (plane.y - ray.y) / ray.dy
          normal = new Vector3(0,-1*Math.sign(ray.dy),0)
        }
        break;
    }
    contact = Vector3.add(new Vector3(ray.x, ray.y, ray.z),
    Vector3.scale(new Vector3(ray.dx,ray.dy,ray.dz),n));
    if(plane.contains(contact) && !(Vector3.equals(normal, Vector3.zero()))){
      return {contact: contact, normal: normal, hit:true}
    }else {
      return {contact: Vector3.zero(), normal: Vector3.zero(), hit:false}

    }

  }*/

}
