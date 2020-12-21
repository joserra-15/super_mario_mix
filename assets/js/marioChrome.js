/*let playGame;
let marioSprite, groundImg, pipeImg, cloudImg;
const pipe={positionX: width+100, positionY: 215}
const clouds={cloud1:{
    positionX: width+100,
    positionY: 100,
},cloud2: {
    positionX: width+200,
    positionY: 150,
}}
const ground={positionX: 0}
const mario={animation: 16, vy: 0, gravity: 2, jump: 20, jumping: false, positionX: 50,positionY: 227}
const level={speed: 9, score: 0, finish: false, start: false}
let FPS=20;*/
let pipeArray=[]
let cloudsArray=[]
class Pipe{
    constructor(){
        this.positionX= width + Math.random()
        this.positionY= 215
    }
}
class Cloud{
    constructor(){
        this.positionX= width + Math.random()
        this.positionY= random()
    }
}

function start(){
    level.start=true
    playGame = setInterval(function(){
        main();
    },1000/FPS)
}


//--------JUMP


function jump(){
    if(mario.jumping === false){
        audioJump.play()
        mario.jumping = true;
        mario.vy = mario.jump
    }else{
        if(mario.doubleJump===false){
            audioJump.play()
            mario.doubleJump = true;
            mario.vy=0
            mario.vy = mario.jump/1.5
        }
    }
}
function gravity(){
    if(mario.jumping){
        if(mario.positionY - mario.vy - mario.gravity > 227){
            mario.jumping=false;
            mario.doubleJump=false;
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
    finishPlayGame();
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
    if(random()<4){
        pipeArray.push(new Pipe)
    }
    if(pipeArray.length!== 0){
        pipeArray.forEach(pipe=>{
            ctx.drawImage(pipeImg,0,128,32,32,pipe.positionX,pipe.positionY,40,40)})
    }
}

function printCloud(){
    if(random()<3){
        cloudsArray.push(new Cloud)
    }
    if(cloudsArray.length!=0){
        cloudsArray.forEach(cloud=>ctx.drawImage(cloudImg,64,336,16,16,cloud.positionX,cloud.positionY,16,16))
    }
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
    pipeArray.forEach(pipe=>{
        if(pipe.positionX>-40){
            if(level.finish===false){
                pipe.positionX-= level.speed - 0.18
            }
        }
    })
}
function animationClouds(){
    cloudsArray.forEach(cloud=>{
        if(cloud.positionX>-32){
            cloud.positionX-=level.speed/2
        }
    })
}
function random(){
    let random= Math.random()
    return Math.round(random*200)
}

//--------COLLISION
function collision(){
    pipeArray.forEach(pipe=>{
        if(pipe.positionX + 40  >= mario.positionX -2 && pipe.positionX <= mario.positionX + 23){
            if(mario.positionY-23>= pipe.positionY -40){
                if(level.finish===false){
                    audioDeath.play();
                }
                level.finish = true;
                level.speed = 0;
                mario.animation=0;
            }
        }
    })
}


//---------SCORE AND LEVEL UPDATE
function scoreUpdate(){
    if(level.score>level.compareRound){
        level.speed+=0.2
        level.compareRound=level.score+100
    }
    ctx.font = "17px super_mario";
    ctx.fillStyle="#FFD700";
    ctx.lineWidth="2";
    ctx.strokeStyle= "#000000";
    ctx.fillText(`HS: ${userActive.highScore} m Score: ${level.score} m`,300,30)
    ctx.strokeText(`HS: ${userActive.highScore} m Score: ${level.score} m`,300,30)
    if(level.finish){
        ctx.font = "30px super_mario";
        ctx.lineWidth="3";
        ctx.fillStyle="#FFD700";
        ctx.fillText(`GAME OVER`,200,135)
        ctx.strokeText(`GAME OVER`,200,135)
        updateLocalStorage(level.score, userActive.highScoreInvaders)
    }else{
        level.score++
    }
}


//----------FINISH AND RESET

function finishPlayGame(){
    if(level.finish===true){
        clearInterval(playGame);
        resetMarioChrome();
        userData.innerHTML=""
        userData.innerHTML=`<p>USERNAME: ${userActive.name}</p>
        <p> HS: ${userActive.highScore} M, HS: ${userActive.highScoreInvaders} PTS</p>`
        setTimeout(()=>{
            menu.classList.toggle('hidden');
            document.getElementById('canvas').classList.toggle('hidden');
            menuButtons.children[0].focus()
            addListenerMenuButtons()
        },3000)
    }
}

function resetMarioChrome(){
    //pipe.positionX= width+random();
    //pipe.positionY= 215;
    pipeArray=[]
    cloudsArray=[]
    ground.positionX=0;
    mario.animation=16;
    mario.vy=0;
    mario.gravity=2;
    mario.jump=20;
    mario.jumping=false;
    mario.positionX=50;
    mario.positionY=227;
    level.speed=9;
    level.score=0;
    level.finish=false;
    level.start=false;
}

//--------LOCALSTORAGE

function updateLocalStorage(hs, hp){
    if(userActive.highScore<hs){
        userActive.highScore= hs;
        users.forEach(user=>{
            if(user.name===userActive.name){
                user.highScore= hs
            }
        })
    }
    if(userActive.highScoreInvaders < hp){
        userActive.highScoreInvaders= hp;
        users.forEach(user=>{
            if(user.name===userActive.name){
                user.highScoreInvaders= hp
            }
        })
    }
    localStorage.setItem('users',JSON.stringify(users));
}

function getLocalStorage(){
    users= JSON.parse(localStorage.getItem('users'));
}
