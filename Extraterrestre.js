class Extraterrestre extends ObjetGraphique {
    constructor(xPos, yPos, xV, yV, scale) {
        super(xPos, yPos, xV, yV);
        this.x = xPos; //position en x
        this.y = yPos; //position en y
        this.xVitesse = xV; //vitesse déplacement x
        this.yVitesse = yV; //vitesse déplacement y
        this.angleBL = Math.random() * 2 + .5;
        this.angleBR = (Math.random() * 2.5) + 2.5;
        this.angleFL = .1;
        this.angleFR = -.5;
        this.scale = scale;
        this.vRotationBL  = .05; //vitesse rotation bras gauche
        this.vRotationBR = .05; //vitesse roration bras droit
        this.colorChap = 'white'

    }


    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y); //dessine l'extraterrestre à la position x et y
        ctx.scale(this.scale, this.scale);
        ctx.fillStyle = 'darkred';
        ctx.fillRect(0, 0, 90, 100);


        //desinne la tete du bonhomme
        this.drawTete(ctx);

        //desinne bras gauche du bonhomme
        this.drawBrasG(this.angleBL, ctx);
        //desinne bras droit
        this.drawBrasD(this.angleBR, ctx);

        //desinne pied gauches
        this.drawPiedG(this.angleFL, ctx);

        //desinne pied gauches
        this.drawPiedD(this.angleFR, ctx);


        //on restore le contexte
        ctx.restore();

        super.draw(ctx);
    }


    drawTete(ctx) {
        ctx.save();
        ctx.translate(-30, -40);
        ctx.fillStyle = 'orange';
        ctx.fillRect(0, 0, 150, 40);
        ctx.fillStyle = 'white';
        ctx.fillRect(20, 10, 14, 14);
        ctx.fillRect(115, 10, 14, 14);
        ctx.fillStyle = this.colorEyes;

        //desinne le chapeau
        this.drawChapeau(ctx);

//Les yeux
        ctx.beginPath();
        ctx.arc(27, 17, 3, 0, 2 * Math.PI);
        ctx.fillStyle = this.colorEyes;
        ctx.fill();
        ctx.strokeStyle = this.colorEyes;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(122, 17, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    drawChapeau(ctx) {
        ctx.save();
        ctx.fillStyle = this.colorChap;
        ctx.strokeStyle = this.colorChap;
        ctx.rotate(3.14);
        ctx.translate(-75, 0);
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore()
    }

//desinne la jambe gauche
    drawPiedG(angleFL, ctx) {
        ctx.save();
        ctx.translate(20, 100);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 10, 30);
        this.drawfootG(angleFL, ctx);
        ctx.restore();
    }

//bas de la jambes gauche
    drawfootG(angleRotationFL, ctx) {
        ctx.save();
        ctx.translate(0, 30);
        ctx.rotate(angleRotationFL);
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(0, 0, 10, 30);
        ctx.restore();
    }


//desinne la jambe droite
    drawPiedD(angleFR, ctx) {
        ctx.save();
        ctx.translate(60, 100);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 10, 30);
        this.drawfootD(angleFR, ctx);
        ctx.restore();

    }

    //dessinne le pieds droit
    drawfootD(angleRotationFR, ctx) {
        ctx.save();
        ctx.translate(0, 30);
        ctx.rotate(angleRotationFR);
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(0, 0, 10, 30);
        ctx.restore();
    }


//desinne le bras gauche
    drawBrasG(angleG, ctx) {
        ctx.save();
        ctx.translate(-70, 0);
        ctx.fillStyle = 'violet';
        ctx.fillRect(20, 30, 50, 20);
        this.drawBrasAG(angleG, ctx);
        ctx.restore();
    }

    //desinne le bras droit
    drawBrasD(angleD, ctx) {
        ctx.save();
        ctx.translate(70, 0);
        ctx.fillStyle = 'violet';
        ctx.fillRect(20, 30, 50, 20);
        this.drawBrasAD(angleD, ctx);
        ctx.restore();
    }

    //desinne l'avant bras gauche
    drawBrasAG(angleRotationG, ctx) {
        ctx.save();
        ctx.translate(20, 30);
        ctx.rotate(angleRotationG);
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, 20, 50);
        ctx.restore();
    }

    //desinne l'avant bras droit
    drawBrasAD(angleRotationD, ctx) {
        ctx.save();
        ctx.translate(70, 30);
        ctx.rotate(angleRotationD);
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, -20, 50);
        ctx.restore();
    }


//change la place des avant bras
    /*function changeAB(){
        if (AvtBD == 30) {
            AvtBD = 0;
        } else {
            AvtBD = 30;
        }

        if (AvtBG == 30){
            AvtBG = 0;
        } else {
            AvtBG = 30;
        }
    }*/


//Change la couleur des yeux
    changeColorEyes() {
        if (this.colorEyes === 'lightblue') {
            this.colorEyes = 'red';
        } else if (this.colorEyes === 'red') {
            this.colorEyes = 'green';
        } else if (this.colorEyes === 'green') {
            this.colorEyes = 'lightblue';
        }
    }


    move(){
        this.x += this.xV;
        this.y += this.yV
    }

    tryColision(w, h){
        //collision en x
        if (this.x > w - this.scale * 185 || this.x < this.scale*85) {
            this.xV = -this.xV;
        }

        //colision en y
        if (this.y > h - this.scale*160 || this.y < this.scale*90) {
            this.yV = -this.yV;
        }
    }


    //rotation des bras
    rotationBras(){
        //mise a jour de la rotation des bras
        this.angleBL += this.vRotationBL;
        if(this.angleBL < .5 || this.angleBL > 2.5) {
            this.vRotationBL = -this.vRotationBL;
        }

        this.angleBR += this.vRotationBR;
        if(this.angleBR > 5 || this.angleBR < 2.5) {
            this.vRotationBR = -this.vRotationBR;
        }
    }
}