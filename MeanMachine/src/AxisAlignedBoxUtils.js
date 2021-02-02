class AxisAlignedBoxUtils{
    static AABBintersectsAABB(aabb0, aabb1){
        if (Math.abs(aabb0.position.x - aabb1.position.x) > (aabb0.halfsize.x + aabb1.halfsize.x)) return false;
        if (Math.abs(aabb0.position.y - aabb1.position.y) > (aabb0.halfsize.y + aabb1.halfsize.y)) return false;
        if (Math.abs(aabb0.position.z - aabb1.position.z) > (aabb0.halfsize.z + aabb1.halfsize.z)) return false;

        return true
    }

    static AABBcontainsPoint(aabb, point){
        contains = true
        contains &&(point.x < aabb.minX())
        contains && (point.x > aabb.maxX())
        contains && (point.y < aabb.minY())
        contains && (point.y > aabb.maxY()) 
        contains && (point.x < aabb.minZ())
        contains && (point.x > aabb.maxZ())
        return contains;
    }


    

}