
let canvas,ctx;
let width= 600;
let height= 300;
let marioSprite, groundImg, pipeImg;
let pipe={positionX: width+100, positionY: 215}
let ground={positionX: 0}
let mario={animation: 16, vx: 0, vy: 0, gravity: 2, jump: 20, vymax: 9, jumping: false, positionX: 50,positionY: 227}
let level={speed: 9, score: 0, finish: false}
let FPS=20;
const audioJump=document.getElementById("audio_jump");

document.addEventListener('load', start());

//--------JUMP
document.addEventListener('keydown',(event) => {
    if(event.code == 'Space'){
        jump()
    }
})
document.addEventListener('click', e=>{
    if(e.target.id==="canvas"){
        jump();
    }
})

function jump(){
    if(mario.jumping === false){
        audioJump.play()
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
    pipeImg=new Image();
    marioSprite.src= '../../assets/img/smallmariosheet.png';
    groundImg.src='../../assets/img/background.png'
    pipeImg.src='../../assets/img/mapsheet.png'
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
    printPipe();
}

function printMario(){
    ctx.drawImage(marioSprite,mario.animation,0,16,16,mario.positionX,mario.positionY,25,25)
}

function printMap(){
    ctx.drawImage(groundImg,ground.positionX,0,600,385,0,0,600,300)
}

function printPipe(){
    ctx.drawImage(pipeImg,160,0,32,32,pipe.positionX,pipe.positionY,40,40)
}



//-------ANIMATIONS
function animation(){
    gravity();
    animationMario();
    animationGround();
    animationPipe();
    collision();
    scoreUpdate();
}

function animationMario(){
    if(mario.jumping){
        if(mario.vy-mario.gravity >0){
            mario.animation=80;
        }else{
            mario.animation=96;
        }
    }else if(level.finish){
        mario.animation=0
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
    if(ground.positionX>=width){
        ground.positionX=0
    }else{
        ground.positionX+=level.speed
    }
}
function animationPipe(){
    if(pipe.positionX>0){
        if(level.finish===false){
            pipe.positionX-= level.speed - 0.18
        }
    }else{
        pipe.positionX=width + random();
        level.speed++
        mario.gravity+=0.2;
        mario.jump++
    }
}

function random(){
    let random= Math.random()
    return Math.round(random*100)
}

//--------COLLISION
function collision(){
    if(pipe.positionX >= mario.positionX && pipe.positionX <= mario.positionX + 25){
        if(mario.positionY>= pipe.positionY -40){
            level.finish = true;
            level.speed = 0;
            mario.animation=0;
        }
    }
}


//---------SCORE AND LEVEL UPDATE
function scoreUpdate(){
    
}

