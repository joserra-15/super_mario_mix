document.addEventListener('keydown',(event) => {
    if(event.code == 'Space'){
        console.log('salta');
    }
})
let canvas,ctx;
let width= 700;
let height= 300;
let marioSprite;
let ground;
let x=16;
let FPS=10;

function start(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    loadImage();
}

let playGame = setInterval(function(){
    main();
},1000/FPS)

function loadImage(){
    marioSprite = new Image();
    ground=new Image();
    marioSprite.src= '../../assets/img/smallmariosheet.png';
}


function cleanCanvas(){
    canvas.width = width;
    canvas.height = height;
}

function printMario(){
    if(x===16){
        x=32;
    }else if(x===32){
        x=48
    }else if(x===48){
        x=16
    }
    ctx.drawImage(marioSprite,x,0,16,16,50,200,20,20)
}

function main(){
    start();
    cleanCanvas();
    printMario();

}



