class CollisionUtils{
    static COLLISION_EPSION_HORIZONTAL = 0.5;
    static COLLISION_EPSION_VERTICLE = 0.1;

    static AABBintersectsAABB(aabb0, aabb1){
        if (Math.abs(aabb0.position.x - aabb1.position.x) > (aabb0.halfsize.x + aabb1.halfsize.x)) return false;
        if (Math.abs(aabb0.position.y - aabb1.position.y) > (aabb0.halfsize.y + aabb1.halfsize.y)) return false;
        if (Math.abs(aabb0.position.z - aabb1.position.z) > (aabb0.halfsize.z + aabb1.halfsize.z)) return false;
        return true
    }


    static BoxColliderintersectsBoxCollider(box0, box1){
        return this.AABBintersectsAABB(box0.getBoundingBox(), box1.getBoundingBox())

    }

    static AABBintersectsSlope(aabb, slope){

        if(!CollisionUtils.AABBintersectsAABB(aabb, slope.asAxisAlignedBox())) return false;
        var bottomPoint = aabb.position.copy();
        bottomPoint.y -= aabb.halfsize.y;
        if(!CollisionUtils.isBelowPlane(bottomPoint, slope.getSlopeNormal(),slope.position)) return false;
       
        return true;
        
    }
    
    static isBelowPlane(point, planeNormal, planePoint){
        var d = Vector3.dot(Vector3.subtract(point, planePoint),planeNormal) /
        Vector3.dot(planeNormal,planeNormal);
        return (d <= 0);
    }

    static raydistancePlaneZY(ray_start, ray_direction, plane_zy){
        var denom = Vector3.dot(ray_direction, plane_zy.normal)
        if (denom == 0){
            return Number.MAX_SAFE_INTEGER;
        }
        var d = Vector3.dot(plane_zy.normal, Vector3.subtract(plane_zy.min, ray_start))/
        denom
        if(d < 0) return Number.MAX_SAFE_INTEGER;

        var pos = Vector3.add(ray_start, Vector3.scale(ray_direction, d));
        if(pos.x < plane_zy.minX) return Number.MAX_SAFE_INTEGER;
        if(pos.x > plane_zy.maxX) return Number.MAX_SAFE_INTEGER;
        if(pos.y < plane_zy.minY) return Number.MAX_SAFE_INTEGER;
        if(pos.y > plane_zy.maxY) return Number.MAX_SAFE_INTEGER;
        return d;

    }

    


