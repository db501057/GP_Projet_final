//lorsque que la page est chargé
window.onload = init;

var fw;
var checkNuage;



function init(){
    fw = new FrameWork();
    fw.init();
}

/*Variable pour HTML et input*/
{
    //créer le nombre d'extraterrestre selctionné par le range
    function createNExtraterreste(nb) {
        fw.clearTabE();
        fw.createExtraterreste(nb);
        document.querySelector("#extra").innerHTML = nb;
    }

//recupere la couleur selectionnée pour les nuages
    function changeColorCloud(color) {
        fw.changeColor(color);
    }

//créer le nombre de soucoupe selectionné au range
    function createNSoucoupe(n) {
        fw.clearTabS();
        fw.createSoucoupe(n);
        document.querySelector("#nbSoucoupe").innerHTML = n;
    }

//recupere l'état de la radio box nuage
    function gereCloud(check) {
        checkNuage = check;
        fw.nuages();
    }

//recupere la vitesse du range vitesse soucoupes
    function getSpeedRange(speedM) {
        let newVitesse = (speedM - fw.getSpeedSoucoupe());
        fw.setVitesse(speedM);
        fw.moreSpeed(newVitesse);
        document.querySelector("#rVitesseS").innerHTML = speedM;
    }

//recupère la position su clique de la souris
    function getMouse(event) {
        let xMouse = event.clientX - fw.getPosXCanvas() + fw.getPosXScroll();
        let yMouse = event.clientY - fw.getPosYCanvas() + fw.getPosYScroll();
        fw.downSoucoupe(xMouse, yMouse);
    }
}

