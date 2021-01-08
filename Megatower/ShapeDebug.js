class ShapeDebug {
  static debug_AA_Box(box,ctx, color){
    ctx.strokeStyle = color
    var c = box.verticies();
    for(var i = 0; i < c.length; i++){
      c[i] = c[i].toIsometric();
    }
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

  static debug_AA_Slope(slope,ctx, color){
    ctx.strokeStyle = color
    var c = slope.verticies();
    for(var i = 0; i < c.length; i++){
      c[i] = c[i].toIsometric();
    }
    ctx.beginPath();

    ctx.moveTo(c[0].x,c[0].y);
    ctx.lineTo(c[1].x,c[1].y);
    ctx.lineTo(c[2].x,c[2].y);
    ctx.lineTo(c[0].x,c[0].y);

    ctx.moveTo(c[3].x,c[3].y);
    ctx.lineTo(c[4].x,c[4].y);
    ctx.lineTo(c[5].x,c[5].y);
    ctx.lineTo(c[3].x,c[3].y);

    ctx.moveTo(c[0].x,c[0].y);
    ctx.lineTo(c[3].x,c[3].y);

    ctx.moveTo(c[1].x,c[1].y);
    ctx.lineTo(c[4].x,c[4].y);

    ctx.moveTo(c[2].x,c[2].y);
    ctx.lineTo(c[5].x,c[5].y);

    ctx.stroke();

  }

  static debug_AA_Plane(plane, ctx, color){
    ctx.strokeStyle = color
    var c = plane.verticies();

    for(var i = 0; i < c.length; i++){
      c[i] = c[i].toIsometric();
    }
    ctx.beginPath();
    ctx.moveTo(c[0].x, c[0].y);
    ctx.lineTo(c[1].x, c[1].y);
    ctx.lineTo(c[2].x, c[2].y);
    ctx.lineTo(c[3].x, c[3].y);
    ctx.lineTo(c[0].x, c[0].y);
    ctx.stroke();
  }

  static debug_AA_Rect(rect, ctx, color){
    ctx.strokeStyle = color
    var c = rect.verticies();

    ctx.beginPath();
    ctx.moveTo(c[0].x, c[0].y);
    ctx.lineTo(c[1].x, c[1].y);
    ctx.lineTo(c[2].x, c[2].y);
    ctx.lineTo(c[3].x, c[3].y);
    ctx.lineTo(c[0].x, c[0].y);
    ctx.stroke();
  }
}
