//lorsque que la page est chargé
window.onload = init;

let fw;
var xMouse, yMouse;

window.addEventListener('keydown', function (event) {
    if(event.keyCode == 37){
        fw.moveLanceur(37);
    } else if (event.keyCode === 39){
        fw.moveLanceur(39);
    } else if(event.keyCode == 32){
        fw.createMissille();
    }
});

//recupère la position su clique de la souris
function getMouse(event) {
     xMouse = event.clientX - fw.getPosXCanvas() + fw.getPosXScroll();
     yMouse = event.clientY - fw.getPosYCanvas() + fw.getPosYScroll();
     console.log(xMouse, yMouse);
}



function init(){
    fw = new FrameWork();
    fw.init();
}

function FrameWork(){

    let canvas, ctx;          //Les varaible du canvas
    let h, w;     //les dimension du canvas
    let tabObjectExtraterrestre = [];     //tableau avec tous les objets du canvas
    let tabObjectSoucoupe = [];
    let tabObjectMissille = [];
    var imageObj = new Image();
    let lanceur = new Lanceur(10, 550);
    let lose = false;
    let start = true;

    imageObj.src = 'fond.jpg';

    function init(){
        canvas = document.querySelector("#canvas");
        ctx = canvas.getContext("2d");
        getDimCanavs();     //recuperation des dimension du canvas

        requestAnimationFrame(animeCanvas);
    }

    //deplace le lanceur de missille
    function moveLanceur(key) {
        lanceur.move(key);
    };

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

        ctx.drawImage(imageObj, 0, 0, w, h);


        let h2 = h/2;
        let w2 = w/2;


        if(lose) {

            tabObjectSoucoupe.forEach(function (s) {
                s.draw(ctx);
            });

            ctx.font = "60pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "yellow";
            ctx.fillText("Vous avez perdu", w2, h2 + 50);

        }


        if (start) {

            if((xMouse > 60 && xMouse < 200) && (yMouse > 240 && yMouse < 270)){
                start = false;
            }

            ctx.font = "60pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "purple";
            ctx.fillText("Lunéar", w2 - 200, 100);

            let w3 = w/3;

            ctx.font = "30pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.fillText("Facile", 50, 400);

            ctx.font = "30pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.fillText("Intermédiare", w3, 400);

            ctx.font = "30pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
            ctx.fillText("Difficile", w3*2 + 50, 400);


        } else {

            tabObjectMissille.forEach(function (m) {
                m.draw(ctx);
                m.move();
            });


            tabObjectExtraterrestre.forEach(function (r) {
                r.draw(ctx);
                r.move();
                r.tryColision(w, h);
                r.rotationBras();
            });

            let col;

            //dessine les soucoupes volantes
            tabObjectSoucoupe.forEach(function (s) {
                s.draw(ctx);
                s.move(ctx);
                col = s.tryColision(w, h);
            });

            if(col){
                lose = true;
            }

            lanceur.draw(ctx);

            missilleSoucoupe();

            requestAnimationFrame(animeCanvas);
        }
    }

    //colission missile soucoupe
    function missilleSoucoupe(){
        tabObjectSoucoupe.forEach(function (s) {
            tabObjectMissille.forEach(function (m) {
                console.log(s.y, m.y);
                if(s.y == m.y && (s.x > m.x - s.x - 100 * s.scale && s.x < m.x + s.x - 100 *s.scale)){
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

        /*

        //genere la position y dans le canvas
        function genereY(scale){
            let ppY = Math.random() * h;
            if(ppY < scale * 100) {
                return ppY + scale * 100;
            } else if (ppY > h - scale * 40){
                return ppY - scale * 40;
            } else  {
                return ppY;
            }
        }*/

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
            //let posY = Math.floor(genereY(scale));       //position y
            let vitX = Math.floor(Math.random() * 6 - 12);
            let vitY = Math.floor(Math.random());
            let s = new Soucoupe(posX, -50, vitX, 1, scale);
            tabObjectSoucoupe.push(s);
        }

    }


    /*creer les missile lancer*/
    function createMissille(){
        let posX = lanceur.x + 7.5;
        let posY = lanceur.y;
        let missille = new Missille(posX, posY);
        tabObjectMissille.push(missille);
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


    function checkObject(xMouse, yMouse) {

    }


    /*Black box model*/
    return {
        init,
        clearTabE,
        clearTabS,
        createExtraterreste,
        createSoucoupe,
        getSpeedSoucoupe,
        setVitesse,
        moveLanceur,
        createMissille,
        getPosYScroll,
        getPosXScroll,
        getPosYCanvas,
        getPosXCanvas
    }
}