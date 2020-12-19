const levelInvaders={speed: 9, score: 0, finish: false, start: false}
let plantImage, fireballImage, squidImage
const plant={animation: 0, speed: 5, shoot: false, positionX: 276,positionY: 250}
let fireballArray=[]
let squidArray=[]
let delayAnimation=0

class Fireball{
    constructor(animation, vy, time, positionY, positionX){
        this.animation = animation
        this.vy = vy
        this.time = time
        this.positionY = positionY
        this.positionX = positionX
    }
}

class Squid{
    constructor(animation, positionX, positionY){
        this.animation= animation;
        this.positionX= positionX;
        this.positionY= positionY;
        this.vy = 25;
        this.vx = 5;
        this.dead= false;
    }
}

function startInvaders(){
    levelInvaders.start=true
    createInvaders();
    playGameInvader = setInterval(function(){
        mainInvader();
    },1000/FPS)
}

function createInvaders(){
    for(let i=100; i<500; i+=50){
        for(let j=0; j<100; j+=50){
                let newSquid= new Squid(240, i, j);
                squidArray.push(newSquid)
        }
    }
    console.log(squidArray)
}

//------- MAIN FUNCTION

function mainInvader(){
    initiationInvaders();
    cleanCanvas();
    animationInvaders();
    printAllInvaders();
    //collision();
    //scoreUpdate();
    //finishPlayGame();
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
    if(fireballArray.length===0){

    }else{
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
    if(delayAnimation>2){
        if(plant.shoot){
            plant.animation=16;
            plant.shoot=false;
        }else{
            plant.animation=0;
        }
        delayAnimation=0
    }else{
        delayAnimation++
    }
}

function fireballAnimation(){
    fireballArray=fireballArray.filter(fireball=>fireball.positionY>=0)
    fireballArray.forEach(fireball=>{
        fireball.positionY-=fireball.vy
        if(delayAnimation>2){
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
    squidArray.forEach(squid=>{
        if(squid.positionX > 50 && squid.positionX < 550){
            squid.positionX += squid.vx
        }else{
            squid.positionY +=squid.vy
            squid.vx=-squid.vx
            squid.positionX += squid.vx
        }
    })
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
    }else if(time - 1000 > fireballArray[fireballArray.length-1].time){
        createNewFireball(time)
    }
}

function createNewFireball(time){
    let fireball= new Fireball(0, 1, time, 250, plant.positionX+6)
    ctx.drawImage(fireballImage,fireball.animation,24,8,8,fireball.positionX,fireball.positionY,16,16)
    plant.shoot=true
    fireballArray.push(fireball);
}