    static BoxColldervsBoxCollider(box0, velocity, box1){
        var negVelocity = velocity.negate();
        var dleft = Number.POSITIVE_INFINITY;
        var dright = Number.POSITIVE_INFINITY;
        var dbottom  = Number.POSITIVE_INFINITY;
        var dtop  = Number.POSITIVE_INFINITY;
        var dfront  = Number.POSITIVE_INFINITY;
        var dback  = Number.POSITIVE_INFINITY;

        if(velocity.x > 0 && box0.canright && box1.canleft ){
            var startPlane = box0.rightPlane();
            var targetPlane = box1.leftPlane();
            var d  = (targetPlane.position.x - startPlane.position.x) / negVelocity.x
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            
            if(PlaneUtil.PlaneZYoverlapsPlaneZY(startPlane, targetPlane)){
                dleft = d;
            }
        }

        if(velocity.x < 0 && box0.canleft && box1.canright){
            var startPlane = box0.leftPlane();
            var targetPlane = box1.rightPlane();
            var d  = (targetPlane.position.x - startPlane.position.x) / negVelocity.x
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(PlaneUtil.PlaneZYoverlapsPlaneZY(startPlane, targetPlane)){
                dright = d;
            }
        }

        if(velocity.y > 0 && box0.cantop && box1.canbottom){
            var startPlane = box0.topPlane();
            var targetPlane = box1.bottomPlane();
            var d  = (targetPlane.position.y - startPlane.position.y) / negVelocity.y
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(PlaneUtil.PlaneXZoverlapsPlaneXZ(startPlane, targetPlane)){
                dbottom = d;
            }
        }

        if(velocity.y < 0 && box0.canbottom && box1.cantop){
            var startPlane = box0.bottomPlane();
            var targetPlane = box1.topPlane();
            var d  = (targetPlane.position.y - startPlane.position.y) / negVelocity.y
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            if(PlaneUtil.PlaneXZoverlapsPlaneXZ(startPlane, targetPlane)){
                dtop = d;
            }
        }


        if(velocity.z > 0 && box0.canback && box1.canfront){
            var startPlane = box0.backPlane();
            var targetPlane = box1.frontPlane();
            var d  = (targetPlane.position.z - startPlane.position.z) / negVelocity.z
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            if(PlaneUtil.PlaneXYoverlapsPlaneXY(startPlane, targetPlane)){
                dfront = d;
            }
        }

        if(velocity.z < 0 && box0.canfront && box1.canback){
            var startPlane = box0.frontPlane();
            var targetPlane = box1.backPlane();
            var d  = (targetPlane.position.z - startPlane.position.z) / negVelocity.z
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(PlaneUtil.PlaneXYoverlapsPlaneXY(startPlane, targetPlane)){
                dback = d;
            }
        }

        var min_d = Math.min(Math.min(dleft, dright),
            Math.min(Math.min(dbottom, dtop),
            Math.min(dback, dfront)));
        switch(min_d){
            case Number.POSITIVE_INFINITY:
                return {normal: Vector3.zero(), depth: 0}
            case dleft:
                return {normal: new Vector3(-1,0,0), depth: this.COLLISION_EPSION_HORIZONTAL+ aabb0.maxX() - aabb1.minX()}
            case dright:
                return {normal: new Vector3(1,0,0), depth: this.COLLISION_EPSION_HORIZONTAL+ aabb1.maxX()- aabb0.minX()}
            case dbottom:
                return {normal: new Vector3(0,-1,0), depth:this.COLLISION_EPSION_VERTICLE +aabb0.maxY() - aabb1.minY()}
            case dtop:
                return {normal: new Vector3(0,1,0), depth:this.COLLISION_EPSION_VERTICLE + aabb1.maxY()- aabb0.minY()  }
            case dfront:
                return {normal: new Vector3(0,0,-1), depth:this.COLLISION_EPSION_HORIZONTAL+ aabb0.maxZ() - aabb1.minZ()}
            case dback:
                return {normal: new Vector3(0,0,1), depth: this.COLLISION_EPSION_HORIZONTAL + aabb1.maxZ()- aabb0.minZ()}

        }
        return {normal: Vector3.zero(), depth: 0}

    }
  
    static BoxCollidervsSlopeCollider(box, velocity, slope){
        switch(slope.type){

        }
    }

    static BoxCollidervsCutboxCollider (box, velocity, cutbox){
        switch(cutbox.type){

        }
    }


