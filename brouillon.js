//fait tomber la soucoupe si on a cliqué dessus



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


//créer le nombre d'extraterrestre selctionné par le range
function createNExtraterreste(nb) {
    fw.clearTabE();
    fw.createExtraterreste(nb);
    document.querySelector("#extra").innerHTML = nb;
}

//créer le nombre de soucoupe selectionné au range
function createNSoucoupe(n) {
    fw.clearTabS();
    fw.createSoucoupe(n);
    document.querySelector("#nbSoucoupe").innerHTML = n;
}

//recupere la vitesse du range vitesse soucoupes
function getSpeedRange(speedM) {
    let newVitesse = (speedM - fw.getSpeedSoucoupe());
    fw.setVitesse(speedM);
    fw.moreSpeed(newVitesse);
    document.querySelector("#rVitesseS").innerHTML = speedM;
}


//modifier la variable vitesse
function setVitesse(newSpeed){
    speedSoucoupe = newSpeed;
}


/*creer les missile lancer*/
function createMissille(){
    let posX = lanceur.x + 7.5;
    let posY = lanceur.y;
    let missille = new Missille(posX, posY);
    tabObjectMissille.push(missille);
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


//colission missile soucoupe
function missilleSoucoupe(){
    tabObjectSoucoupe.forEach(function (s) {
        tabObjectMissille.forEach(function (m) {
            console.log(s.y, m.y);
            if((s.x > m.x && s.x < m.x) && (s.y > m.y && s.y < m.y)){
                s.pop();
                m.pop();
            }
        })
    })
}

//vide la liste des objets
function clearTabE(){
    tabObjectExtraterrestre = [];
}


window.addEventListener('keydown', function (event) {
    if(event.keyCode == 37){
        fw.moveLanceur(37);
    } else if (event.keyCode === 39){
        fw.moveLanceur(39);
    } else if(event.keyCode == 32){
        fw.createMissille();
    }
});

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


&& (yMouse >= s.y && yMouse <= s.y)


//deplace le lanceur de missille
function moveLanceur(key) {
    lanceur.move(key);
};

