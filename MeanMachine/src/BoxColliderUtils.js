class BoxColliderUtils{
    static BoxColliderintersectsBoxCollider(box0, box1){
        return AxisAlignedBoxUtils.AABBintersectsAABB(box0.getBoundingBox(), box1.getBoundingBox());

    }
        
    static BoxColliderintersectsSlopeCollider(box, slope){
        var intersects = AxisAlignedBoxUtils.AABBintersectsAABB(box.getBoundingBox(), slope.getBoundingBox());
        var plane = slope.getPlane();
        var basepoint = Vector3.zero()

        switch(slope.type){
            case SlopeColliderType.SLOPE_010_110:
            case SlopeColliderType.SLOPE_110_111:
            case SlopeColliderType.SLOPE_111_011:
            case SlopeColliderType.SLOPE_011_010: 
                basepoint = box.getBottomPoint();
                break;
        }
        intersects = intersects && PlaneUtils.PointbelowPlane(basepoint, plane);
        
        
        return intersects;
    
    }

    static BoxColliderintersectsHeightPlaneCollider(box, hp){
        var intersecting = AxisAlignedBoxUtils.AABBintersectsAABB(box.getBoundingBox(), hp.getBoundingBox());
        var basepoint = box.getBottomPoint();
        intersecting = intersecting && PlaneUtils.PointbelowPlane(basepoint, hp.getPlane1());
        intersecting = intersecting && PlaneUtils.PointbelowPlane(basepoint, hp.getPlane2());
        return intersecting;

    }

    /**Slopes are redundant */
    /*
    static BoxCollidervsSlopeCollider(box, velocity, slope){

        switch(slope.type){
            case SlopeColliderType.SLOPE_010_110:
                return this.BoxCollidervsSlopeCollider_010_110(box, velocity, slope);
            case SlopeColliderType.SLOPE_110_111:
                return this.BoxCollidervsSlopeCollider_110_111(box, velocity, slope);
            case SlopeColliderType.SLOPE_111_011:
                return this.BoxCollidervsSlopeCollider_111_011(box, velocity, slope);
            case SlopeColliderType.SLOPE_011_010: 
                return this.BoxCollidervsSlopeCollider_011_010(box, velocity, slope);

        }
    }

    static BoxCollidervsSlopeCollider_010_110(box, velocity, slope){
        var dleftface = Number.POSITIVE_INFINITY;
        var drightface = Number.POSITIVE_INFINITY;
        var dbottomface = Number.POSITIVE_INFINITY;
        var dslopeface = Number.POSITIVE_INFINITY; 
        var dbackface = Number.POSITIVE_INFINITY;
        var dtemp = 0
        var neg_velocity = velocity.negate();
        var slope_plane = slope.getPlane();
        if(velocity.x > 0 && box.canCollideRight && slope.canCollideLeftFace){
            var start_plane = box.rightPlane();
            var target_plane = slope.leftFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    dleftface = dtemp;
                }
            }
        }
        if(velocity.x < 0 && box.canCollideLeft && slope.canCollideRightFace){
            var start_plane = box.leftPlane();
            var target_plane = slope.rightFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    drightface = dtemp;
                }
            }
        }

        if(velocity.y > 0 && box.canCollideTop && slope.canCollideBottomFace){
            var start_plane = box.topPlane();
            var target_plane = slope.bottomPlane()
            var dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane, target_plane)){
                dbottomface = dtemp
            }
        }
        if (velocity.y < 0 && box.canCollideBottom && slope.canCollideSlopeFace){
            var bottomPoint = box.getBottomPoint()

            if(PlaneUtils.PointbelowPlane(bottomPoint, slope_plane)){
                dslopeface = Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(neg_velocity, slope_plane.normal)
            }

        }

        if(velocity.z > 0 && box.canCollideBack && slope.canCollideBackFace){
            var start_plane = box.backPlane();
            var target_plane = slope.backFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                dbackface = dtemp
            }
        }
        var dmin = Math.min( Math.min(
        Math.min(dleftface, drightface), Math.min(dslopeface, dbottomface)), dbackface )
        switch (dmin){
            case Number.POSITIVE_INFINITY:
                return {direction: Vector3.zero(), speed: 0}
            case dleftface:
                return {direction: new Vector3(-1,0,0), speed: 1+ box.maxX() - slope.minX()}
            case drightface:
                return {direction: new Vector3(1,0,0), speed:1+ slope.maxX() - box.minX()}
            case dslopeface:
                var bottomPoint = box.getBottomPoint()
                var d =  Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(new Vector3(0,1,0), slope_plane.normal)
                var y = bottomPoint.y + d*1;
                if ( y > slope.maxY()){
                    d -= y- slope.maxY();
                }
                return {direction: new Vector3(0,1,0), speed: 0.1 + d};
            case dbottomface:
                return {direction: new Vector3(0,-1,0), speed: 0.1 + box.maxY() - slope.minY()}
            case dbackface:
                return {direction: new Vector3(0,0,-1), speed: 1+ box.maxZ() - slope.minZ()}
        }
    }

    static BoxCollidervsSlopeCollider_110_111(box, velocity, slope){
        var dleftface = Number.POSITIVE_INFINITY;
        var drightface = Number.POSITIVE_INFINITY;
        var dbottomface = Number.POSITIVE_INFINITY;
        var dslopeface = Number.POSITIVE_INFINITY; 
        var dbackface = Number.POSITIVE_INFINITY;
        var dtemp = 0
        var neg_velocity = velocity.negate();
        var slope_plane = slope.getPlane();

        if(velocity.z > 0 && box.canCollideBack && slope.canCollideLeftFace){
            var start_plane = box.backPlane();
            var target_plane = slope.leftFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    dleftface = dtemp;
                }
            }
        }

        if(velocity.z < 0 && box.canCollideFront && slope.canCollideRightFace){
            var start_plane = box.frontPlane();
            var target_plane = slope.rightFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    drightface = dtemp;
                }
            }
        }

        if(velocity.y > 0 && box.canCollideTop && slope.canCollideBottomFace){
            var start_plane = box.topPlane();
            var target_plane = slope.bottomPlane()
            var dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane, target_plane)){
                dbottomface = dtemp
            }
        }

        if (velocity.y < 0 && box.canCollideBottom && slope.canCollideSlopeFace){
            var bottomPoint = box.getBottomPoint()
            if(PlaneUtils.PointbelowPlane(bottomPoint, slope_plane)){
                dslopeface = Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(neg_velocity, slope_plane.normal)
            }
        }

        
        if(velocity.x < 0 && box.canCollideLeft && slope.canCollideBackFace){
            var start_plane = box.leftPlane();
            var target_plane = slope.backFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                dbackface = dtemp
            }
        }

        var dmin = Math.min( Math.min(
            Math.min(dleftface, drightface), Math.min(dslopeface, dbottomface)), dbackface )
            switch (dmin){
                case Number.POSITIVE_INFINITY:
                    return {direction: Vector3.zero(), speed: 0}
                case dleftface:
                    return {direction: new Vector3(0,0,-1), speed: 1 + box.maxZ() - slope.minZ()}
                case drightface:
                    return {direction: new Vector3(0,0,1), speed: 1 + slope.maxZ() - box.minZ()}
                case dslopeface:
                    var bottomPoint = box.getBottomPoint()
                    var d =  Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(new Vector3(0,1,0), slope_plane.normal)
                    var y = bottomPoint.y + d*1;
                    if ( y > slope.maxY()){
                        d -= y- slope.maxY();
                    }
                    

                    return {direction: new Vector3(0,1,0), speed: 0.1 + d};
                case dbottomface:
                    return {direction: new Vector3(0,-1,0), speed: 0.1 + box.maxY() - slope.minY()}
                case dbackface:
                    return {direction: new Vector3(1,0,0), speed: 1+ slope.maxX() - box.minX()}
            }


    }

    static BoxCollidervsSlopeCollider_111_011(box, velocity, slope){
        var dleftface = Number.POSITIVE_INFINITY;
        var drightface = Number.POSITIVE_INFINITY;
        var dbottomface = Number.POSITIVE_INFINITY;
        var dslopeface = Number.POSITIVE_INFINITY; 
        var dbackface = Number.POSITIVE_INFINITY;
        var dtemp = 0

        var neg_velocity = velocity.negate()
        var slope_plane = slope.getPlane();
       
        if(velocity.x > 0 && box.canCollideRight && slope.canCollideLeftFace){
            var start_plane = box.rightPlane();
            var target_plane = slope.leftFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    dleftface = dtemp;
                }
            }
        }
        if(velocity.x < 0 && box.canCollideLeft && slope.canCollideRightFace){
            var start_plane = box.leftPlane();
            var target_plane = slope.rightFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    drightface = dtemp;
                }
            }
        }

        if(velocity.y > 0 && box.canCollideTop && slope.canCollideBottomFace){
            var start_plane = box.topPlane();
            var target_plane = slope.bottomPlane()
            var dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane, target_plane)){
                dbottomface = dtemp
            }
        }
        if (velocity.y < 0 && box.canCollideBottom && slope.canCollideSlopeFace){
            var bottomPoint = box.getBottomPoint()

            if(PlaneUtils.PointbelowPlane(bottomPoint, slope_plane)){
                dslopeface = Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(neg_velocity, slope_plane.normal)
            }

        }

        if(velocity.z < 0 && box.canCollideFront && slope.canCollideBackFace){
            var start_plane = box.frontPlane();
            var target_plane = slope.backFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                dbackface = dtemp
            }
        }
        var dmin = Math.min( Math.min(
        Math.min(dleftface, drightface), Math.min(dslopeface, dbottomface)), dbackface )
        switch (dmin){
            case Number.POSITIVE_INFINITY:
                return {direction: Vector3.zero(), speed: 0}
            case dleftface:
                return {direction: new Vector3(-1,0,0), speed: 1+ box.maxX() - slope.minX()}
            case drightface:
                return {direction: new Vector3(1,0,0), speed:1+ slope.maxX() - box.minX()}
            case dslopeface:
                var bottomPoint = box.getBottomPoint()
                var d =  Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(new Vector3(0,1,0), slope_plane.normal)
                var y = bottomPoint.y + d*1;
                if ( y > slope.maxY()){
                    d -= y- slope.maxY();
                }
                return {direction: new Vector3(0,1,0), speed: 0.1 + d};
            case dbottomface:
                return {direction: new Vector3(0,-1,0), speed: 0.1 + box.maxY() - slope.minY()}
            case dbackface:
                return {direction: new Vector3(0,0,1), speed: 1+ slope.maxZ() - box.minZ()}
        }
    
    }
    
    static BoxCollidervsSlopeCollider_011_010(box, velocity, slope){
        var dleftface = Number.POSITIVE_INFINITY;
        var drightface = Number.POSITIVE_INFINITY;
        var dbottomface = Number.POSITIVE_INFINITY;
        var dslopeface = Number.POSITIVE_INFINITY; 
        var dbackface = Number.POSITIVE_INFINITY;
        var dtemp = 0
        var neg_velocity = velocity.negate();
        var slope_plane = slope.getPlane();
        
        if(velocity.z > 0 && box.canCollideBack && slope.canCollideLeftFace){
            var start_plane = box.backPlane();
            var target_plane = slope.leftFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    dleftface = dtemp;
                }
            }
        }

        if(velocity.z < 0 && box.canCollideFront && slope.canCollideRightFace){
            var start_plane = box.frontPlane();
            var target_plane = slope.rightFaceAsPlane()
            var dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane, target_plane)){
                if(PlaneUtils.PointbelowPlane(box.getBottomPoint(), slope_plane)){
                    drightface = dtemp;
                }
            }
        }

        if(velocity.y > 0 && box.canCollideTop && slope.canCollideBottomFace){
            var start_plane = box.topPlane();
            var target_plane = slope.bottomPlane()
            var dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane, target_plane)){
                dbottomface = dtemp
            }
        }

        if (velocity.y < 0 && box.canCollideBottom && slope.canCollideSlopeFace){
            var bottomPoint = box.getBottomPoint()
            if(PlaneUtils.PointbelowPlane(bottomPoint, slope_plane)){
                dslopeface = Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(neg_velocity, slope_plane.normal)
            }
        }

        
        if(velocity.x > 0 && box.canCollideRight && slope.canCollideBackFace){
            var start_plane = box.rightPlane();
            var target_plane = slope.backFaceAsPlane()
            var dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp));
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane, target_plane)){
                dbackface = dtemp
            }
        }

        var dmin = Math.min( Math.min(
            Math.min(dleftface, drightface), Math.min(dslopeface, dbottomface)), dbackface )
            switch (dmin){
                case Number.POSITIVE_INFINITY:
                    return {direction: Vector3.zero(), speed: 0}
                case dleftface:
                    return {direction: new Vector3(0,0,-1), speed: 1 + box.maxZ() - slope.minZ()}
                case drightface:
                    return {direction: new Vector3(0,0,1), speed: 1 + slope.maxZ() - box.minZ()}
                case dslopeface:
                    var bottomPoint = box.getBottomPoint()
                    var d =  Vector3.dot( Vector3.subtract(slope_plane.position, bottomPoint), slope_plane.normal) / Vector3.dot(new Vector3(0,1,0), slope_plane.normal)
                    var y = bottomPoint.y + d*1;
                    if ( y > slope.maxY()){
                        d -= y- slope.maxY();
                    }
                    

                    return {direction: new Vector3(0,1,0), speed: 0.1 + d};
                case dbottomface:
                    return {direction: new Vector3(0,-1,0), speed: 0.1 + box.maxY() - slope.minY()}
                case dbackface:
                    return {direction: new Vector3(-1,0,0), speed: 1+ box.maxX() - slope.minX()}
            }

    }
    */
    static BoxCollidervsHeightPlaneCollider(box, velocity, hpc){
        var dleft = Number.POSITIVE_INFINITY;
        var dright = Number.POSITIVE_INFINITY;
        var dbottom = Number.POSITIVE_INFINITY;
        var dtopplane1 = Number.POSITIVE_INFINITY; 
        var dtopplane2 = Number.POSITIVE_INFINITY; 
        var dfront = Number.POSITIVE_INFINITY;
        var dback = Number.POSITIVE_INFINITY;
        var dtemp = 0
        var neg_velocity = velocity.negate();

        var plane_1 = hpc.getPlane1();
        var plane_2 = hpc.getPlane2();
        if(velocity.x > 0 && box.canCollideRight && hpc.canCollideLeft){
            var bottomPoint = box.position.copy();
            bottomPoint.x += box.size.x;
            bottomPoint.z += box.size.z * 0.5;
            var target_x = hpc.minX();
            dtemp = (target_x - bottomPoint.x) / neg_velocity.x;
            bottomPoint = Vector3.add(bottomPoint, Vector3.scale(neg_velocity, dtemp));
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_1)){
                if(PlaneUtils.PointbelowPlane(bottomPoint, plane_2)){
                    dleft = dtemp;
                }
            }           
        }

        if(velocity.x < 0 && box.canCollideLeft && hpc.canCollideRight){
            var bottomPoint = box.position.copy();
            bottomPoint.z += box.size.z * 0.5;
            var target_x = hpc.maxX();
            dtemp = (target_x - bottomPoint.x) / neg_velocity.x;
            bottomPoint = Vector3.add(bottomPoint, Vector3.scale(neg_velocity, dtemp));
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_1)){
                if(PlaneUtils.PointbelowPlane(bottomPoint, plane_2)){
                    dright = dtemp;
                }
            }  
        }

        if(velocity.y > 0 && box.canCollideTop && hpc.canCollideBottom){
            var start_plane = box.topPlane();
            var target_plane = hpc.bottomPlane();
            dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity, dtemp));
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane,target_plane)){
                dbottom = dtemp
            }
        }

        if (velocity.y < 0 && box.canCollideBottom && hpc.canCollidePlane1){
            var bottomPoint = box.getBottomPoint();
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_1)){
                dtopplane1 = Vector3.dot( Vector3.subtract(plane_1.position,bottomPoint),plane_1.normal) / Vector3.dot(neg_velocity, plane_1.normal)
            }
        }

        if (velocity.y < 0 && box.canCollideBottom && hpc.canCollidePlane2){
            var bottomPoint = box.getBottomPoint();
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_2)){
                dtopplane2 = Vector3.dot( Vector3.subtract(plane_2.position,bottomPoint),plane_2.normal) / Vector3.dot(neg_velocity, plane_2.normal)
            }
        }

        if(velocity.z > 0 && box.canCollideBack && hpc.canCollideFront){
            var bottomPoint = box.position.copy();
            bottomPoint.z += box.size.z;
            bottomPoint.x += box.size.x * 0.5;
            var target_z = hpc.minZ();
            dtemp = (target_z - bottomPoint.z) / neg_velocity.z;
            bottomPoint = Vector3.add(bottomPoint, Vector3.scale(neg_velocity, dtemp));
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_1)){
                if(PlaneUtils.PointbelowPlane(bottomPoint, plane_2)){
                    dfront = dtemp;
                }
            }   
        }

        if(velocity.z < 0 && box.canCollideFront && hpc.canCollideBack){
            var bottomPoint = box.position.copy();
            bottomPoint.x += box.size.x * 0.5;
            var target_z = hpc.maxZ();
            dtemp = (target_z - bottomPoint.z) / neg_velocity.z;
            bottomPoint = Vector3.add(bottomPoint, Vector3.scale(neg_velocity, dtemp));
            if(PlaneUtils.PointbelowPlane(bottomPoint, plane_1)){
                if(PlaneUtils.PointbelowPlane(bottomPoint, plane_2)){
                    dback = dtemp;
                }
            } 
        }

        var dmin = Math.min(
            Math.min(dleft, Math.min(dright, dback)),
            Math.min(Math.min(dbottom,dtopplane1), 
            Math.min(dtopplane2,Math.min(dbottom, dfront)))
        )

        switch(dmin){
            case Number.POSITIVE_INFINITY:
                return {direction: Vector3.zero(), speed: 0}
            case dleft:
                return{direction: new Vector3(-1,0,0), speed:1 + box.maxX() - hpc.minX()}
            case dright:
                return{direction: new Vector3(1,0,0), speed: 1 + hpc.maxX() - box.minX()}
            case dbottom:
                return{direction: new Vector3(0,-1,0), speed:0.1 + box.maxY() - hpc.minY()}
            case dtopplane1:
                var bottomPoint = box.getBottomPoint()
                dtemp = Vector3.dot( Vector3.subtract(plane_1.position,bottomPoint),plane_1.normal) / Vector3.dot(new Vector3(0,1,0), plane_1.normal)
                var y = bottomPoint.y + dtemp;
                var hpc_my = hpc.maxY();
                if ( y > hpc_my){
                    dtemp = dtemp-y+ hpc_my;
                }
                
                return {direction: new Vector3(0,1,0), speed:0.1 + dtemp }
            case dtopplane2:
                var bottomPoint = box.getBottomPoint()
                dtemp = Vector3.dot( Vector3.subtract(plane_2.position,bottomPoint),plane_2.normal) / Vector3.dot(new Vector3(0,1,0), plane_2.normal)
                var y = bottomPoint.y + dtemp;
                var hpc_my = hpc.maxY();
                if ( y > hpc_my){
                    dtemp = dtemp-y+ hpc_my;
                }
                return {direction: new Vector3(0,1,0), speed:0.1 + dtemp}
            case dfront:
                return {direction: new Vector3(0,0,-1), speed: 1+ box.maxZ() - hpc.minZ()}
            case dback:

                return {direction: new Vector3(0,0,1), speed:1 + hpc.maxZ() - box.minZ()}

        }


    }

    static BoxCollidervsBoxCollider(box0, velocity, box1){
        var dleft = Number.POSITIVE_INFINITY;
        var dright = Number.POSITIVE_INFINITY;
        var dbottom = Number.POSITIVE_INFINITY;
        var dtop = Number.POSITIVE_INFINITY; 
        var dfront = Number.POSITIVE_INFINITY;
        var dback = Number.POSITIVE_INFINITY;
        var dtemp = 0
        var neg_velocity = velocity.negate();
        if(velocity.x > 0 && box0.canCollideRight && box1.canCollideLeft){
            var start_plane = box0.rightPlane();
            var target_plane = box1.leftPlane();

            dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x;
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane,target_plane)){
                dleft = dtemp
            }
        }

        if(velocity.x < 0 && box0.canCollideLeft && box1.canCollideRight){
            var start_plane = box0.leftPlane();
            var target_plane = box1.rightPlane();

            dtemp = (target_plane.position.x - start_plane.position.x) / neg_velocity.x
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))
            if(RectPlaneUtil.RectPlaneZYoverlapsRectPlaneZY(start_plane,target_plane)){
                dright = dtemp
            }
        }

        if(velocity.y > 0 && box0.canCollideTop && box1.canCollideBottom){
            var start_plane = box0.topPlane();
            var target_plane = box1.bottomPlane();

            dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))

            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane,target_plane)){
                dbottom = dtemp
            }
        }

        if(velocity.y < 0 && box0.canCollideBottom && box1.canCollideTop){
            var start_plane = box0.bottomPlane();
            var target_plane = box1.topPlane();

            dtemp = (target_plane.position.y - start_plane.position.y) / neg_velocity.y
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))
            if(RectPlaneUtil.RectPlaneXZoverlapsRectPlaneXZ(start_plane,target_plane)){
                dtop = dtemp
            }
        }

        if(velocity.z > 0 && box0.canCollideBack && box1.canCollideFront){
            var start_plane = box0.backPlane();
            var target_plane = box1.frontPlane();

            dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z

            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane,target_plane)){
                dfront = dtemp
            }
        }

        if (velocity.z < 0 && box0.canCollideFront && box1.canCollideBack){
            var start_plane = box0.frontPlane();
            var target_plane = box1.backPlane();

            dtemp = (target_plane.position.z - start_plane.position.z) / neg_velocity.z
            start_plane.position = Vector3.add(start_plane.position, Vector3.scale(neg_velocity,dtemp))
            if(RectPlaneUtil.RectPlaneXYoverlapsRectPlaneXY(start_plane,target_plane)){
                dback = dtemp
            }
        }

        var dmin = Math.min(Math.min(dleft, dright), 
        Math.min(Math.min(dbottom, dtop), 
        Math.min(dfront,dback)));

        switch(dmin){
            case Number.POSITIVE_INFINITY: 
                return {direction: Vector3.zero(), speed: 0}  
            case dleft:
                return {direction: new Vector3(-1, 0,0), speed:1+ box0.maxX() - box1.minX()};
            case dright:
                return {direction: new Vector3(1, 0,0), speed:1+ box1.maxX() - box0.minX()};
            case dbottom:
                return {direction: new Vector3(0, -1,0), speed: 0.1+ box0.maxY() - box1.minY()};
            case dtop:
                return {direction: new Vector3(0, 1,0), speed:0.1+ box1.maxY() - box0.minY()};
            case dfront:
                return {direction: new Vector3(0, 0,-1), speed:1+ box0.maxZ() - box1.minZ()};
            case dback:
                return {direction: new Vector3(0, 0,1), speed:1+ box1.maxZ() - box0.minZ()};
        }
        return {direction: Vector3.zero(), speed: 0};

    }
}