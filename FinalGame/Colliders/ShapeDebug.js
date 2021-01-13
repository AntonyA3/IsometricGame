class ShapeDebug {
  constructor() {

  }

  static drawAABB(box, ctx, color){
    var c = box.verticies();
    for(var i = 0; i < c.length; i++){
      c[i] = c[i].toIsometric();
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(c[0].x, c[0].y);
    ctx.lineTo(c[1].x, c[1].y);
    ctx.lineTo(c[2].x, c[2].y);
    ctx.lineTo(c[3].x, c[3].y);
    ctx.lineTo(c[0].x, c[0].y);

    ctx.moveTo(c[4].x, c[4].y)
    ctx.lineTo(c[5].x, c[5].y)
    ctx.lineTo(c[6].x, c[6].y)
    ctx.lineTo(c[7].x, c[7].y)
    ctx.lineTo(c[4].x, c[4].y)

    ctx.moveTo(c[0].x, c[0].y)
    ctx.lineTo(c[4].x, c[4].y)

    ctx.moveTo(c[1].x, c[1].y)
    ctx.lineTo(c[5].x, c[5].y)

    ctx.moveTo(c[2].x, c[2].y)
    ctx.lineTo(c[6].x, c[6].y)

    ctx.moveTo(c[3].x, c[3].y)
    ctx.lineTo(c[7].x, c[7].y)

    ctx.stroke();
  }

  static drawCapsule(capsule, ctx, color){
    ShapeDebug.drawSphere(new Sphere(capsule.min,capsule.radiusVector.length()), ctx, color);
    ShapeDebug.drawSphere(new Sphere(capsule.max,capsule.radiusVector.length()), ctx, color);

    ctx.strokeStyle = color;
    var minI = capsule.min.toIsometric();
    var maxI = capsule.max.toIsometric();
    ctx.beginPath();
    ctx.moveTo(minI.x, minI.y);
    ctx.lineTo(maxI.x, maxI.y);
    ctx.stroke();

  }

  static drawOBB(box, ctx, color){
    var c = box.verticies();
    for(var i = 0; i < c.length; i++){
      c[i] = c[i].toIsometric();
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(c[0].x, c[0].y);
    ctx.lineTo(c[1].x, c[1].y);

    ctx.lineTo(c[2].x, c[2].y);
    ctx.lineTo(c[3].x, c[3].y);
    ctx.lineTo(c[0].x, c[0].y);

    ctx.moveTo(c[4].x, c[4].y)
    ctx.lineTo(c[5].x, c[5].y)
    ctx.lineTo(c[6].x, c[6].y)
    ctx.lineTo(c[7].x, c[7].y)
    ctx.lineTo(c[4].x, c[4].y)

    ctx.moveTo(c[0].x, c[0].y)
    ctx.lineTo(c[4].x, c[4].y)

    ctx.moveTo(c[1].x, c[1].y)
    ctx.lineTo(c[5].x, c[5].y)

    ctx.moveTo(c[2].x, c[2].y)
    ctx.lineTo(c[6].x, c[6].y)

    ctx.moveTo(c[3].x, c[3].y)
    ctx.lineTo(c[7].x, c[7].y)
    ctx.stroke();
  }

  static drawSphere(sphere, ctx, color){
      ctx.strokeStyle = color;
      ctx.beginPath();
      for(var i = 0; i < 10; i++){
        var angle0 = 2 * Math.PI * i / 10
        var angle1 = 2 * Math.PI * (i +1) / 10
        var p0 = Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(Math.cos(angle0),0,Math.sin(angle0)),
            sphere.radius)).toIsometric();
        var p1 =  Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(Math.cos(angle1),0,Math.sin(angle1)),
            sphere.radius)).toIsometric();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);

        var p0 = Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(Math.cos(angle0),Math.sin(angle0),0),
            sphere.radius)).toIsometric();
        var p1 =  Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(Math.cos(angle1),Math.sin(angle1),0),
            sphere.radius)).toIsometric();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);

        var p0 = Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(0,Math.cos(angle0),Math.sin(angle0)),
            sphere.radius)).toIsometric();
        var p1 =  Vector3.add(sphere.position,
          Vector3.scale(
            new Vector3(0,Math.cos(angle1),Math.sin(angle1)),
            sphere.radius)).toIsometric();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
      }
      ctx.stroke();
  }

}