function FrameWork(){

    let canvas, ctx;          //Les varaible du canvas
    var h, w;     //les dimension du canvas
    let tabObjectExtraterrestre = [];     //tableau avec tous les objets du canvas
    let tabObjectCloud = [];
    let tabObjectSoucoupe = [];
    let couleur = Math.random() * 100 + 155;        //couleur des nuages au départ
    var colorCloud =  "rgb("+couleur+","+couleur+","+couleur+")";       //stockage de la couleur
    var speedSoucoupe = 0;      //vitesse en plus des soucoupe volantes

    function init(){
        canvas = document.querySelector("#canvas");
        ctx = canvas.getContext("2d");
        getDimCanavs();     //recuperation des dimension du canvas
        //animation du canvas
        setInterval(changeColorChap, 10);       //changement de la couleur du chapeau de l'extraterrestre
        setInterval(colorBrakeSoucoupe, 3);     //chnagem la couleur de la cabine de la soucoupe quand on clique dessus
        requestAnimationFrame(animeCanvas);

    }

    //renvoie la valeur de la vitesse des soucoupe précédente
    function getSpeedSoucoupe(){
        return speedSoucoupe;
    }

    //recupere les dimension du canvas en cas de redimensionnement de la page web
    function getDimCanavs() {
       w = canvas.width;
       h = canvas.height;
    }

    //animation
    function animeCanvas(){
        getDimCanavs();      //on verifie les dimension du canvas
        ctx.clearRect(0, 0, w, h);
        tabObjectExtraterrestre.forEach(function(r){
            r.draw(ctx);
            r.move();
            r.tryColision(w, h);
            r.rotationBras();
        });

        //dessine les soucoupes volantes
        tabObjectSoucoupe.forEach(function(s){
            s.draw(ctx);
            s.move(ctx);
            s.tryColision(w, h);
        });

        //desinnes les nuages
        tabObjectCloud.forEach(function(c){
            c.draw(ctx);
            c.move();
        });



        //test s'il faut recreer des nuages
        nuages();

        //regarde les nuage a supprimer qui sont dehor du canvas
        removeCloud(tabObjectCloud);


        requestAnimationFrame(animeCanvas);
    }

    //change la couleur du chapeau
    function changeColorChap() {
        tabObjectExtraterrestre.forEach(function (e){
            if (e.colorChap === 'white') {
                e.colorChap = 'red';
            } else if (e.colorChap === 'red') {
                e.colorChap = 'white';
            }
        });
    }

    //color de la soucoupe cassé
    function colorBrakeSoucoupe(){
        tabObjectSoucoupe.forEach(function (s) {
           if (s.touch){
                if(s.colorC === 'lightblue'){
                    s.colorC = 'yellow';
                } else if (s.colorC === "yellow"){
                    s.colorC = "red";
                } else if (s.colorC === "red"){
                    s.colorC = 'yellow'
                }
           } else {
               s.colorC = 'lightblue';
           }
        });
    }

    //vide la liste des objets
    function clearTabE(){
        tabObjectExtraterrestre = [];
    }

    function clearTabS() {
        tabObjectSoucoupe = [];
    }

    //creer un nombre n d'extraterreste
    function createExtraterreste(n){

        //genere la position x dans le canvas
        function genereX(scale){
            let ppX = Math.random() * w;
            if(ppX < scale * 85) {
                return ppX + scale * 85;
            } else if (ppX > w - scale * 185){
                return ppX - scale * 185;
            } else  {
                return ppX;
            }
        }

        //genere la position y dans le canvas
        function genereY(scale){
            let ppY = Math.random() * h;
            if(ppY < scale * 90) {
                return ppY + scale * 90;
            } else if (ppY > h - scale * 160){
                return ppY - scale * 160;
            } else  {
                return ppY;
            }
        }

        //genere un échelle aléatoire != 0
        function genereScale(){
            let ps = Math.random() * 0.7;
            if (ps == 0){
                return ps + 0.1
            } else {
                return ps;
            }
        }

        //genere les n objets extraterrestres
        for(i = 0; i < n; i++){
            let scale = genereScale();      //genere un échelle au hasard
            let posX = Math.floor(genereX(scale));       //position x
            let posY = Math.floor(genereY(scale));       //position y
            let vitX = Math.random() * 2;
            let vitY = Math.random() * 2;
            let e = new Extraterrestre(posX, posY, vitX, vitY, scale);
            tabObjectExtraterrestre.push(e);
        }

    }

    //creer des nuages
    function createCloud(){
        let vitesseD = Math.random() * 2 + .1;       //vitesse du nuage
        let size = Math.random() * 60 + 60;
        //creation d l'objet nuage
        let Ncloud = new Cloud(vitesseD, colorCloud, size, w);
        tabObjectCloud.push(Ncloud);
    }

    //creation d'un nouvau nuages s'il y a lieu
    function newCloud(){
        var max = 0;
        var taille = 0;
        tabObjectCloud.forEach(function(c){
            if(max < c.x + 10){
                max = c.x;
                taille = c.taille;
            }
        });
        if(w - taille > max){
            createCloud();
        }
    }

    //supprimer un nuage
    function removeCloud(tab){
        tab.sort();
        for(var i = 0; i < tab.length; i++){
            if(tab[i].x < - tab[i].taille){
                tab.shift();
            }
        }
    }

    //change la couleur des nuages
    function changeColor(color) {
        colorCloud = color;
    }


    //creer n soucoupes volante
    function createSoucoupe(n){

        //genere la position x dans le canvas
        function genereX(scale){
            let ppX = Math.random() * w;
            if(ppX < scale * 100) {
                return ppX + scale * 100;
            } else if (ppX > w - scale * 100){
                return ppX - scale * 100;
            } else  {
                return ppX;
            }
        }

        //genere la position y dans le canvas
        function genereY(scale){
            let ppY = Math.random() * h;
            if(ppY < scale * 60) {
                return ppY + scale * 60;
            } else if (ppY > h - scale * 60){
                return ppY - scale * 60;
            } else  {
                return ppY;
            }
        }

        //genere un échelle aléatoire != 0
        function genereScale(){
            let ps = Math.random() * 0.7;
            if (ps === 0){
                return ps + 0.1
            } else {
                return ps;
            }
        }

        //genere les n objets soucoupes
        for(i = 0; i < n; i++){
            let scale = genereScale();      //genere un échelle au hasard
            let posX = Math.floor(genereX(scale));       //position x
            let posY = Math.floor(genereY(scale));       //position y
            let vitX = Math.floor(Math.random() * 6 - 12);
            let vitY = Math.floor(Math.random() * 6 - 12);
            let s = new Soucoupe(posX, posY, vitX, vitY, scale);
            tabObjectSoucoupe.push(s);
        }

    }

    //gere nuage
    function nuages(){
        if (checkNuage){
            newCloud();
        }
    }

    //augmente la vitesse des soucoupe en fonction du slider
    function moreSpeed(speedS){
        tabObjectSoucoupe.forEach(function(s){
            if(s.xVitesse >= 0){
                s.xVitesse += speedS;
            } else if(s.xVitesse < 0){
                s.xVitesse -= speedS;
            }

            if(s.yVitesse >= 0){
                s.yVitesse += speedS;
            } else if (s.yVitesse < 0){
                s.yVitesse -= speedS;
            }
            /*console.log(s.xVitesse);
            s.xVitesse += speedS;
            console.log(s.xVitesse);
            s.yVitesse += speedS;*/
        });
    }

    //modifier la variable vitesse
    function setVitesse(newSpeed){
        speedSoucoupe = newSpeed;
    }

    //retorune la position x du canvas dans la page HTML
    function getPosXCanvas(){
        return canvas.offsetLeft;
    }

    //retorune la position y du canavs dans la page html
    function getPosYCanvas(){
        return canvas.offsetTop;
    }

    //renvoye les coordonée du scroll
    function getPosXScroll(){
        return window.scrollX;
    }

    function getPosYScroll(){
        return window.scrollY;
    }

    //fait tomber la soucoupe si on a cliqué dessus
    function downSoucoupe(xMouse, yMouse){
        tabObjectSoucoupe.forEach(function(s){
           if(xMouse >= s.x - 50 && xMouse <= s.x + 50 && yMouse >= s.y - 50 && yMouse <= s.y + 50){
               if (s.touch){
                   s.touch = false;
                   s.rotation = 0;
               } else {
                   s.touch = true;
               }
           }
        });
    }

    /*Black box model*/
    return {
        init,
        clearTabE,
        clearTabS,
        createExtraterreste,
        changeColor,
        createSoucoupe,
        nuages,
        moreSpeed,
        getSpeedSoucoupe,
        setVitesse,
        getPosXCanvas,
        getPosYCanvas,
        downSoucoupe,
        getPosXScroll,
        getPosYScroll
    }


}

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


