const SPRITE_SORT_MODE ={
    BY_LAYER: 0,
    BY_VOLUME: 1
}

class Room{
    constructor(){
        this.input = undefined;
        this.player = undefined;
        this.spriteSortMode = SPRITE_SORT_MODE.BY_VOLUME;

        this.floorColliders = [];
        this.leftWallColliders = [];
        this.rightWallColliders = [];
        this.frontWallColliders = [];
        this.backWallColliders = [];
        this.boxColliders = [];

        this.floorTerrainColliders = [];
        this.boxPlaneWall = [];
        this.boxPlaneFloor = [];
        this.boxPlaneColliders = [];

        this.tileMaps = [];
        this.sprites = [];
       
        this.boxPlaneColliders.push(new BoxPlaneCollider (BoxPlane.fromStartAndSize(
            new Vector3(0, 0,32 * 3), new Vector3(32,32,32), new Vector3(32, 0, -32).normalize()
        )));
       
        this.floorTerrainColliders.push(
            AATerrainBox.fromStartAndSize(new Vector3(32*4,-32,0),
            32*4, 32*4,32, 32 *4, 32 * 4 , 32, AA_TERRAIN_BOX_TYPE.V)
        );

  
        var fc= AABB.fromStartAndSize(new Vector3(0, -32, 0), new Vector3(32*4, 32, 32*4))
        
        
        //this.floorColliders.push(fc);

        var fc1 = AABB.fromStartAndSize(new Vector3(-32,0,0), new Vector3(32,32*4,32*4));
        this.leftWallColliders.push(fc1)

        //var fc2 =  AABB.fromStartAndSize(new Vector3(32*4,0,0), new Vector3(32,32*4,32*4));
        //this.rightWallColliders.push(fc2)

        var bc = new BoxCollider();
        bc.aabb = fc//AABB.fromStartAndSize(new Vector3(32 *5.5, -32, 32 * 5.5), new Vector3(32*4,32, 32*4));
        this.boxColliders.push(bc);

        var fc3 =  AABB.fromStartAndSize(new Vector3(0,0,-32), new Vector3(32*4,32*4,32));
        this.frontWallColliders.push(fc3)

        var fc4 = AABB.fromStartAndSize(new Vector3(0,0,32 * 4), new Vector3(32*4,32*4,32));
        this.backWallColliders.push(fc4)

        var tm = new TileMap();
        var texture = new Image();
        texture.onload = function(){};
        texture.src = "assets/graphics/test_tiles.png";

        tm.texture = texture;
        tm.position = new Vector3(0,-32,0)
        tm.iAxis = new Vector3(32,0,0);
        tm.jAxis = new Vector3(0,0, 32)
        tm.sprites = [];
        for(var i = 0; i < 4; i++){
            tm.sprites.push([]);
            for(var j = 0; j < 4; j++){
                var sprite = new Sprite3D(tm.texture);
                sprite.volume = AABB.fromStartAndSize(
                    Vector3.zero(),
                    new Vector3(32,32,32)
                );
                sprite.drawRect = Rect.fromAABB(sprite.volume);
                sprite.srcRect = new Rect(0,48,64,64);

                sprite.moveBy(Vector3.add(tm.position, 
                    Vector3.add(Vector3.scale(tm.iVector, i), Vector3.scale(tm.jVector, j))
                ));

                tm.sprites[i].push(sprite);
            }
        }
        this.tileMaps.push(tm);

        
    }
    
