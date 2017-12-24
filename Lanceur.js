class Lanceur extends ObjetGraphique {

    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }


    draw(ctx){
    ctx.save();
    ctx.fillStyle = 'purple';
    ctx.fillRect(this.x,this.y,15, 40);
    }


    move(key){
        if(key == 37){
            this.x -= 10;
        } else if(key == 39){
            this.x += 10;
        }
    }

}