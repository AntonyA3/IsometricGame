class Collision{


  static AABBintersectsAABB(box0, box1){
    if (!((box0.left() >= box1.left()  && box0.left() <=  box1.right()) || (box1.left() >= box0.left()  && box1.left() <=  box0.right()))) return false;
    if (!((box0.bottom() >= box1.bottom()  && box0.bottom() <=  box1.top()) || (box1.bottom() >= box0.bottom()  && box1.bottom() <=  box0.top()))) return false;
    if (!((box0.front() >= box1.front()  && box0.front() <=  box1.back()) || (box1.front() >= box0.front()  && box1.front() <=  box0.back()))) return false;

    return true;
  }

  static AABBintersectsSphere(box, sphere){
    var d1 = box.halfsize.x  + sphere.radius;
    var d2 = Math.abs(box.position.x - sphere.position.x)
    if(d2 > d1) return false

    d1 = box.halfsize.y + sphere.radius;
    d2 = Math.abs(box.position.y- sphere.position.y)
    if(d2 > d1) return false

    d1 = box.halfsize.z + sphere.radius;
    d2 = Math.abs(box.position.z- sphere.position.z)
    if(d2 > d1) return false

    return true
  } /**/


  static AABBDynamicvsOBB(aabb, velocity, obb){
    var start  = new Vector3(
      aabb.left() * (velocity.x < 0) + aabb.right() * (velocity.x >= 0),
      aabb.bottom() * (velocity.y < 0) + aabb.top() * (velocity.y >= 0),
      aabb.front() * (velocity.z < 0) + aabb.back() * (velocity.z >= 0)
    );

    var negVelocity = Vector3.negate(velocity)

    var dotRight = Vector3.dot(negVelocity, obb.rightVector);
    var dotUp = Vector3.dot(negVelocity, obb.upVector);
    var dotDepth = Vector3.dot(negVelocity, obb.depthVector);

    var px = undefined;
    var py = undefined;
    var pz = undefined;

    var normalx = undefined;
    var normaly = undefined;
    var normalz = undefined;

    if(dotRight < 0){
      px = Vector3.subtract(obb.position, obb.rightVector)
      normalx = Vector3.negate(obb.rightVector.normalize())
    }else {
      px = Vector3.add(obb.position, obb.rightVector)
      normalx = obb.rightVector.normalize();

    }

    if(dotUp < 0){
      py = Vector3.subtract(obb.position, obb.upVector);
      normaly = Vector3.negate(obb.upVector.normalize())
    }else {
      py = Vector3.add(obb.position, obb.upVector);
      normaly = obb.upVector.normalize();
    }

    if(dotDepth < 0){
      pz = Vector3.subtract(obb.position, obb.depthVector);
      normalz = Vector3.negate(obb.depthVector.normalize())
    }else {
      pz = Vector3.add(obb.position, obb.depthVector);
      normalz = obb.depthVector.normalize();
    }

    var m = Math.abs(Vector3.dot(velocity, velocity));
    var nx = m;
    var ny = m;
    var nz = m;

    if(dotRight != 0){
      nx = Vector3.dot(normalx, Vector3.subtract(px,start))
      / Vector3.dot(negVelocity,normalx);
    }

    if(dotUp != 0){
      ny = Vector3.dot(normaly, Vector3.subtract(py,start))
      / Vector3.dot(negVelocity,normaly);
    }

    if(dotDepth != 0){
      nz = Vector3.dot(normalz, Vector3.subtract(pz,start))
      / Vector3.dot(negVelocity, normalz);

    }


    if(nx < ny && nx < nz ){
      var normal = normalx

      var depth = Vector3.dot(normalx,Vector3.subtract(px,start)) /
      Vector3.dot(normalx,normalx)

      return {normal:normal, depth:depth}

    }

    if(ny < nx && ny < nz ){
      var normal = normaly

      var depth = Vector3.dot(normaly,Vector3.subtract(py,start)) /
      Vector3.dot(normaly,normaly)

      return {normal:normal, depth:depth}

    }

    if(nz < nx && nz < ny ){
      var normal = normalz;
      var depth = Vector3.dot(normalz,Vector3.subtract(pz,start)) /
      Vector3.dot(normalz,normalz);
      return {normal:normal, depth:depth}
    }

    return {normal:Vector3.zero(), depth:0}

  }
  static AABBDynamicvsAABB(aabb0, velocity, aabb1){
    //minkowski sum
    var startx = aabb0.left() * (velocity.x < 0) + aabb0.right() * (velocity.x >= 0);
    var starty = aabb0.bottom() * (velocity.y < 0) + aabb0.top() * (velocity.y >= 0);
    var startz = aabb0.front() * (velocity.z < 0) + aabb0.back() * (velocity.z >= 0);

    var endx = aabb1.left() * (velocity.x > 0) + aabb1.right() * (velocity.x <= 0);
    var endy = aabb1.bottom() * (velocity.y > 0)+ aabb1.top() * (velocity.y <= 0);
    var endz = aabb1.front() * (velocity.z > 0)+ aabb1.back() * (velocity.z <= 0);

    if(velocity.equals(Vector3.zero())){
      return {
        normal:new Vector3(0,1,0),
        depth: 0
      }
    }
    var negVelocity = Vector3.negate(velocity);
    var nx = negVelocity.x;
    var ny = negVelocity.y;
    var nz = negVelocity.z;


    if(velocity.x != 0){
      nx = (endx - startx) / negVelocity.x;
    }
    if(velocity.y != 0){
      ny = (endy - starty) / negVelocity.y;
    }
    if(velocity.z != 0){
      nz = (endz - startz) / negVelocity.z;
    }
    if(nx == ny && nx == nz){
      return {normal:new Vector3(-1*Math.sign(velocity.x),0,0), depth: 0}

    }

    if(nx < ny && nx < nz){
      return {normal:new Vector3(-1*Math.sign(velocity.x),0,0), depth: Math.abs(startx - endx)}
    }

    if(ny < nx && ny <nz){
      return {normal:new Vector3(0,-1*Math.sign(velocity.y),0), depth: Math.abs(starty - endy)}
    }

    if(nz < nx && nz < ny){
      return {normal:new Vector3(0,0,-1*Math.sign(velocity.z)), depth: Math.abs(startz - endz)}

    }
    return {normal:new Vector3(0,-1*Math.sign(velocity.y),0), depth: 0}



  }
  static rayToPerpendicularPlane(start, pointOnPlane, normal){
    var d = Vector3.dot(Vector3.subtract(pointOnPlane, start), normal) / Vector3.dot(normal, normal);
    return Vector3.add(start, Vector3.scale(normal, d));
  }
  static AABBintersectsCapsule(box, capsule){
    var axis1 = Vector3.cross(Vector3.subtract(capsule.max,capsule.min), Vector3.subtract(box.position, capsule.max));
    var axis2 = Vector3.cross(axis1, Vector3.subtract(capsule.max,capsule.min));

    var center = Collision.rayToPerpendicularPlane(Collision.rayToPerpendicularPlane(box.position,capsule.min, axis1), capsule.min, axis2);

    center.x = Math.min(Math.max(Math.min(capsule.min.x,capsule.max.x), center.x), Math.max(Math.max(capsule.min.x,capsule.max.x)))
    center.y = Math.min(Math.max(Math.min(capsule.min.y,capsule.max.y), center.y), Math.max(Math.max(capsule.min.y,capsule.max.y)))
    center.z = Math.min(Math.max(Math.min(capsule.min.z,capsule.max.z), center.z), Math.max(Math.max(capsule.min.z,capsule.max.z)))

    return Collision.AABBintersectsSphere(box, new Sphere(center, capsule.radiusVector.length()));

  } /**/
  static SeperateAxisIntersection(verticies0, verticies1, axis1normal, axis2normal){
    var verticies0Min = Number.POSITIVE_INFINITY;
    var verticies0Max = Number.NEGATIVE_INFINITY;
    var verticies1Min = Number.POSITIVE_INFINITY;
    var verticies1Max = Number.NEGATIVE_INFINITY;

    for(var i = 0; i < verticies0.length; i++){
      var d = Vector3.negate(Vector3.dot(verticies0[i], axis1normal)) / Vector3.dot(axis1normal, axis1normal);
      var pos = Vector3.add(verticies0[i], Vector3.scale(axis1normal,d));
      d = Vector3.negate(Vector3.dot(pos, axis2normal)) / Vector3.dot(axis2normal, axis2normal);
      pos = Vector3.add(pos, Vector3.scale(axis2normal,d));
      var r = Vector3.dot(pos,pos);
      verticies0Min = verticies0Min * (r >= verticies0Min) + r * (r < verticies0Min)
      verticies0Max = verticies0Max * (r <= verticies0Max) + r * (r > verticies0Max)
    }

    for(var i = 0; i < verticies1.length; i++){
      var d = Vector3.negate(Vector3.dot(verticies1[i], axis1normal)) / Vector3.dot(axis1normal, axis1normal);
      var pos = Vector3.add(verticies1[i], Vector3.scale(axis1normal,d));
      d = Vector3.negate(Vector3.dot(pos, axis2normal)) / Vector3.dot(axis2normal, axis2normal);
      pos = Vector3.add(pos, Vector3.scale(axis2normal,d));
      var r = Vector3.dot(pos,pos);
      verticies1Min = verticies1Min * (r >= verticies1Min) + r * (r < verticies1Min)
      verticies1Max = verticies1Max * (r <= verticies1Max) + r * (r > verticies1Max)
    }
    if (!((verticies0Min>= verticies1Min  && verticies0Min <=  verticies1Max) || (verticies1Min >= verticies0Min && verticies1Min <=  verticies0Max))) return false;
    return true;


  }
  static AABBintersectsOBB(aabb,obb){
    var limits = obb.limits()

    if (
      (!(aabb.left() >= limits.minx && aabb.left() <= limits.maxx) ||
    (limits.minx >= aabb.left()  && limits.minx <=  aabb.right()))
    ) return false;

    if (
      (!(aabb.bottom() >= limits.miny && aabb.bottom() <= limits.maxy) ||
    (limits.miny >= aabb.bottom()  && limits.miny <=  aabb.top()))
    ) return false;

    if (
      (!(aabb.front() >= limits.minz && aabb.front() <= limits.maxz) ||
    (limits.minz >= aabb.front()  && limits.minz <=  aabb.back()))
    ) return false;


    //Todo: seperate axis theorem;

    //var obb_verticies = obb.verticies();
    //var aabb_verticies = aabb.verticies();
    //console.log("passd")
    //if(!Collision.SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.depthVector, obb.upVector)) return false;
    //if(!Collision.SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.rightVector, obb.depthVector)) return false;
    //if(!Collision.SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.rightVector, obb.upVector)) return false;

    return true;
  } /**/


  static SphereintersectsSphere(sphere0, sphere1){
    var d = sphere0.radius + sphere1.radius;
    d = d * d;
    var l = Vector3.subtract(sphere0.center, sphere1.center).lengthSquared();
    return  l <= d;
  }

  static SphereintersectsCapsule(sphere, capsule){
    var s = new Sphere(capsule.min, capsule.radiusVector.normalize());
    if(Collision.SphereintersectsSphere(sphere, s)) return true;
    s.position = capsule.max;
    if(Collision.SphereintersectsSphere(sphere, s)) return true;

    var l = Vector3.subtract(capsule.min, capsule.max);
    var axis1 = Vector3.cross(l,Vector3.subtract(sphere.position, capsule.min))
    var axis2 = Vector3.cross(axis1,l);

    var center = Collision.rayToPerpendicularPlane(Collision.rayToPerpendicularPlane(sphere.position,capsule.min, axis1), capsule.min, axis2);

    center.x = Math.min(Math.max(Math.min(capsule.min.x,capsule.max.x), center.x), Math.max(Math.max(capsule.min.x,capsule.max.x)))
    center.y = Math.min(Math.max(Math.min(capsule.min.y,capsule.max.y), center.y), Math.max(Math.max(capsule.min.y,capsule.max.y)))
    center.z = Math.min(Math.max(Math.min(capsule.min.z,capsule.max.z), center.z), Math.max(Math.max(capsule.min.z,capsule.max.z)))
    s.position = center;
    return Collision.SphereintersectsSphere(sphere, s);

  }

  static SphereintersectsOBB(sphere, obb){
    var rsqr = sphere.radius * sphere.radius;

    var d1 = rsqr + Vector3.dot(obb.rightVector, obb.rightVector);
    var p = Collision.rayToPerpendicularPlane(Collision.rayToPerpendicularPlane(sphere.center, obb.position,obb.depthVector), obb.position, obb.upVector);
    var d2 = Vector3.subtract(sphere.center, p).lengthSquared();
    if(d2 > d1) return false;

    d1 = rSqr + Vector3.dot(obb.upVector, obb.upVector);
    p = Collision.rayToPerpendicularPlane(Collision.rayToPerpendicularPlane(sphere.center, obb.position,obb.rightVector), obb.position, obb.depthVector);
    d2 = Vector3.subtract(sphere.center, p).lengthSquared();
    if(d2 > d1) return false;

    d1 = rSqr + Vector3.dot(obb.depthVector, obb.depthVector);
    p = Collision.rayToPerpendicularPlane(Collision.rayToPerpendicularPlane(sphere.center, obb.position,obb.rightVector), obb.position, obb.upVector);
    d2 = Vector3.subtract(sphere.center, p).lengthSquared();
    if(d2 > d1) return false;

    return true;
  }
  static OBBintersectsOBB(obb1, obb2){

    var obb1_verticies = obb1.verticies();
    var obb2_verticies = obb2.verticies();

    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb1.depthVector, obb1.upVector)) return false;
    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb1.rightVector, obb1.depthVector)) return false;
    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb1.rightVector, obb1.upVector)) return false;

    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb2.depthVector, obb2.upVector)) return false;
    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb2.rightVector, obb2.depthVector)) return false;
    if(!SeperateAxisIntersection(obb1_verticies, obb2_verticies, obb2.rightVector, obb2.upVector)) return false;

    return true;
  }

  static LinecrossLine(line0, line1){

  }
  static CapsuleintersectsCapsule(capsule0, capsule1){

    //Todo:
  }

  //(point - sphere.center).(point - sphere.center) -r^2 = 0
  static RayvsSphere(ray, sphere){
    ray.direction = ray.direction.normalize();
    var a = Vector3.dot(ray.direction, ray.direction);
    var oc = Vector3.subtract(ray.position, sphere.position);
    var b = Vector3.dot(ray.direction,oc) * 2;
    var c = Vector3.dot(oc, oc) - sphere.radius * sphere.radius;
    var determinent = b*b - 4*a*c;

    switch (Math.sign(determinent)) {
      case -1:
        return {hit: false, contact: Vector3.zero()}
      case 0:
        var d = -b / 2 * a;
        return {hit: true, contact: Vector3.add(ray.position, Vector3.scale(ray.direction, d))}
      case 1:
        var oneDiv2a = 1 / 2 * a;
        var det = Math.sqrt(determinent);

        var d0 = (-b * oneDiv2a) + (det * oneDiv2a);
        var d1 = (-b * oneDiv2a) - (det * oneDiv2a);
        if(d0 >= 0 || d1 >=0){
            if(d0 < 0){
              return {hit: true, contact: Vector3.add(ray.position, Vector3.scale(ray.direction, d1))}
            }
            if(d1 < 0){
              return {hit: true, contact: Vector3.add(ray.position, Vector3.scale(ray.direction, d0))}
            }
            return {hit: true, contact: Vector3.add(ray.position, Vector3.scale(ray.direction, Math.min(d0, d1)))}
        }
        return {hit: false, normal: Vector3.zero()}
    }
  }

  // |((point - capsule.min[cyclinder.min]) . upvector) - capsule.min| -|capsule.min|| - |r1|
  // + |point - c| + (hat.up, point - top.center). (hat.up, point - top.center) -
  // (hat.up, point - top.center) - (hat.up, point - top.center) +
  // |point - c| + (butt.up, point - butt.center). (butt.down, point - butt.center) -
  // (butt.down, point - butt.center) - (butt.down, point - butt
  //.center)
  //=  0
  //
}