    static BoxCollidervsCornerBoxCollider(box, velocity, cornerbox){
        switch(cornerbox.type){

        }
    }

  
    static AABBvsSlope(aabb, velocity, slope){
        var slope_normal = slope.getSlopeNormal();
        var negVelocity = velocity.negate();
        var slope_as_aabb = slope.asAxisAlignedBox();
        var dleftface = Number.POSITIVE_INFINITY;
        var drightface = Number.POSITIVE_INFINITY;

        var dslopeface = Number.POSITIVE_INFINITY;
        var dbottomface = Number.POSITIVE_INFINITY;
        var dbackface = Number.POSITIVE_INFINITY;
        

        var back_face_predicate = false;
        var start_plane = undefined;
        var target_plane = undefined
        var d = 0;
        switch(slope.type){
            case Slope_Type.DX_DY:
                back_face_predicate = (velocity.x < 0)
                if(back_face_predicate){
                    start_plane  = aabb.leftPlane();
                    target_plane = slope_as_aabb.rightPlane()
                    d  = (target_plane.position.x - start_plane.position.x) / negVelocity.x
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneZYoverlapsPlaneZY(start_plane, target_plane)){
                        dbackface = d;
                    }
                }
                break;
            case Slope_Type.NDX_DY:
                back_face_predicate = (velocity.x > 0)
                if (back_face_predicate){
                    start_plane  = aabb.rightPlane();
                    target_plane = slope_as_aabb.leftPlane()
                    d  = (target_plane.position.x - start_plane.position.x) / negVelocity.x
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneZYoverlapsPlaneZY(start_plane, target_plane)){
                        dbackface = d;
                    }
                }
                break;   
            case Slope_Type.DZ_DY:
                back_face_predicate = (velocity.z < 0)
                if(back_face_predicate){
                    start_plane = aabb.frontPlane();
                    target_plane = slope_as_aabb.backPlane();
                    d  = (target_plane.position.z - start_plane.position.z) / negVelocity.z
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneXYoverlapsPlaneXY(start_plane, target_plane)){
                        dbackface = d;
                    }
                }
                break;
            case Slope_Type.NDZ_DY:
                back_face_predicate = (velocity.z > 0)
                if(back_face_predicate){
                    start_plane = aabb.backPlane();
                    target_plane = slope_as_aabb.frontPlane();
                    d  = (target_plane.position.z - start_plane.position.z) / negVelocity.z
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneXYoverlapsPlaneXY(start_plane, target_plane)){
                        dbackface = d;
                    }
                }
                
                break;
        }


        var slope_face_predicate  = false;
        switch(slope.type){
            case Slope_Type.DX_DY:
            case Slope_Type.NDX_DY:
            case Slope_Type.DZ_DY:
            case Slope_Type.NDZ_DY:
                slope_face_predicate = (velocity.y < 0);
                break;
        }

        if(slope_face_predicate){
            var bottomPoint = aabb.position.copy();
                bottomPoint.y -= aabb.halfsize.y;
            var d = Vector3.dot(Vector3.subtract(slope.position,bottomPoint), slope_normal) /
                Vector3.dot(negVelocity, slope_normal);
                dslopeface = d;

        }


        var bottom_face_predicate = false;
        switch(slope.type){
            case Slope_Type.DX_DY:
            case Slope_Type.NDX_DY:
            case Slope_Type.DZ_DY:
            case Slope_Type.NDZ_DY:
                bottom_face_predicate = (velocity.y > 0)
                start_plane = aabb.topPlane();
                target_plane = slope_as_aabb.bottomPlane();
                d  = (target_plane.position.y - start_plane.position.y) / negVelocity.y
                break;
        }
        if(bottom_face_predicate){
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
            if(CollisionUtils.PlaneXZoverlapsPlaneXZ(start_plane, target_plane)){
                dbottomface = d;
            }
        }

        var left_face_predicate = false;
        switch(slope.type){
            case Slope_Type.DX_DY:
            case Slope_Type.NDX_DY:
                left_face_predicate = (velocity.z > 0)
                if(left_face_predicate){
                    start_plane = aabb.backPlane();
                    target_plane = slope_as_aabb.frontPlane();
                    d  = (target_plane.position.z - start_plane.position.z) / negVelocity.z
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneXYoverlapsPlaneXY(start_plane, target_plane)){
                        dleftface = d;

                    }
                }
                break;
            case Slope_Type.DZ_DY:
            case Slope_Type.NDZ_DY:
                left_face_predicate = (velocity.x > 0)
                if(left_face_predicate){
                    start_plane = aabb.rightPlane();
                    target_plane = slope_as_aabb.leftPlane();
                    d  = (target_plane.position.x - start_plane.position.x) / negVelocity.x
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneZYoverlapsPlaneZY(start_plane, target_plane)){
                        dleftface = d;
                    }
                }
               break;
        }

        var right_face_predicate = false;
        switch(slope.type){
            case Slope_Type.DX_DY:
            case Slope_Type.NDX_DY:
                right_face_predicate = (velocity.z < 0)
                if (right_face_predicate){
                    start_plane = aabb.frontPlane();
                    target_plane = slope_as_aabb.backPlane();
                    d  = (target_plane.position.z - start_plane.position.z) / negVelocity.z    
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneXYoverlapsPlaneXY(start_plane, target_plane)){
                        drightface = d;
                    }
                }
               break;
            case Slope_Type.DZ_DY:
            case Slope_Type.NDZ_DY:
                right_face_predicate = (velocity.x < 0)
                if(right_face_predicate){
                    start_plane = aabb.leftPlane();
                    target_plane = slope_as_aabb.rightPlane();
                    d  = (target_plane.position.x - start_plane.position.x) / negVelocity.x
                    start_plane.position = Vector3.add(start_plane.position, Vector3.scale(negVelocity,d));
                    if(CollisionUtils.PlaneZYoverlapsPlaneZY(start_plane, target_plane)){
                        drightface = d;
                    }
                }
                break;
        }
        



        var min_d =Math.min( 
            Math.min(Math.min(dslopeface, dbackface), Math.min(dbottomface,dleftface)), drightface);

        switch(min_d){
            case Number.POSITIVE_INFINITY:
                return {normal: Vector3.zero(), depth:0}
            case dslopeface:
                switch(slope.type){
                    case Slope_Type.DX_DY:
                    case Slope_Type.NDX_DY:
                    case Slope_Type.DZ_DY:
                    case Slope_Type.NDZ_DY:
                        normal = new Vector3(0,1,0)

                        var bottomPoint = aabb.position.copy();
                        bottomPoint.y -= aabb.halfsize.y;
                        var d = Vector3.dot(Vector3.subtract(slope.position,bottomPoint), slope_normal) /
                        Vector3.dot(slope_normal, new Vector3(0,1,0))

                        var point = Vector3.add(bottomPoint, Vector3.scale(new Vector3(0,1,0),d));
                        point.y = Math.min(point.y,slope_as_aabb.position.y + slope_as_aabb.halfsize.y)

                        var depth = Math.abs(point.y - bottomPoint.y)
                }
                
                return{normal: normal, depth: depth}
            case dbackface:
                var normal = Vector3.zero();
                var depth = 0;
                switch(slope.type){
                    case Slope_Type.DX_DY:
                        normal = new Vector3(1,0,0);
                        depth = this.COLLISION_EPSION_HORIZONTAL +slope_as_aabb.maxX() - aabb.minX()
                        break;
                    case Slope_Type.NDX_DY:
                        normal = new Vector3(-1,0,0);
                        depth = this.COLLISION_EPSION_HORIZONTAL +aabb.maxX() - slope_as_aabb.minX()
                        break;
                    case Slope_Type.DZ_DY:
                        normal = new Vector3(0,0,1);
                        depth = this.COLLISION_EPSION_HORIZONTAL +slope_as_aabb.maxZ() - aabb.minZ()
                        break;
                    case Slope_Type.NDZ_DY:
                        normal = new Vector3(0,0,-1);
                        depth =  this.COLLISION_EPSION_HORIZONTAL +aabb.maxZ() - slope_as_aabb.minZ()
                        break;
    
    


                    }
                return {normal: normal, depth: depth};

            case dleftface:
                var normal = Vector3.zero();
                var depth = 0;
                switch(slope.type){
                    case Slope_Type.DX_DY:
                    case Slope_Type.NDX_DY:
                        normal = new Vector3(0,0,-1);
                        depth = this.COLLISION_EPSION_HORIZONTAL + aabb.maxZ() - slope_as_aabb.minZ();
                        break;                    
                    case Slope_Type.DZ_DY:
                    case Slope_Type.NDZ_DY:
                        normal = new Vector3(-1,0,0);
                        depth = this.COLLISION_EPSION_HORIZONTAL + aabb.maxX() - slope_as_aabb.minX();            
                        break;
                }
                return  {normal: normal,  depth: depth};

            case drightface:
                var normal = Vector3.zero();
                var depth = 0;
                switch(slope.type){
                    case Slope_Type.DX_DY:
                    case Slope_Type.NDX_DY:
                        normal = new Vector3(0,0,1);
                        depth = this.COLLISION_EPSION_HORIZONTAL + slope_as_aabb.maxZ() - aabb.minZ();
                        break;
                    case Slope_Type.DZ_DY:
                    case Slope_Type.NDZ_DY:
                        normal = new Vector3(1,0,0);
                        depth = this.COLLISION_EPSION_HORIZONTAL + slope_as_aabb.maxX() - aabb.minX();
                        break;
                }
                return  {normal: normal, depth: depth}
        }

    }


    



    static BoxCollidervsBoxCollider(){

    }

    static SlopeColliderveSlopeCollider(){
    }

    static AABBvsAABB(aabb0, velocity,aabb1, canleft = true, canright = true, canbottom = true, cantop = true, canfront = true, canback = true){
     
        var negVelocity = velocity.negate();


        var dleft = Number.POSITIVE_INFINITY;
        var dright = Number.POSITIVE_INFINITY;
        var dbottom  = Number.POSITIVE_INFINITY;
        var dtop  = Number.POSITIVE_INFINITY;
        var dfront  = Number.POSITIVE_INFINITY;
        var dback  = Number.POSITIVE_INFINITY;

        if(velocity.x > 0 && canleft){
            var startPlane = aabb0.rightPlane();
            var targetPlane = aabb1.leftPlane();
            var d  = (targetPlane.position.x - startPlane.position.x) / negVelocity.x
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            
            if(CollisionUtils.PlaneZYoverlapsPlaneZY(startPlane, targetPlane)){
                dleft = d;
            }
        }

        if(velocity.x < 0 && canright){
            var startPlane = aabb0.leftPlane();
            var targetPlane = aabb1.rightPlane();
            var d  = (targetPlane.position.x - startPlane.position.x) / negVelocity.x
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(CollisionUtils.PlaneZYoverlapsPlaneZY(startPlane, targetPlane)){
                dright = d;
            }
        }

        if(velocity.y > 0 && canbottom){
            var startPlane = aabb0.topPlane();
            var targetPlane = aabb1.bottomPlane();
            var d  = (targetPlane.position.y - startPlane.position.y) / negVelocity.y
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(CollisionUtils.PlaneXZoverlapsPlaneXZ(startPlane, targetPlane)){
                dbottom = d;
            }
        }

        if(velocity.y < 0 && cantop){
            var startPlane = aabb0.bottomPlane();
            var targetPlane = aabb1.topPlane();
            var d  = (targetPlane.position.y - startPlane.position.y) / negVelocity.y
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            if(CollisionUtils.PlaneXZoverlapsPlaneXZ(startPlane, targetPlane)){
                dtop = d;
            }
        }


        if(velocity.z > 0 && canfront){
            var startPlane = aabb0.backPlane();
            var targetPlane = aabb1.frontPlane();
            var d  = (targetPlane.position.z - startPlane.position.z) / negVelocity.z
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));
            if(CollisionUtils.PlaneXYoverlapsPlaneXY(startPlane, targetPlane)){
                dfront = d;
            }
        }

        if(velocity.z < 0 && canback){
            var startPlane = aabb0.frontPlane();
            var targetPlane = aabb1.backPlane();
            var d  = (targetPlane.position.z - startPlane.position.z) / negVelocity.z
            startPlane.position = Vector3.add(startPlane.position, Vector3.scale(negVelocity,d));

            if(CollisionUtils.PlaneXYoverlapsPlaneXY(startPlane, targetPlane)){
                dback = d;
            }
        }

        var min_d = Math.min(Math.min(dleft, dright),
            Math.min(Math.min(dbottom, dtop),
            Math.min(dback, dfront)));
     
        


        switch(min_d){
            case Number.POSITIVE_INFINITY:
                return {normal: Vector3.zero(), depth: 0}
            case dleft:
                return {normal: new Vector3(-1,0,0), depth: this.COLLISION_EPSION_HORIZONTAL+ aabb0.maxX() - aabb1.minX()}
            case dright:
                return {normal: new Vector3(1,0,0), depth: this.COLLISION_EPSION_HORIZONTAL+ aabb1.maxX()- aabb0.minX()}
            case dbottom:
                return {normal: new Vector3(0,-1,0), depth:this.COLLISION_EPSION_VERTICLE +aabb0.maxY() - aabb1.minY()}
            case dtop:
                return {normal: new Vector3(0,1,0), depth:this.COLLISION_EPSION_VERTICLE + aabb1.maxY()- aabb0.minY()  }
            case dfront:
                return {normal: new Vector3(0,0,-1), depth:this.COLLISION_EPSION_HORIZONTAL+ aabb0.maxZ() - aabb1.minZ()}
            case dback:
                return {normal: new Vector3(0,0,1), depth: this.COLLISION_EPSION_HORIZONTAL + aabb1.maxZ()- aabb0.minZ()}

        }
        return {normal: Vector3.zero(), depth: 0}

    }
}