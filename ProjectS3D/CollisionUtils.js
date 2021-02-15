class CollisionUtils{
    
    static AABBintersectsAABB(aabb0, aabb1){
        if (Math.abs(aabb0.position.x - aabb1.position.x) > (aabb0.halfsize.x + aabb1.halfsize.x)) return false;
        if (Math.abs(aabb0.position.y - aabb1.position.y) > (aabb0.halfsize.y + aabb1.halfsize.y)) return false;
        if (Math.abs(aabb0.position.z - aabb1.position.z) > (aabb0.halfsize.z + aabb1.halfsize.z)) return false;
        return true;
    }

    //Works but not useful
    static OBBcontainsPoint(obb, point){
        var xsqr = obb.iVector.lengthSquared();
        var ysqr = obb.jVector.lengthSquared();
        var zsqr = obb.kVector.lengthSquared();

        var planex  =new Plane(obb.position, obb.iVector.normalize());
        var planey = new Plane(obb.position, obb.jVector.normalize());
        var planez = new Plane(obb.position, obb.kVector.normalize());

        var dx = this.PointToPlaneDistance(point, planex);
        dx = dx * dx;
        var dy = this.PointToPlaneDistance(point, planey);
        dy = dy * dy;
        var dz = this.PointToPlaneDistance(point, planez);
        dz = dz * dz;

        if(dx > xsqr) return false;
        if(dy > ysqr) return false;
        if(dz > zsqr) return false;

        return true;


    }

    static AABBintersectsTerrainBox(aabb, terrainBox){
        var taabb = terrainBox.aabb();
        if(!this.AABBintersectsAABB(aabb, taabb)) return false;
        var bottomPoint = aabb.position.copy();
        bottomPoint.y -= aabb.halfsize.y;
        var plane = terrainBox.plane0();
        if(!this.PointBelowPlane(bottomPoint, plane) ) return false;
        var plane= terrainBox.plane1();
        if(!this.PointBelowPlane(bottomPoint, plane) ) return false;

        return true;


    }

    static AABBintersectsBoxplane(aabb, boxPlane){
        if(!this.AABBintersectsAABB(aabb, boxPlane.aabb())) return false;
        var verticies = aabb.verticies();
        for(var i = 0; i < verticies.length; i++){
            if ( this.PointBelowPlane(verticies[i],boxPlane.plane())) return true;
        }
        return false
    }


    static VelocityDistanceToPlane(point, plane, velocity){
        var n = plane.normal;
        var x0 = plane.position;
        var d = Vector3.dot(n, Vector3.subtract(x0,point)) / Vector3.dot(velocity, n);
        return d;
    }
    static PointToPlaneDistance(point, plane){
        var n = plane.normal;
        var x0 = plane.position;
        var d = Vector3.dot(n, Vector3.subtract(x0,point)) / Vector3.dot(n, n);
        return Math.abs(d);
    }

    static PointBelowPlane(point, plane){
        var n = plane.normal;
        var x0 = plane.position;
        var d = Vector3.dot(n, Vector3.subtract(x0,point)) / Vector3.dot(n, n);

        return (d >= 0);
    }
}