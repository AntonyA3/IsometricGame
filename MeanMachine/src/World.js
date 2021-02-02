class World{
    constructor(controlPad){
        this.player = new Player();
        this.player.sprite.player = 0.5
        
        this.camera = new Camera();        
        this.camera.initialize_focal_point(this.player.position.copy());

        this.worldCollider = new GroupCollider();
        this.worldCollider.testBox = new AxisAlignedBox(Vector3.zero(), new Vector3(32768,32768,32768))

        this.worldCollider.box_colliders.push(new BoxCollider(new Vector3(0,-24,0), new Vector3(24*16,24,24*16),false,false,true,true,false,false))
        this.worldCollider.box_colliders.push(new BoxCollider(new Vector3(24*8,24*3,0), new Vector3(24*4,24,24*4),false,true,true,true,true,true))

        this.worldCollider.heightplane_colliders.push(new HeightPlaneCollider(new Vector3(-24*4,0,0), new Vector3(24*4, 24 *4),HeightPlaneType.V, 24*4, 0,0, 24 *4,false,false,false,true,true,false,false))
        this.worldCollider.heightplane_colliders.push(new HeightPlaneCollider(new Vector3(24*4,0,0), new Vector3(24*4, 24 *4),HeightPlaneType.V, 0, 24 * 4, 24 * 4, 0,false,false,false,true,true,false,false))
         
        this.tilemap = []
        var tm = new Tilemap();
        var tileSprites = [];
        var img = new Image();
        img.onload = function(){
        }
        img.src = "../assets/test_tiles.png"

        for (var i = 0; i < 16; i++){
            tileSprites.push([]);
            for (var j = 0; j < 16; j++){
                var sprite = new Sprite3d(img)
                sprite.position = Vector3.add(new Vector3(0,-24,0), new Vector3(i*24,0, j*24))
                sprite.volume = new VolumeBox(
                    Vector3.add(new Vector3(0,-24,0), new Vector3(i*24,0, j*24)),
                    new Vector3(24,24,24)
                );
                sprite.srcRect = new Rect(0,0,48,48);
                sprite.drawRect = Rect.fromAxisAlignedBox(
                    AxisAlignedBox.fromStartAndSize(sprite.position, new Vector3(24,24,24))
                );

                tileSprites[i].push(sprite)
            }
        }
        tm.tileSprites = tileSprites
        this.tilemap.push(tm)

        tileSprites = [];
        tm = new Tilemap();
        for (var i = 0; i < 4; i++){
            tileSprites.push([]);
            for (var j = 0; j < 4; j++){
                var sprite = new Sprite3d(img)
                sprite.position = Vector3.add(new Vector3(24*4,0,0), new Vector3(i*24,i*24, j*24))
                sprite.volume = new VolumeBox(
                    Vector3.add(new Vector3(24*4,0,0), new Vector3(i*24,i*24, j*24)),
                    new Vector3(24,24,24)
                );
                sprite.srcRect = new Rect(48*6,0,48,48);
                sprite.drawRect = Rect.fromAxisAlignedBox(
                    AxisAlignedBox.fromStartAndSize(sprite.position, new Vector3(24,24,24))
                );

                tileSprites[i].push(sprite)
            }
        }
        tm.tileSprites = tileSprites
        this.tilemap.push(tm)
        
        tileSprites = [];
        tm = new Tilemap();
        for (var i = 0; i < 4; i++){
            tileSprites.push([]);
            for (var j = 0; j < 4; j++){
                var sprite = new Sprite3d(img)
                sprite.position = Vector3.add(new Vector3(24*8,24*3,0), new Vector3(i*24,0, j*24))
                sprite.volume = new VolumeBox(
                    Vector3.add(new Vector3(24*8,24*3,0), new Vector3(i*24,0, j*24)),
                    new Vector3(24,24,24)
                );
                sprite.srcRect = new Rect(48*1,0,48,48);
                sprite.drawRect = Rect.fromAxisAlignedBox(
                    AxisAlignedBox.fromStartAndSize(sprite.position, new Vector3(24,24,24))
                );

                tileSprites[i].push(sprite)
            }
        }
        tm.tileSprites = tileSprites
        this.tilemap.push(tm)
        
        this.controlPad = controlPad;


    }

    update(elapsed){
        this.player.targetSpeedX = (this.controlPad.left.isDown) * -100 
        + (this.controlPad.right.isDown) * 100;

        if(this.player.targetSpeedX < 0){
            this.player.XSpeed = Math.min(-100, this.player.XSpeed)
            this.player.XSpeed = Math.max(this.player.targetSpeedX,this.player.XSpeed - 100*elapsed)
        }else if (this.player.targetSpeedX > 0) {
            this.player.XSpeed = Math.max(100, this.player.XSpeed)
            this.player.XSpeed = Math.min(this.player.targetSpeedX,this.player.XSpeed + 100*elapsed)
        }else{
            this.player.XSpeed = 0;
        }

        this.player.targetSpeedZ = (this.controlPad.up.isDown) * -100 
        + (this.controlPad.down.isDown) * 100;

        if(this.player.targetSpeedZ < 0){
            this.player.ZSpeed = Math.min(-100, this.player.ZSpeed)
            this.player.ZSpeed = Math.max(this.player.targetSpeedZ,this.player.ZSpeed - 100*elapsed)
        }else if (this.player.targetSpeedZ > 0) {
            this.player.ZSpeed = Math.max(100, this.player.ZSpeed)
            this.player.ZSpeed = Math.min(this.player.targetSpeedZ,this.player.ZSpeed + 100*elapsed)
        }else{
            this.player.ZSpeed = 0;
        }

        


        if(this.player.onFloor){
            
            this.player.YSpeed = -60;
            if(this.controlPad.button_A.isDown){
                this.player.YSpeed += 250
                this.player.XVector = new Vector3(1,0,0);
                this.player.ZVector = new Vector3(0,0,1);
                this.player.isJumping = true;
            }
        }else{
            if(this.player.isJumping){
                this.player.isJumping = false;
            }
            this.player.YSpeed -= 10;

        }

        var player_velocity = Vector3.add(Vector3.scale(this.player.XVector, this.player.XSpeed),
        
        Vector3.add(
            Vector3.scale(this.player.YVector, this.player.YSpeed),
            Vector3.scale(this.player.ZVector, this.player.ZSpeed)
        ));

        this.player.move_by_position(Vector3.scale(player_velocity,elapsed))
        
        this.humanoidCollision(this.player, player_velocity);
        this.camera.initialize_focal_point(this.player.position.copy());

        
        
     
    }

    humanoidCollision(human, human_velocity){

        var human_hit_floor = false;
        var intersecting = this.worldCollider.getIntersectingWithBoxCollider(human.boxCollider);
        for(var i = 0; i < intersecting.boxes.length; i++){
            var manifold = BoxColliderUtils.BoxCollidervsBoxCollider(human.boxCollider, human_velocity, intersecting.boxes[i])
                if(manifold.direction.y != 0) {human.YSpeed =0}
                if(manifold.direction.y == 1){
                    human.XVector = new Vector3(1,0,0)
                    human.ZVector = new Vector3(0,0,1)
                    human_hit_floor = true;
                }
                human.move_by_position(Vector3.scale(manifold.direction,manifold.speed))
            
        }
      
        for (var i = 0; i < intersecting.heightplanes.length; i++){
            var manifold = BoxColliderUtils.BoxCollidervsHeightPlaneCollider(human.boxCollider, human_velocity, intersecting.heightplanes[i])
                if(manifold.direction.y != 0) {human.YSpeed = 0}
                if(manifold.direction.y == 1){
                    human_hit_floor = true;
                    human.onFloor = true;
                    var dir = intersecting.heightplanes[i].getGradientVectors(human.boxCollider.getBottomPoint());
                    if(dir.posX.y < 0){
                        if(human_velocity.x > 0){
                            human.XVector = dir.posX
                        }else{
                            human.XVector = new Vector3(1,0,0)
                        }
                    }
                    if(dir.posX.y > 0){
                        if( human_velocity.x < 0){
                            human.XVector = dir.posX
                        }else{
                            human.XVector = new Vector3(1,0,0)
                        }

                    }

                    if(dir.posZ.y < 0){
                        if(human_velocity.z> 0){
                            human.ZVector = dir.posZ
                        }else{
                            human.ZVector = new Vector3(0,0,1)
                        }

                    }
                    if(dir.posZ.y > 0){
                        if( human_velocity.z < 0){
                            human.ZVector = dir.posZ
                        }else{
                            human.ZVector = new Vector3(0,0,1)
                        }

                    }
                    
                }
                human.move_by_position(Vector3.scale(manifold.direction,manifold.speed))
            
        }
        /*
        for(var i = 0; i < this.collider_height.length; i++){
            if(BoxColliderUtils.BoxColliderintersectsHeightPlaneCollider(human.boxCollider, this.collider_height[i])){
                
            }
        }*/
        human.onFloor = human_hit_floor      
        

    }

    draw(ctx){
        var sprites = [];
        sprites.push(this.player.sprite);

        for(var i = 0; i < this.tilemap.length; i++){
            for(var j = 0; j < this.tilemap[i].tileSprites.length; j++){
                for(var k = 0; k < this.tilemap[i].tileSprites[j].length; k++){
                   sprites.push (this.tilemap[i].tileSprites[j][k]);

                }
            }
        }
        sprites.sort((a,b) =>{
            if(a.volume.maxX() <= b.volume.minX()){
                return -1;
            }
            if(a.volume.minX() > b.volume.maxX()){
                return 1;
            }

            if(a.volume.maxY() <= b.volume.minY()){
                return -1;
            }
            if(a.volume.minY() > b.volume.maxY()){
                return 1;
            }

            if(a.volume.maxZ() <= b.volume.minZ()){
                return -1;
            }
            if(a.volume.minZ() > b.volume.maxZ()){
                return 1;
            }
            
            return 0;
        })
    
        
        for(var i = 0; i < sprites.length; i++){
            sprites[i].draw(ctx)
        }        
    }
}