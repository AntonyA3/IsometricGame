class PlaneUtils{
    
    static PointbelowPlane(point,plane){
        var t = Vector3.dot(plane.normal, Vector3.subtract(plane.position, point)) /
        Vector3.dot(plane.normal, plane.normal)
        return (t >= 0)
        
    } 

    static DistanceToPlane(point,plane){
        var t = Vector3.dot(plane.normal, Vector3.subtract(plane.position, point)) /
        Vector3.dot(plane.normal, plane.normal)
        return t;
        
    } 

}