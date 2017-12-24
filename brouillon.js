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