//class de l'extraterrestre
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


//class des nuages
class Cloud extends ObjetGraphique {
    constructor(xVitesse, couleur, taille, w){
        super(xVitesse, couleur);
        this.vitesse = xVitesse;
        this.taille = taille;
        this.couleur = couleur;
        this.x = Math.random() * w/5 + 800;
    }

    //dessine les nuages
    draw(ctx, w){
        ctx.save();
        ctx.translate(this.x, -30);
        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(0, 0, this.taille, 0, Math.PI * Math.random() + Math.PI);
        ctx.fill();
        ctx.restore();
    }

    //dplace les nuages
    move(){
        this.x -= this.vitesse;
    }
}


//class des soucoupes volante
class Soucoupe extends ObjetGraphique{
    constructor(posX, posY, vitesseX, vitesseY, scale){
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

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.rotation);
        this.soute(ctx);
        ctx.strokeStyle = "darkslategray";
        ctx.fillStyle = "darkslategray";
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 100, Math.PI/2, 0, Math.PI*2, 0);
        ctx.fill();
        ctx.stroke();
        this.cabine(ctx);

        ctx.restore();
    }

    cabine(ctx){
        ctx.save();
        ctx.translate(0,0);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.fillStyle = this.colorC;
        ctx.arc(0, 0, 50, 0, Math.PI);
        ctx.fill();
        ctx.stroke();
        this.antenne(ctx, -20*Math.PI/180, 20,45);
        this.antenne(ctx, 20*Math.PI/180, -20,45);
        ctx.restore();
    }

    //les antennes de la soucoupe
    antenne(ctx, rotation, tX, tY){
        ctx.save();
        ctx.rotate(rotation);
        ctx.translate(tX, tY);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0, 40);
        ctx.stroke();
        ctx.translate(0,40);
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.strokeStyle = "gray";
        ctx.arc(0,0, 4, 0, Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }


    soute(ctx){
        ctx.save();
        ctx.translate(0,10);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.strokeStyle = "dimgray";
        ctx.fillStyle = "dimgray";
        ctx.ellipse(0, 0, 80, 30, 0, Math.PI, Math.PI*2);
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
        if(this.touch){
            this.rotation += .5;
            this.y += 15;
        } else {
            this.x += this.xVitesse;
            this.y += this.yVitesse;
        }
    }

    tryColision(w, h){
        //collision en x
        if (!this.touch){
            if (this.x >= w - this.scale * 100|| this.x <= this.scale * 100) {
                this.xVitesse = -this.xVitesse;
            }

            //colision en y
            if (this.y > h - this.scale * 40|| this.y <= this.scale * 60) {
                this.yVitesse = -this.yVitesse;
            }
        } else if (this.y >= h - this.scale * 40){
            this.rotation -= .5;
            this.y = h - this.scale * 40;
        }
    }

}