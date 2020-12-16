
let canvas,ctx;
let width= 700;
let height= 300;
let marioSprite;
let groundImg;
let ground={positionX: 0}
let mario={animation: 16, vx: 0, vy: 0, gravity: 2, jump: 23, vymax: 9, jumping: false, positionX: 50,positionY: 227}
let FPS=20;

//--------JUMP
document.addEventListener('keydown',(event) => {
    if(event.code == 'Space'){
        console.log('salta');
        jump()
    }
})

function jump(){
    if(mario.jumping === false){
        mario.jumping = true;
        mario.vy = mario.jump
    }
}
function gravity(){
    if(mario.jumping){
        if(mario.positionY - mario.vy - mario.gravity > 227){
            mario.jumping=false;
            mario.positionY=227;
            mario.vy=0;
        }else{
            mario.vy -= mario.gravity;
            mario.positionY -=  mario.vy;
        }
    }
}



//------- MAIN FUNCTION
let playGame = setInterval(function(){
    main();
},1000/FPS)

function main(){
    start();
    cleanCanvas();
    animation();
    printAll();
}
//-------INITIATION
function start(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    loadImage();
}
function loadImage(){
    marioSprite = new Image();
    groundImg=new Image();
    marioSprite.src= '../../assets/img/smallmariosheet.png';
    groundImg.src='../../assets/img/background.png'
}

//---------CLEAR CANVAS
function cleanCanvas(){
    canvas.width = width;
    canvas.height = height;
}

//----------PRINTS IN CANVAS
function printAll(){
    printMap();
    printMario();
}
function printMario(){
    ctx.drawImage(marioSprite,mario.animation,0,16,16,mario.positionX,mario.positionY,25,25)
}

function printMap(){
    ctx.drawImage(groundImg,ground.positionX,0,600,385,0,0,700,300)
}



//-------ANIMATIONS
function animation(){
    gravity();
    animationMario();
    animationGround();
}

function animationMario(){
    if(mario.jumping){
        if(mario.vy-mario.gravity >0){
            mario.animation=80;
        }else{
            mario.animation=96;
        }
    }else{
        if(mario.animation===16){
            mario.animation=32;
        }else if(mario.animation===32){
            mario.animation=48
        }else if(mario.animation>=48){
            mario.animation=16
        }
    }
}

function animationGround(){
    if(ground.positionX<400){
        ground.positionX+=10
    }else{
        ground.positionX=0
    }
}