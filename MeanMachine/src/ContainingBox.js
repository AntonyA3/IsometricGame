class ContainingBox{
    constructor(){
        this.collider = undefined;
        this.clamp_min_x = Number.MIN_SAFE_INTEGER;
        this.clamp_max_x = Number.MAX_SAFE_INTEGER;
        this.clamp_min_y = Number.MIN_SAFE_INTEGER;
        this.clamp_max_y = Number.MAX_SAFE_INTEGER;
        this.clamp_min_z = Number.MIN_SAFE_INTEGER;
        this.clamp_max_z = Number.MAX_SAFE_INTEGER;
    }

}