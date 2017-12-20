class ObjetGraphique {
    constructor(xPos, yPos, xVitesse, yVitesse, w, h){
        this.x = xPos;
        this.y = yPos;
        this.xV = xVitesse;
        this.yV = yVitesse;
        this.h = h;
        this.w = w;
    }

    //dessiner l'objet graphique
    draw(ctx){
        ctx.clearRect(0, 0, this.w, this.h);
    }

    //deplacer l'objet graphique
    move(){

    }

    tryColision(){
    }

    rotationBras(){}
}