    update(elapsed){
        switch(this.player.moveState){
            case PLAYER_MOVE_STATE.WALKING:
                this.playerXMovement();
                this.playerZMovement();
                
                this.playerFall();
                if(this.input.action1Key.isDown){
                    this.player.ySpeed = 250;
                    this.player.moveState = PLAYER_MOVE_STATE.JUMPING;
                }
                this.player.velocity = Vector3.add( Vector3.scale(this.player.xDirection,this.player.xSpeed),
                    Vector3.add(Vector3.scale(this.player.yDirection, this.player.ySpeed),
                    Vector3.scale(this.player.zDirection, this.player.zSpeed)));

                

                this.player.moveBy(Vector3.scale(this.player.velocity, elapsed));
                this.playerCollidesFloor();
                this.playerCollidesWall();
                this.playerCollidesBox()
                this.playerCollidesBoxPlane()
                if(this.player.ySpeed < -10){
                    this.player.moveState = PLAYER_MOVE_STATE.FALLING;
                }

                break;
            case PLAYER_MOVE_STATE.RUNNING:
                break;
            case PLAYER_MOVE_STATE.JUMPING:
                this.playerXMovement();
                this.playerZMovement();
                this.playerFall();
                this.player.velocity = Vector3.add( Vector3.scale(this.player.xDirection,this.player.xSpeed),
                    Vector3.add(Vector3.scale(this.player.yDirection, this.player.ySpeed),
                    Vector3.scale(this.player.zDirection, this.player.zSpeed)));
                this.player.moveBy(Vector3.scale(this.player.velocity, elapsed));
                this.playerCollidesFloor();
                this.playerCollidesWall();
                this.playerCollidesBox();
                this.playerCollidesBoxPlane()




                
                break
            case PLAYER_MOVE_STATE.SWIMMING:
                break;
            case PLAYER_MOVE_STATE.FALLING:
                this.playerXMovement();
                this.playerZMovement();
                this.playerFall();
                this.player.velocity = Vector3.add( Vector3.scale(this.player.xDirection,this.player.xSpeed),
                    Vector3.add(Vector3.scale(this.player.yDirection, this.player.ySpeed),
                    Vector3.scale(this.player.zDirection, this.player.zSpeed)));
                this.player.moveBy(Vector3.scale(this.player.velocity, elapsed));
                this.playerCollidesFloor();
                this.playerCollidesWall();
                this.playerCollidesBox();
                this.playerCollidesBoxPlane()



                break;
        }
    }


    playerFall(){
        this.player.ySpeed -= 10;
    }
    playerZMovement(){
        this.player.zTargetSpeed = 0;

                if(this.input.upKey.isDown){
                    this.player.zTargetSpeed = -100;
                }else if (this.input.downKey.isDown){
                    this.player.zTargetSpeed = 100;
                }else{
                    this.zTargetSpeed = 0;
                }

                if(this.player.zTargetSpeed > this.player.zSPeed){
                    this.player.zSpeed = this.player.zTargetSpeed

                }else if(this.player.zTargetSpeed < this.player.zSpeed){
                    this.player.zSpeed = this.player.zTargetSpeed
                }else{
                    this.player.zSpeed = this.player.zTargetSpeed;
                }
    
    }

    playerXMovement(){
        this.player.xTargetSpeed = 0;
        if(this.input.leftKey.isDown){
            this.player.xTargetSpeed = -100;
        }else if(this.input.rightKey.isDown){
            this.player.xTargetSpeed = 100;
        }

        if(this.player.xTargetSpeed > this.player.xSpeed){
            this.player.xSpeed = this.player.xTargetSpeed

        }else if(this.player.xTargetSpeed < this.player.xSpeed){
            this.player.xSpeed = this.player.xTargetSpeed;
        }else{
            this.player.xSpeed = this.player.xTargetSpeed;
        }
        

    }

