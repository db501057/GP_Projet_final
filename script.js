//lorsque que la page est chargé
window.onload = init;

let fw;
var xMouse, yMouse;
let facile, intermediare, difficile;
let cmp = 0;
let prenom = "";


//recupère la position su clique de la souris
function getMouse(event) {
     xMouse = event.clientX - fw.getPosXCanvas() + fw.getPosXScroll();
     yMouse = event.clientY - fw.getPosYCanvas() + fw.getPosYScroll();
     fw.mouseClick();
}

function getPrenom(prenomS){
    prenom = prenomS;
}

setInterval(function () {
    if(facile){
        fw.createSoucoupe(2)
    }
    if(intermediare){
        fw.createSoucoupe(7);
    }
    if(difficile){
        fw.createSoucoupe(13);
    }
}, 2000);

function init(){
    fw = new FrameWork();
    fw.init();
}

function FrameWork(){

    let canvas, ctx;          //Les varaible du canvas
    let h, w;     //les dimension du canvas
    let tabObjectExtraterrestre = [];     //tableau avec tous les objets du canvas
    let tabObjectSoucoupe = [];
    var imageObj = new Image();
    let lanceur = new Lanceur(10, 550);
    let lose = false;
    let start = true;
    let span = document.querySelector('#tir');
    let colission = false;


    imageObj.src = 'fond.jpg';

    function init(){
        canvas = document.querySelector("#canvas");
        ctx = canvas.getContext("2d");
        getDimCanavs();     //recuperation des dimension du canvas


        requestAnimationFrame(animeCanvas);
    }


    function mouseClick(){
        tabObjectSoucoupe.forEach(function (s) {
            if((s.x > xMouse - 100 * s.getScale() && s.x < xMouse + 100 *s.getScale()) && (s.y > yMouse - 70*s.getScale() && s.y > yMouse + 70*s.getScale())){
                cmp++;
                s.drawTF = false;
            }
        })
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

        if(prenom != "") {
            span.innerHTML = prenom;
        }

        getDimCanavs();      //on verifie les dimension du canvas
        ctx.clearRect(0, 0, w, h);

        ctx.drawImage(imageObj, 0, 0, w, h);


        let h2 = h/2;
        let w2 = w/2;


        if(lose) {

            tabObjectSoucoupe.forEach(function (s) {
                s.draw(ctx);
            });

            ctx.font = "40pt Monaco";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "yellow";
            ctx.fillText("Vous avez perdu", w2 - 200, h2 + 50);

        }


        if (start) {

            //facile
            if((xMouse > 60 && xMouse < 200) && (yMouse > 240 && yMouse < 270)){
                start = false;
                facile = true;
            }

            //intermédiare
            if((xMouse > 340 && xMouse < 640) && (yMouse > 240 && yMouse < 270)){
                start = false;
                intermediare = true;
            }

            //dificile
            if((xMouse > 720 && xMouse < 950) && (yMouse > 240 && yMouse < 270)){
                start = false;
                difficile = true;
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

            tabObjectExtraterrestre.forEach(function (r) {
                r.draw(ctx);
                r.move();
                r.tryColision(w, h);
                r.rotationBras();
            });

            //dessine les soucoupes volantes
            tabObjectSoucoupe.forEach(function (s) {
                s.draw(ctx);
                s.move(ctx);
                colission = s.tryColision(w, h);
            });


            if(colission){
                lose = true;
            }
        }

        requestAnimationFrame(animeCanvas);
    }

    function clearTabS() {
        tabObjectSoucoupe = [];
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

    /*gestion souris canvas*/
    {
        //retorune la position x du canvas dans la page HTML
        function getPosXCanvas() {
            return canvas.offsetLeft;
        }

        //retorune la position y du canavs dans la page html
        function getPosYCanvas() {
            return canvas.offsetTop;
        }

        //renvoye les coordonée du scroll
        function getPosXScroll() {
            return window.scrollX;
        }

        function getPosYScroll() {
            return window.scrollY;
        }

    }

    /*Black box model*/
    return {
        init,
        clearTabS,
        createSoucoupe,
        getSpeedSoucoupe,
        getPosYScroll,
        getPosXScroll,
        getPosYCanvas,
        getPosXCanvas,
        mouseClick
    }
}