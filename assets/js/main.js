
let canvas,ctx;
const width= 600;
const height= 300;
let marioSprite, groundImg, pipeImg, cloudImg;
const pipe={positionX: width+100, positionY: 215}
const clouds={cloud1:{
    positionX: width+random(),
    positionY: 100,
},cloud2: {
    positionX: width+random()*2,
    positionY: 150,
}}
const ground={positionX: 0}
const mario={animation: 16, vx: 0, vy: 0, gravity: 2, jump: 20, vymax: 9, jumping: false, positionX: 50,positionY: 227}
const level={speed: 9, score: 0, finish: false}
let user={name: "jose", highScore: 0}
let FPS=20;
let playGame;
const audioJump=document.getElementById("audio_jump");
const audioDead=document.getElementById("audio_dead");

document.addEventListener('load', start());

function start(){
    getLocalStorage();
    playGame = setInterval(function(){
        main();
    },1000/FPS)
}


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

function main(){
    initiation();
    cleanCanvas();
    animation();
    printAll();
    collision();
    scoreUpdate();
}
//-------INITIATION
function initiation(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    loadImage();
}
function loadImage(){
    marioSprite = new Image();
    groundImg=new Image();
    pipeImg=new Image();
    cloudImg=new Image();
    marioSprite.src= '../../assets/img/smallmariosheet.png';
    groundImg.src='../../assets/img/background.png'
    pipeImg.src='../../assets/img/tiles.png'
    cloudImg.src='../../assets/img/tiles.png'
}

//---------CLEAR CANVAS
function cleanCanvas(){
    canvas.width = width;
    canvas.height = height;
}

//----------PRINTS IN CANVAS
function printAll(){
    printMap();
    printCloud();
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
    ctx.drawImage(pipeImg,0,128,32,32,pipe.positionX,pipe.positionY,40,40)
}

function printCloud(){
    ctx.drawImage(cloudImg,8,320,32,32,clouds.cloud1.positionX,clouds.cloud1.positionY,32,32);
    ctx.drawImage(cloudImg,8,320,32,32,clouds.cloud2.positionX,clouds.cloud2.positionY,32,32);
}


//-------ANIMATIONS
function animation(){
    gravity();
    animationMario();
    animationGround();
    animationPipe();
    animationClouds();
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
    if(pipe.positionX>-40){
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
function animationClouds(){
    if(clouds.cloud1.positionX>-32){
        clouds.cloud1.positionX-=level.speed/2
    }else{
        clouds.cloud1.positionX=width + random();
        clouds.cloud1.positionY=random();
    }
    if(clouds.cloud2.positionX>-32){
        clouds.cloud2.positionX-=level.speed/2
    }else{
        clouds.cloud2.positionX=width + random()*2;
        clouds.cloud2.positionY=random();
    }
}
function random(){
    let random= Math.random()
    return Math.round(random*200)
}

//--------COLLISION
function collision(){
    if(pipe.positionX +40  >= mario.positionX && pipe.positionX <= mario.positionX + 25){
        if(mario.positionY>= pipe.positionY -40){
            if(level.finish===false){
                audioDead.play();
            }
            level.finish = true;
            level.speed = 0;
            mario.animation=0;
        }
    }
}


//---------SCORE AND LEVEL UPDATE
function scoreUpdate(){
    ctx.font = "17px super_mario";
    ctx.fillStyle="#FFD700";
    ctx.lineWidth="2";
    ctx.strokeStyle= "#000000";
    ctx.fillText(`HS: ${user.highScore} m, Score: ${level.score} m`,300,30)
    ctx.strokeText(`HS: ${user.highScore} m, Score: ${level.score} m`,300,30)
    if(level.finish){
        ctx.font = "30px super_mario";
        ctx.lineWidth="3";
        ctx.fillStyle="#FFD700";
        ctx.fillText(`GAME OVER`,200,135)
        ctx.strokeText(`GAME OVER`,200,135)
        updateLocalStorage(level.score)
    }else{
        level.score++
    }
}


//--------LOCALSTORAGE

function updateLocalStorage(hs){
    if(user.highScore<hs){
        user.highScore= hs;
    }
    localStorage.setItem('user',JSON.stringify(user));
}

function getLocalStorage(){
    user= JSON.parse(localStorage.getItem('user'));
}


