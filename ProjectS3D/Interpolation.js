class Interpolation{

    static lerpFloat(start, target, duration, time){
        return start +  ((target - start) * (time/ duration))
 
    }

    static lerpVector2(start, target, duration, time){
        return Vector2.add(start,
             Vector2.scale(
                 Vector2.subtract(target, start),
                 time / duration)
            );
    }

    static lerpRect(start, target, duration, time){
        var rect = Rect.empty();
        rect.x = start.x +  ((target.x - start.x) * (time/ duration))
        rect.y = start.y +  ((target.y - start.y) * (time/ duration))
        rect.sx = start.sx +  ((target.sx - start.sx) * (time/ duration))
        rect.sy = start.sy +  ((target.sy - start.sy) * (time/ duration))
        return rect;

    }

    static lerpFloatEaseInOut(start,target, p1, p2, duration, time){
        var t = time / duration
        var onent = (1 - t);
        var p0 = 0;
        var p3 = 1
        t = onent * onent * onent * p0 + 
        3 * p1 * onent * onent * t +
        3 * onent * t * t * p2+
        t * t * t * p3
        return start + ((target - start) * t)
    }


    static qerpFloat(start, target, duration, time){
        time = time / duration;
        return start +  ((target - start) * (time*time))
 
    }

    
}