    playerHitFloor(){
        switch(this.player.moveState){
            case PLAYER_MOVE_STATE.JUMPING:
            case PLAYER_MOVE_STATE.FALLING:
                this.player.moveState = PLAYER_MOVE_STATE.WALKING;
        }
        this.player.ySpeed  = 0;
    }
    playerCollidesFloor(){
        for (var i = 0; i < this.floorColliders.length; i++){
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider,this.floorColliders[i])){
                var depth = this.floorColliders[i].maxY()- this.player.boxCollider.minY() 
                this.player.moveBy(new Vector3(0, depth+0.1, 0));
                this.playerHitFloor();
                
            }
        }

        for(var i = 0; i < this.boxPlaneFloor.length; i++){
            if(CollisionUtils.AABBintersectsBoxplane(this.player.boxCollider, this.boxPlaneFloor[i])){
                var s = this.boxPlaneFloor[i].position.y + this.boxPlaneFloor[i].halfsize.y;
                this.player.moveBy(new Vector3(0,s - this.player.boxCollider.minY(),0))
                this.playerHitFloor();
            }
        }

        
        for (var i = 0; i < this.floorTerrainColliders.length; i++){
            if(this.player.velocity.y < 0){
                if (CollisionUtils.AABBintersectsTerrainBox(this.player.boxCollider, this.floorTerrainColliders[i])){
                    var fc = this.floorTerrainColliders[i];
                    var point = this.player.boxCollider.position.copy();
                    point.y -= this.player.boxCollider.halfsize.y;
                    
                    var plane0 = this.floorTerrainColliders[i].plane0();
                    var plane1 = this.floorTerrainColliders[i].plane1();
             
                    var dp0 = Vector3.dot(plane0.normal,Vector3.subtract(plane0.position, point)) / Vector3.dot(plane0.normal, Vector3.up())
                    var dp1 =  Vector3.dot(plane1.normal,Vector3.subtract(plane1.position, point)) / Vector3.dot(plane1.normal, Vector3.up())
                    var dp2 = fc.position.y + fc.maxH() - point.y;
                    switch(Math.min(Math.min(dp0, dp1), dp2)){
                        case dp0:
                            this.player.moveBy(new Vector3(0,dp0, 0));
                            this.playerHitFloor();
                            break;
                        case dp1:
                            this.player.moveBy(new Vector3(0,dp1, 0))
                            this.playerHitFloor();
                            break;
                        case dp2:
                            this.player.moveBy(new Vector3(0,dp2, 0))
                            this.playerHitFloor();
                            break;

                    }
                   
                       
                
                }
            }
            
        }
    }

    playerCollidesWall(){
        for (var i = 0; i < this.leftWallColliders.length; i++){
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider, this.leftWallColliders[i])){
                var depth = this.leftWallColliders[i].maxX()- this.player.boxCollider.minX() 
                this.player.moveBy(new Vector3(depth+0.1,0, 0));
            }
        }

        for (var i = 0; i < this.rightWallColliders.length; i++){
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider, this.rightWallColliders[i])){
                var depth = this.player.boxCollider.maxX()- this.rightWallColliders[i].minX() 
                this.player.moveBy(new Vector3(-depth-0.1,0, 0));
            }
        }

        
        for (var i = 0; i < this.frontWallColliders.length; i++){
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider, this.frontWallColliders[i])){
                var depth = this.frontWallColliders[i].maxZ()- this.player.boxCollider.minZ() 
                this.player.moveBy(new Vector3(0, 0, depth+0.1));
            }
        }

        for (var i = 0; i < this.backWallColliders.length; i++){
            if(CollisionUtils.AABBintersectsAABB(this.player.boxCollider, this.backWallColliders[i])){
                var depth = this.player.boxCollider.maxZ()- this.backWallColliders[i].minZ() 
                this.player.moveBy(new Vector3(0, 0, -depth-0.1));
            }
        }

        for(var i = 0; i< this.boxPlaneWall.length; i++){
            if(CollisionUtils.AABBintersectsBoxplane(this.player.boxCollider, this.boxPlaneWall[i])){
               var verticies = this.player.boxCollider.verticies(); 
               var plane = this.boxPlaneWall[i].plane();
               var d  = 0;
               for (var i = 0; i < verticies.length; i++){
                   var td =CollisionUtils.VelocityDistanceToPlane(verticies[i], plane, plane.normal)
                   d = Math.max(d, td);
               }
               this.player.moveBy(Vector3.scale(plane.normal,d))
                
            }
        }

        

    }

    playerCollidesBoxPlane(){
        for(var i = 0; i < this.boxPlaneColliders.length; i++){
            var bp = this.boxPlaneColliders[i];
            var baabb = bp.boxPlane.aabb();
            var pbox = this.player.boxCollider;
            var pv = this.player.velocity;
            var npv = pv.negate();
            var plane = bp.boxPlane.plane();
            var bestPoint = undefined
            if (CollisionUtils.AABBintersectsBoxplane(pbox, bp.boxPlane)){
                var dleft = Number.POSITIVE_INFINITY;
                var dright = Number.POSITIVE_INFINITY;
                var dbottom = Number.POSITIVE_INFINITY;
                var dtop = Number.POSITIVE_INFINITY;
                var dfront = Number.POSITIVE_INFINITY;
                var dback = Number.POSITIVE_INFINITY;
                var dplane = Number.POSITIVE_INFINITY;

                if(pv.x > 0 && bp.canCollideLeft){
                    dleft = (baabb.minX() - pbox.maxX()) / npv.x;
                }
                if(pv.x < 0 && bp.canCollideRight){
                    dright = (baabb.maxX() - pbox.minX()) / npv.x;
                }
                if(pv.y > 0 && bp.canCollideBottom){
                    dbottom = (baabb.minY() - pbox.maxY()) / npv.y;
                }
                if(pv.y < 0 && bp.canCollideTop){
                    dtop = (baabb.maxY() - pbox.minY()) / npv.y;
                }
                if(pv.z > 0 && bp.canCollideFront){
                    dfront= (baabb.minZ() - pbox.maxZ()) / npv.z;
                }
                if(pv.z < 0 && bp.canCollideBack){
                    dback = (baabb.maxZ() - pbox.minZ()) / npv.z;
                }
                if(bp.canCollidePlane && Vector3.dot(plane.normal, npv) != 0 && (pbox.minY() +1< baabb.maxY())){
                    var verts = this.player.boxCollider.verticies()
                    for(var i = 0; i < verts.length; i++){
                        if(CollisionUtils.PointBelowPlane(verts[i], plane)){
                            if(dplane == Number.POSITIVE_INFINITY){
                                dplane =CollisionUtils.VelocityDistanceToPlane(verts[i], plane, npv);
                                bestPoint = verts[i];
                            }else{
                                var d = CollisionUtils.VelocityDistanceToPlane(verts[i], plane, npv);
                                if (d > dplane){
                                    dplane = d;
                                    bestPoint = verts[i];
                                }
                            }
                                
                        }
                    }
                }

                var min_d = Math.min(Math.min(Math.min(dleft, dright),Math.min(
                    Math.min(dbottom, dtop),Math.min(dfront, dback))),
                    dplane);
                var depth = 0;
                switch(min_d){
                    case Number.POSITIVE_INFINITY:
                        break;
                    case dleft:
                        depth = pbox.maxX() - baabb.minX();
                        this.player.moveBy(new Vector3(-depth-0.1,0,0))
                        this.player.xSpeed = 0;
                        break;
                    case dright:
                        depth = baabb.maxX() - pbox.minX();
                        this.player.moveBy(new Vector3(depth+0.1,0,0))
                        this.player.xSpeed = 0;
                        break;
                    case dbottom:
                        depth = pbox.maxY() - baabb.minY();
                        this.player.moveBy(new Vector3(0, -depth-0.1,0))
                        this.player.ySpeed = 0;
                        break;
                    case dtop:
                        depth = baabb.maxY() - pbox.minY();
                        this.player.moveBy(new Vector3(0,depth+0.1,0))
                        this.playerHitFloor();
                        break;
                    case dfront:
                        depth = pbox.maxZ() - baabb.minZ();
                        this.player.moveBy(new Vector3(0,0, -depth-0.1))
                        this.player.zSpeed = 0
                        break;
                    case dback:
                        depth = baabb.maxZ() - pbox.minZ();
                        this.player.moveBy(new Vector3(0,0,depth+0.1))
                        this.player.zSpeed = 0
                        break;
                    case dplane:
                        depth = CollisionUtils.VelocityDistanceToPlane(bestPoint, plane, plane.normal.normalize());
                        this.player.moveBy(Vector3.scale(plane.normal.normalize(),depth + 0.1));
                        break;


                }
            }
        }
    }
    playerCollidesBox(){
        for(var i = 0; i < this.boxColliders.length; i++){
            var box = this.boxColliders[i];
            var baabb = box.aabb;
            var pbox = this.player.boxCollider;
            var pv = this.player.velocity;
            var npv = pv.negate()
            if(CollisionUtils.AABBintersectsAABB(pbox, box.aabb)){
                var dleft = Number.POSITIVE_INFINITY;
                var dright = Number.POSITIVE_INFINITY;
                var dbottom = Number.POSITIVE_INFINITY;
                var dtop = Number.POSITIVE_INFINITY;
                var dfront = Number.POSITIVE_INFINITY;
                var dback = Number.POSITIVE_INFINITY;

                if(pv.x > 0 && box.canCollideLeft){
                    dleft = (baabb.minX() - pbox.maxX()) / npv.x;
                }
                if(pv.x < 0 && box.canCollideRight){
                    dright = (baabb.maxX() - pbox.minX()) / npv.x;
                }
                if(pv.y > 0 && box.canCollideBottom){
                    dbottom = (baabb.minY() - pbox.maxY()) / npv.y;
                }
                if(pv.y < 0 && box.canCollideTop){
                    dtop = (baabb.maxY() - pbox.minY()) / npv.y;
                }
                if(pv.z > 0 && box.canCollideFront){
                    dfront= (baabb.minZ() - pbox.maxZ()) / npv.z;
                }
                if(pv.z < 0 && box.canCollideBack){
                    dback = (baabb.maxZ() - pbox.minZ()) / npv.z;
                }

                var min_d = Math.min(Math.min(dleft, dright),Math.min(
                    Math.min(dbottom, dtop),Math.min(dfront, dback)));
                var depth = 0;
                switch(min_d){
                    case Number.POSITIVE_INFINITY:
                        break;
                    case dleft:
                        depth = pbox.maxX() - baabb.minX();
                        this.player.moveBy(new Vector3(-depth-0.1,0,0))
                        this.player.xSpeed = 0;
                        break;
                    case dright:
                        depth = baabb.maxX() - pbox.minX();
                        this.player.moveBy(new Vector3(depth+0.1,0,0))
                        this.player.xSpeed = 0;
                        break;
                    case dbottom:
                        depth = pbox.maxY() - baabb.minY();
                        this.player.moveBy(new Vector3(0, -depth-0.1,0))
                        this.player.ySpeed = 0;
                        break;
                    case dtop:
                        depth = baabb.maxY() - pbox.minY();
                        this.player.moveBy(new Vector3(0,depth+0.1,0))
                        this.player.moveState = PLAYER_MOVE_STATE.WALKING;
                        this.player.ySpeed = 0;
                        break;
                    case dfront:
                        depth = pbox.maxZ() - baabb.minZ();
                        this.player.moveBy(new Vector3(0,0, -depth-0.1))
                        this.player.zSpeed = 0
                        break;
                    case dback:
                        depth = baabb.maxZ() - pbox.minZ();
                        this.player.moveBy(new Vector3(0,0,depth+0.1))
                        this.player.zSpeed = 0

                        break;
                }
                
            }
        }
    }



    spriteSort(sprites){
        switch(this.spriteSortMode){
            case RENDER_MODE.BY_VOLUME:
                sprites = sprites.sort((a,b) =>{
                    var aMinX = a.minX();
                    var aMaxX = a.maxX();
                    var bMinX = b.minX();
                    var bMaxX = b.maxX();

                    var aMinY = a.minY();
                    var aMaxY = a.maxY();
                    var bMinY = b.minY();
                    var bMaxY = b.maxY();

                    var aMinY = a.minZ();
                    var aMaxY = a.maxZ();
                    var bMinY = b.minZ();
                    var bMaxY = b.maxZ();
                    if(
                        aMaxX <= bMinX || 
                        aMaxY <= bMinY ||
                        aMaxZ <= bMinZ){
                        return -1;
                    }else if(
                        (aMaxX > bMinX && aMinX < bMinX ||
                         aMaxY > bMinY && aMinY < bMinY ||
                         aMaxZ > bMinZ && aMinZ < bMinZ)
                    ){
                        return -1
                    }
                    else{
                        return 1;
                    }
                });
                break;
            case RENDER_MODE.BY_LAYER:
                sprites = sprites.sort((a,b) =>{
                    return Math.sign(a.layer - b.layer);
                })
                break;
        }
        return sprites;
    }
    draw(ctx){

        for (var x = 0; x < this.tileMaps.length; x++){
            for(var i = 0; i < this.tileMaps[x].sprites.length; i++){
                for (var j = 0; j < this.tileMaps[x].sprites[i].length; j++){
                    this.tileMaps[x].sprites[i][j].draw(ctx);
                }
            }
        }
        var sprite = this.player.sprite;


        sprite.draw(ctx);
        
    }
}