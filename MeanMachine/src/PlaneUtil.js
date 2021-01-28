class PlaneUtil{
    static PlaneXYoverlapsPlaneXY(plane0, plane1){
        if(plane0.position.z != plane1.position.z) return false
        if (Math.abs(plane0.position.y - plane1.position.y) > Math.abs(plane0.direction.y + plane1.direction.y)) return false;
        if (Math.abs(plane0.position.x - plane1.position.x) > Math.abs(plane0.direction.x + plane1.direction.x)) return false;
        return true;
    }

    static PlaneZYoverlapsPlaneZY(plane0, plane1){
        if(plane0.position.x != plane1.position.x) return false
        if (Math.abs(plane0.position.y - plane1.position.y) > Math.abs(plane0.direction.y + plane1.direction.y)) return false;
        if (Math.abs(plane0.position.z - plane1.position.z) > Math.abs(plane0.direction.z + plane1.direction.z)) return false;
        return true;

    }
    
    static PlaneXZoverlapsPlaneXZ(plane0, plane1){
        if(plane0.position.y != plane1.position.y) return false
        if (Math.abs(plane0.position.y - plane1.position.y) > Math.abs(plane0.direction.y + plane1.direction.y)) return false;
        if (Math.abs(plane0.position.z - plane1.position.z) > Math.abs(plane0.direction.z + plane1.direction.z)) return false;
        return true;
    }   

}