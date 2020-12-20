const levelInvaders={speed: 0.2, score: 0, finish: false, start: false, delayAnimation:0,}
let plantImage, fireballImage, squidImage
const plant={animation: 0, speed: 7, shoot: false, positionX: 276,positionY: 250}
let fireballArray=[]
let squidArray=[]

class Fireball{
    constructor(animation, vy, time, positionY, positionX){
        this.animation = animation
        this.vy = vy
        this.time = time
        this.positionY = positionY
        this.positionX = positionX
        this.hit=false
    }
}

class Squid{
    constructor(animation, positionX, positionY){
        this.animation= animation;
        this.positionX= positionX;
        this.positionY= positionY;
        this.vy = 8;
        this.vx = 2;
        this.dead= false;
    }
}

function startInvaders(){
    levelInvaders.start=true
    playGameInvader = setInterval(function(){
        mainInvader();
    },1000/FPS)
}

function createInvaders(){
    if(squidArray.length===0){
        create()
        levelInvaders.speed+=0.2
        squidArray.forEach(e=>e.vx+=levelInvaders.speed)
    }

    function create(){
        for(let i=100; i<500; i+=30){
            for(let j=0; j<100; j+=30){
                    let newSquid= new Squid(240, i, j);
                    squidArray.push(newSquid)
            }
        }
    }
}

//------- MAIN FUNCTION

function mainInvader(){
    initiationInvaders();
    cleanCanvas();
    createInvaders();
    animationInvaders();
    printAllInvaders();
    collisionInvaders();
    scoreUpdateInvaders();
    finishPlayGameInvaders();
}


function initiationInvaders(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
    loadImageInvaders();
}
function loadImageInvaders(){
    plantImage = new Image();
    fireballImage = new Image();
    squidImage = new Image();
    plantImage.src= '../../assets/img/enemysheet.png';
    fireballImage.src= '../../assets/img/particlesheet.png';
    squidImage.src= '../../assets/img/characters.gif';
}


//----------PRINTS IN CANVAS
function printAllInvaders(){
    printMapInvaders();
    printPlant();
    printAllFireball();
    printInvaders();
}
function printInvaders(){
    squidArray = squidArray.filter(squid=>squid.dead===false)
    squidArray.forEach(squid=>ctx.drawImage(squidImage,squid.animation,257,16,30,squid.positionX,squid.positionY,16,32))
}

function printPlant(){
    ctx.drawImage(plantImage,plant.animation,192,16,32,plant.positionX,plant.positionY,24,40)
}

function printMapInvaders(){
    ctx.fillRect(0, 0, 600, 300)
}

function printAllFireball(){
    if(fireballArray.length!==0){
        fireballArray=fireballArray.filter(fireball=>{
            if(fireball.positionY>=0 && fireball.hit===false){return true}else{return false}})
        fireballArray.forEach(fireball=>ctx.drawImage(fireballImage,fireball.animation,24,8,8,fireball.positionX,fireball.positionY,16,16))
    }
}

//-------ANIMATIONS
function animationInvaders(){
    animationShootPlant();
    fireballAnimation();
    squidAnimation();
}

function animationShootPlant(){
    if(levelInvaders.delayAnimation>2){
        if(plant.shoot){
            plant.animation=16;
            plant.shoot=false;
        }else{
            plant.animation=0;
        }
        levelInvaders.delayAnimation=0
    }else{
        levelInvaders.delayAnimation++
    }
}

