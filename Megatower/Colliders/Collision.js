class Collision{


  static AABBintersectsAABB(box0, box1){
    if (!((box0.left() >= box1.left()  && box0.left() <=  box1.right()) || (box1.left() >= box0.left()  && box1.left() <=  box0.right()))) return false;
    if (!((box0.bottom() >= box1.bottom()  && box0.bottom() <=  box1.top()) || (box1.bottom() >= box0.bottom()  && box1.bottom() <=  box0.top()))) return false;
    if (!((box0.front() >= box1.front()  && box0.front() <=  box1.back()) || (box1.front() >= box0.front()  && box1.front() <=  box0.back()))) return false;
    return true;
  } /**/

  static AABBintersectsSphere(box, sphere){
    var d1 = box.halfsize.x + sphere.radius;
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

    return Collision.AABBintersectsSphere(box, new Sphere(center, capsule.radius));

  } /**/
  static SeperateAxisIntersection(verticies0, verticies1, axis1normal, axis2normal){
    verticies0Min = Number.POSITIVE_INFINITY;
    verticies0Max = Number.NEGATIVE_INFINITY;
    verticies1Min = Number.POSITIVE_INFINITY;
    verticies1Max = Number.NEGATIVE_INFINITY;

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
    var obb_min_x = obb.minX();
    if (!((obb_min_x>= aabb.left() && obb.minX() <= aabb.right() ||(aabb.left()  >= obb_min_x && aabb.left() <= obb_min_x))))return false;
    var obb_min_y = obb.minY();
    if (!((obb_min_y >= aabb.bottom() && obb_min_y <= aabb.top() ||(aabb.bottom()  >= obb_min_y && aabb.bottom() <= obb_min_y)))) return false;
    var obb_min_z = obb.minZ();
    if (!((obb_min_z >= aabb.front() && obb.minZ() <= aabb.back() ||(aabb.front()  >= obb_min_z && aabb.front() <= obb_min_z)))) return false;
    //Todo: seperate axis theorem;

    var obb_verticies = obb.verticies();
    var aabb_verticies = aabb.verticies();

    if(!SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.depthVector, obb.upVector)) return false;
    if(!SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.rightVector, obb.depthVector)) return false;
    if(!SeperateAxisIntersection(aabb_verticies, obb_verticies, obb.rightVector, obb.upVector)) return false;

    return true;
  } /**/


  static SphereintersectsSphere(sphere0, sphere1){
    var d = sphere0.radius + sphere1.radius;
    d = d * d;
    var l = Vector3.subtract(sphere0.center, sphere1.center).lengthSquared();
    return  l <= d;
  }

  static SphereintersectsCapsule(sphere, capsule){
    var s = new Sphere(capsule.min, capsule.radius);
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
    var d2 = Vector3.subtract(sphere.center, p).lengthSquared());
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
