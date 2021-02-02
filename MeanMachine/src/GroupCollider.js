class GroupCollider{
    constructor(){
        this.testBox = AxisAlignedBox.empty()
        this.box_colliders = [];
        this.heightplane_colliders = [];
        this.group_colliders = [];
    }

    getIntersectingWithBoxCollider(boxCollider){
        var box_intersecting = [];
        var heightplane_intersecting = [];
        if(AxisAlignedBoxUtils.AABBintersectsAABB(boxCollider.getBoundingBox(),this.testBox)){
            for(var i = 0; i < this.box_colliders.length; i++){
                if (BoxColliderUtils.BoxColliderintersectsBoxCollider(boxCollider, this.box_colliders[i])){
                    box_intersecting.push(this.box_colliders[i]);
                }
            }

            for(var i = 0; i < this.heightplane_colliders.length; i++){
                if (BoxColliderUtils.BoxColliderintersectsHeightPlaneCollider(boxCollider, this.heightplane_colliders[i])){
                    heightplane_intersecting.push(this.heightplane_colliders[i]);
                }
            }
            for(var i = 0; i < this.group_colliders.length; i++){
                var r = this.group_colliders[i].getIntersectingWithBoxCollider(boxCollider)
                box_intersecting.join(r.boxes);
                heightplane_intersecting.join(r.slopes)
            }
        }
        return {boxes: box_intersecting, heightplanes: heightplane_intersecting};
    }
}