const levelInvaders={speed: 9, score: 0, finish: false, start: false}
let plantImage, fireballImage
const plant={animation: 0, speed: 5, shoot: false, positionX: 276,positionY: 250}
let fireballArray=[]
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

function startInvaders(){
    levelInvaders.start=true
    playGameInvader = setInterval(function(){
        mainInvader();
    },1000/FPS)
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
    plantImage.src= '../../assets/img/enemysheet.png';
    fireballImage.src= '../../assets/img/particlesheet.png';
}


//----------PRINTS IN CANVAS
function printAllInvaders(){
    printMapInvaders();
    printPlant();
    printAllFireball();
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
})

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