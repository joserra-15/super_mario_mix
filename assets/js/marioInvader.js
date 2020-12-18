const levelInvaders={speed: 9, score: 0, finish: false, start: false}
let plantImage, fireballImage
const plant={animation: 0, vx: 5, shoot: false, positionX: 276,positionY: 250}
const fireball={animation:0, vy:5, active:false, positionX: plant.positionX+16, positionY:250}

function startInvaders(){
    levelInvaders.start=true
    playGameInvader = setInterval(function(){
        mainInvader();
    },1000/FPS)
}

//------- MAIN FUNCTION

function mainInvader(){
    console.log("aqui")
    initiationInvaders();
    cleanCanvas();
    //animationInvaders();
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
    fireballImage.src= '../../assets/img/enemysheet.png';
}


//----------PRINTS IN CANVAS
function printAllInvaders(){
    printMapInvaders();
    printPlant();
}
function printPlant(){
    ctx.drawImage(plantImage,plant.animation,192,16,32,plant.positionX,plant.positionY,24,40)
}

function printMapInvaders(){
    ctx.fillRect(0, 0, 600, 300)
}

//-------ANIMATIONS

/*function animation(){
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
}*/

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
    animationShootPlant()
}

function printFireball(){
    ctx.drawImage(fireballImage,fireball.animation,32,8,8,fireball.positionX,fireball.positionY,16,16)
}

function animationShootPlant(){
    
}