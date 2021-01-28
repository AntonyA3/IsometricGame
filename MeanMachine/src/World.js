class World{
    constructor(controlPad){
        this.player = new Player();
        this.camera = new Camera();        
        this.camera.initialize_focal_point(this.player.position);



        this.containing_box = []
        this.collider_box = []
        this.collider_slopedxdy = []
        this.collider_slopedxdy.push(
            Slope.fromStartAndSize(new Vector3(24*4,0,0), new Vector3(24*4, 24*4, 24*4), Slope_Type.DX_DY)
        )
        this.collider_slopedxdy.push(
            Slope.fromStartAndSize(new Vector3(-24*4,0,0), new Vector3(24*4, 24*4, 24*4), Slope_Type.NDX_DY)
        )

        this.collider_slopedxdy.push(
            Slope.fromStartAndSize(new Vector3(0,0,24*4), new Vector3(24*4, 24*4, 24*4), Slope_Type.DZ_DY)
        )

        this.collider_slopedxdy.push(
            Slope.fromStartAndSize(new Vector3(0,0,-24*4), new Vector3(24*4, 24*4, 24*4), Slope_Type.NDZ_DY)
        )
        
        
        

        this.collider_box.push(new BoxCollider(new Vector3(0,-24,0), new Vector3(24*4,24,24*4),true,true,true,true,true,true))
        this.tilemap = []
        this.controlPad = controlPad;
    }

    update(elapsed){
        this.player.velocity.x = this.controlPad.left.isDown * (!this.controlPad.right.isDown) * 
        -100 + (this.controlPad.right.isDown * 100 * (1 - this.player.dydx));
        this.player.velocity.y -= 10;
        this.player.velocity.z = this.controlPad.up.isDown * (!this.controlPad.down.isDown) * 
        -100 + this.controlPad.down.isDown * 100;
        

        this.player.move_by_position(Vector3.scale(this.player.velocity,elapsed))


        
        /*
        
        for(var i = 0; i < this.collider_slopedxdy.length; i++){
            if(CollisionUtils.AABBintersectsSlope(this.player.boxCollider, this.collider_slopedxdy[i])){
                var manifold = CollisionUtils.AABBvsSlope(this.player.boxCollider, this.player.velocity, this.collider_slopedxdy[i])       
                this.player.move_by_position(Vector3.scale(manifold.normal,manifold.depth))
                if(manifold.normal.y != 0) {this.player.velocity.y = 0};
                this.player.dydx = 0;
            }
        }
        */
        for(var i = 0; i < this.collider_box.length; i++){
            if(CollisionUtils.BoxColliderintersectsBoxCollider(this.player.boxCollider.getBoundingBox(), this.collider_box[i])){
                var manifold = CollisionUtils.BoxColldervsBoxCollider(this.player.boxCollider, this.player.velocity, this.collider_box[i], false, false, true, true, false, false)
                if(manifold.normal.y != 0) {this.player.velocity.y = 0};
                this.player.dydx = 0;

                this.player.move_by_position(Vector3.scale(manifold.normal,manifold.depth))
            }
        }

        
        
        /*
        for(var i = 0 ; i < this.containing_box.length; i++){
            var collider = this.containing_box[i].collider;
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider, collider)){
                if(this.containing_box[i].clamp_min_x){
                    var dMin = this.containing_box[i].collider.minX() - this.player.boxCollider.minX();
                    if(dMin >0){
                        this.player.move_by_position(new Vector3(dMin,0,0));
                        this.player.velocity.x = 0;
                    }
                }
                
                if(this.containing_box[i].clamp_min_y){
                    var dMin = this.containing_box[i].collider.minY() - this.player.boxCollider.minY();
                    if(dMin >0){
                        this.player.move_by_position(new Vector3(0,dMin,0));
                        this.player.velocity.y = 0;
                    }
                }


                if(this.containing_box[i].clamp_min_z){
                    var dMin = this.containing_box[i].collider.minZ() - this.player.boxCollider.minZ();
                    if(dMin >0){
                        this.player.move_by_position(new Vector3(0,0,dMin));
                        this.player.velocity.z = 0;
                    }
                }
                

                if(this.containing_box[i].clamp_max_x){
                    var dMin = this.containing_box[i].collider.maxX() - this.player.boxCollider.maxX();
                    if(dMin < 0){
                        this.player.move_by_position(new Vector3(dMin,0,0));
                        this.player.velocity.x = 0;
                    }
                }

                if(this.containing_box[i].clamp_max_y){
                    var dMin = this.containing_box[i].collider.maxY() - this.player.boxCollider.maxY();
                    if(dMin < 0){
                        this.player.move_by_position(new Vector3(0,dMin,0));
                        this.player.velocity.y = 0;
                    }
                }

                if(this.containing_box[i].clamp_max_z){
                    var dMin = this.containing_box[i].collider.maxZ() - this.player.boxCollider.maxZ();
                    if(dMin < 0){
                        this.player.move_by_position(new Vector3(0,0,dMin));
                        this.player.velocity.z = 0;
                    }
                }
                
            }

        }*/
        
        
        this.camera.initialize_focal_point(this.player.position);

        
        
     
    }

    draw(ctx){
        for(var i = 0; i < this.tilemap.length; i++){

            for(var j = 0; j < this.tilemap[i].tileSprites.length; j++){
                for(var k = 0; k < this.tilemap[i].tileSprites[j].length; k++){
                    this.tilemap[i].tileSprites[j][k].draw(ctx);
                }
            }
        }

        this.player.sprite.draw(ctx);
        
        
    }
}