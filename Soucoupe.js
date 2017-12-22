class Soucoupe extends ObjetGraphique {
    constructor(posX, posY, vitesseX, vitesseY, scale) {
        super();
        this.x = posX;
        this.y = posY;
        this.xVitesse = vitesseX;
        this.yVitesse = vitesseY;
        this.scale = scale;
        this.touch = false;
        this.colorC = "lightblue";
        this.rotation = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.rotation);
        this.soute(ctx);
        ctx.strokeStyle = "darkslategray";
        ctx.fillStyle = "darkslategray";
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 100, Math.PI / 2, 0, Math.PI * 2, 0);
        ctx.fill();
        ctx.stroke();
        this.cabine(ctx);
        ctx.restore();
    }

    cabine(ctx) {
        ctx.save();
        ctx.translate(0, 0);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.fillStyle = this.colorC;
        ctx.arc(0, 0, 50, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
        this.antenne(ctx, -20 * Math.PI / 180, 20, 45);
        this.antenne(ctx, 20 * Math.PI / 180, -20, 45);
        ctx.restore();
    }

    //les antennes de la soucoupe
    antenne(ctx, rotation, tX, tY) {
        ctx.save();
        ctx.rotate(rotation);
        ctx.translate(tX, tY);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 40);
        ctx.stroke();
        ctx.translate(0, 40);
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "gray";
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }


    soute(ctx) {
        ctx.save();
        ctx.translate(0, 10);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.strokeStyle = "dimgray";
        ctx.fillStyle = "dimgray";
        ctx.ellipse(0, 0, 80, 30, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }


    move(ctx) {
        //gestion de déplacement des x
        /*
                if (this.x + this.xVitesse + vSup >= w - this.scale * 100){
                    this.x = w - this.scale * 100;
                } else if(this.x + this.xVitesse + vSup <= this.scale * 100){
                    this.x = this.scale * 100;
                } else {
                    this.x = this.x + this.xVitesse + vSup;
                }


                if (this.y + this.yVitesse + vSup >= h - this.scale * 40){
                    this.y = h - this.scale * 40
                } else if(this.y + this.yVitesse + vSup <= this.scale * 40) {
                    this.y = this.scale * 40;
                } else {
                    this.y = this.y + this.yVitesse;
                }
                */
        if (this.touch) {
            this.rotation += .5;
            this.y += 15;
        } else {
            this.x += this.xVitesse;
            this.y += this.yVitesse;
        }
    }

    tryColision(w, h) {
        //collision en x
        if (!this.touch) {
            if (this.x >= w - this.scale * 100 || this.x <= this.scale * 100) {
                this.xVitesse = -this.xVitesse;
            }

            //colision en y
            if (this.y > h - this.scale * 40 || this.y <= this.scale * 100) {
                this.yVitesse = -this.yVitesse;
            }
        } else if (this.y >= h - this.scale * 40) {
            this.rotation -= .5;
            this.y = h - this.scale * 40;
        }
    }
}

