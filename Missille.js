class Missille extends ObjetGraphique {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }


    draw(ctx){
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, 2, 15);
        ctx.restore();
    }


    move(){
        this.y -= 5;
    }



}