function fireballAnimation(){
    fireballArray.forEach(fireball=>{
        fireball.positionY-=fireball.vy
        if(levelInvaders.delayAnimation>2){
            if(fireball.animation===0){
                fireball.animation=8;
            }else if(fireball.animation===8){
                fireball.animation=16
            }else if(fireball.animation===16){
                fireball.animation=24
            }else if(fireball.animation===24){
                fireball.animation=0
            }
        }
    })
}
function squidAnimation(){
    let jumpLine=false
    squidArray.forEach(squid=>{
        if(squid.positionX > 16 && squid.positionX < 570){
        }else{
            jumpLine=true
        }
        if(levelInvaders.delayAnimation>2){
            if(squid.animation===240){
                squid.animation=257
            }else if(squid.animation===257){
                squid.animation=240
            }
        }
        if(squid.positionY + 20>plant.positionY){
            levelInvaders.finish=true
        }
    })
    squidArray.forEach(squid=>{
        if(jumpLine===false){
            squid.positionX += squid.vx
        }else{
            squid.positionY +=squid.vy
            squid.vx=-squid.vx
            squid.positionX += squid.vx
            squid.vx>0?squid.vx += levelInvaders.speed:squid.vx += - levelInvaders.speed
        }
    })
}

//--------COLLISION
function collisionInvaders(){
    fireballArray.forEach(fireball=>{
        squidArray.forEach(squid=>{
            if(squid.positionY + 32 > fireball.positionY && squid.positionY < fireball.positionY + 16 && squid.positionX + 16 > fireball.positionX && squid.positionX < fireball.positionX +16){
                squid.dead=true;
                fireball.hit=true;
                levelInvaders.score++;
            }
        }
    )})
}

//-------SCORE UPDATE
function scoreUpdateInvaders(){
    ctx.font = "17px super_mario";
    ctx.fillStyle="#FFD700";
    ctx.lineWidth="2";
    ctx.strokeStyle= "#000000";
    ctx.fillText(`Score: ${levelInvaders.score}`,10,30)
    ctx.strokeText(`Score: ${levelInvaders.score}`,10,30)
    if(levelInvaders.finish){
        ctx.font = "30px super_mario";
        ctx.lineWidth="3";
        ctx.fillStyle="#FFD700";
        ctx.fillText(`GAME OVER`,200,135)
        ctx.strokeText(`GAME OVER`,200,135)
        //updateLocalStorage(level.score)
    }
}

    //------LISTENER SPACE BAR
document.addEventListener('keydown',(event) => {
    if(event.code == 'Space'){
        event.preventDefault();
        if( level.start){
            jump()
        }
        if(levelInvaders.start){
            shoot()
        }
    }
    if(event.code ==  'ArrowLeft'){
        event.preventDefault();
        if(levelInvaders.start){
            moveLeft()
        }
    }
    if(event.code ==  'ArrowRight'){
        event.preventDefault();
        if(levelInvaders.start){
            moveRight()
        }
    }
})



function moveLeft(){
    if(plant.positionX > 16){
        plant.positionX -= plant.speed
    }
}

function moveRight(){
    if(plant.positionX < 584){
        plant.positionX += plant.speed
    }
}

function shoot(){
    printFireball()
}

function printFireball(){
    let time= Date.now()
    if(fireballArray.length === 0 ){
        createNewFireball(time)
    }else if(time - 500 > fireballArray[fireballArray.length-1].time){
        createNewFireball(time)
    }
}

function createNewFireball(time){
    let fireball= new Fireball(0, 5, time, 250, plant.positionX+6)
    ctx.drawImage(fireballImage,fireball.animation,24,8,8,fireball.positionX,fireball.positionY,16,16)
    plant.shoot=true
    fireballArray.push(fireball);
}

//----------FINISH AND RESET

function finishPlayGameInvaders(){
    if(levelInvaders.finish===true){
        clearInterval(playGameInvader);
        resetMarioInvaders();
        setTimeout(()=>{
            menu.classList.toggle('hidden');
            document.getElementById('canvas').classList.toggle('hidden');
            menuButtons.children[0].focus()
            addListenerMenuButtons()
        },3000)
    }
}

function resetMarioInvaders(){
    fireballArray=[]
    squidArray=[]
    ground.positionX=0;
    plant.animation=0;
    plant.speed=7;
    plant.shoot=false;
    plant.positionX=276;
    plant.positionY=250;
    levelInvaders.speed=0.2;
    levelInvaders.score=0;
    levelInvaders.finish=false;
    levelInvaders.start=false;
    levelInvaders.delayAnimation=0;

}
