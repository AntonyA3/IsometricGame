class Player{
    constructor(){

        this.position = Vector3.zero();

        this.direction = Vector3.zero();
        this.velocity = Vector3.zero();
        this.boxCollider = new BoxCollider(new Vector3(0,0,0), new Vector3(24,48,24),true,true,true,true,true,true);
        var img = new Image();
        img.onload = function(){
        }
        img.src = "../assets/test_player.png"

        this.sprite = new Sprite3d(img);
        this.sprite.drawRect = Rect.fromAxisAlignedBox(this.boxCollider.getBoundingBox())
        this.sprite.srcRect = new Rect(0,0,24*2,24*3);
    }

    move_by_position(movement){
    
        this.position = Vector3.add(this.position, movement);
        this.boxCollider.position = Vector3.add(this.boxCollider.position, movement);
        this.sprite.position = Vector3.add(this.sprite.position, movement);
        var iso_move = movement.toIsometric();
        this.sprite.drawRect.x += iso_move.x;
        this.sprite.drawRect.y += iso_move.y;
    }
    
    draw(ctx){
        this.sprite.draw(ctx)

    }
}