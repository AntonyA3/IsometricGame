class World{
    constructor(controlPad){
        this.player = new Player();

        
        this.camera = new Camera();        
        this.camera.initialize_focal_point(this.player.position.copy());

        this.containing_box = []
        this.collider_box = []
        this.collider_slope = []
        
        this.collider_height = [];
        this.collider_height.push(new HeightPlaneCollider(new Vector3(0,0,-24*4),new Vector2(24*4, 24*4),HeightPlaneType.V,
        24*4, 0, 0, 0, false, false, false, true, true, false, false));
        

        this.collider_box.push(new BoxCollider(new Vector3(0,-24,0), new Vector3(24*4,24,24*4),true,true,true,true,true,true))
        
        //this.collider_slope.push(new SlopeCollider(new Vector3(24*4,0,0), new Vector3(24*4,24*4,24*4), SlopeColliderType.SLOPE_110_111))
        //this.collider_slope.push(new SlopeCollider(new Vector3(0,0,24*4), new Vector3(24*4,24*4,24*4), SlopeColliderType.SLOPE_111_011))
        //this.collider_slope.push(new SlopeCollider(new Vector3(-24*4,0,0), new Vector3(24*4,24*4,24*4), SlopeColliderType.SLOPE_011_010))

         
        this.tilemap = []
        this.controlPad = controlPad;


    }

    update(elapsed){
        this.player.velocity.x = this.controlPad.left.isDown * (!this.controlPad.right.isDown) * 
        -100 + (this.controlPad.right.isDown * 100);
        this.player.velocity.y -= 10;
        this.player.velocity.z = this.controlPad.up.isDown * (!this.controlPad.down.isDown) * 
        -100 + this.controlPad.down.isDown * 100;
        
        this.player.move_by_position(Vector3.scale(this.player.velocity,elapsed))


        
        
        
        
        
        for(var i = 0; i < this.collider_box.length; i++){
            if(BoxColliderUtils.BoxColliderintersectsBoxCollider(this.player.boxCollider, this.collider_box[i])){
                var manifold = BoxColliderUtils.BoxCollidervsBoxCollider(this.player.boxCollider, this.player.velocity, this.collider_box[i])
                if(manifold.direction.y != 0) {this.player.velocity.y = 0};

                this.player.move_by_position(Vector3.scale(manifold.direction,manifold.speed))
            }
        }

        for(var i = 0; i < this.collider_height.length; i++){
            if(BoxColliderUtils.BoxColliderintersectsHeightPlaneCollider(this.player.boxCollider, this.collider_height[i])){
                var manifold = BoxColliderUtils.BoxCollidervsHeightPlaneCollider(this.player.boxCollider, this.player.velocity, this.collider_height[i])
                if(manifold.direction.y != 0) {this.player.velocity.y = 0};

                this.player.move_by_position(Vector3.scale(manifold.direction,manifold.speed))
            }
        }

        for(var i = 0; i < this.collider_slope.length; i++){
            if(BoxColliderUtils.BoxColliderintersectsSlopeCollider(this.player.boxCollider, this.collider_slope[i])){
                var manifold = BoxColliderUtils.BoxCollidervsSlopeCollider(this.player.boxCollider, this.player.velocity, this.collider_slope[i])       
             
                this.player.move_by_position(Vector3.scale(manifold.direction,manifold.speed))
                if(manifold.direction.y != 0) {this.player.velocity.y = 0};
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
        
        
        this.camera.initialize_focal_point(this.player.position.copy());

        
        
     
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