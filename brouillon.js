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
