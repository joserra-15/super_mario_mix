class Pipe {
    constructor() {
        this.positionX = width + Math.random()
        this.positionY = 215
    }
}
class Plant {
    constructor(positionX) {
        this.positionX = positionX
        this.positionY = 190
        this.animation = 0
    }
}

class Bullet {
    constructor() {
        this.positionX = width + Math.random()
        this.positionY = random()
        this.x = 228
        this.y = 334
    }
}

class Cloud {
    constructor() {
        this.positionX = width + Math.random()
        this.positionY = random()
    }
}

function start() {
    level.start = true
    playGame = setInterval(function () {
        main();
    }, 1000 / FPS)
}


//--------JUMP


function jump() {
    if (mario.jumping === false) {
        audioJump.play()
        mario.jumping = true;
        mario.vy = mario.jump
    } else {
        if (mario.doubleJump === false) {
            if(random()<20){
                audioDoubleJump.play()
            }else{
                audioJump.play()
            }
            mario.doubleJump = true;
            mario.vy = 0
            mario.vy = mario.jump / 1.5
        }
    }
}

function gravity() {
    if (mario.jumping) {
        if (mario.positionY - mario.vy - mario.gravity > 227) {
            mario.jumping = false;
            mario.doubleJump = false;
            mario.positionY = 227;
            mario.vy = 0;
        } else {
            mario.vy -= mario.gravity;
            mario.positionY -= mario.vy;
        }
    }
}



//------- MAIN FUNCTION

function main() {
    initiation();
    cleanCanvas();
    animation();
    printAll();
    collision();
    scoreUpdate();
    finishPlayGame();
}
//-------INITIATION
function initiation() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadImage();
}

function loadImage() {
    marioSprite = new Image();
    groundImg = new Image();
    pipeImg = new Image();
    bulletImage = new Image();
    cloudImg = new Image();
    plantImage = new Image();
    plantImage.src = '../../assets/img/enemysheet.png';
    bulletImage.src = '../../assets/img/characters.gif';
    marioSprite.src = '../../assets/img/smallmariosheet.png';
    groundImg.src = '../../assets/img/background.png'
    pipeImg.src = '../../assets/img/tiles.png'
    cloudImg.src = '../../assets/img/tiles.png'
}

//---------CLEAR CANVAS
function cleanCanvas() {
    canvas.width = width;
    canvas.height = height;
}

//----------PRINTS IN CANVAS
function printAll() {
    printMap();
    printCloud();
    printMario();
    printPlant();
    printPipe();
    printBullet();
}

function printMario() {
    ctx.drawImage(marioSprite, mario.animation, 0, 16, 16, mario.positionX, mario.positionY, 25, 25)
}

function printMap() {
    ctx.drawImage(groundImg, ground.positionX, 0, 600, 385, 0, 0, 600, 300)
}

function printPipe() {
    if (random() < level.randomIncrement) {
        pipeArray.push(new Pipe())
        createPlant(pipeArray[pipeArray.length - 1].positionX + 10)
    }
    if (pipeArray.length !== 0) {
        pipeArray.forEach(pipe => {
            ctx.drawImage(pipeImg, 0, 128, 32, 32, pipe.positionX, pipe.positionY, 40, 40)
        })
    }
}

function printBullet() {
    if (random() < level.randomIncrement) {
        bulletsArray.push(new Bullet())
    }
    if (bulletsArray.length !== 0) {
        bulletsArray.forEach(bullet => {
            ctx.drawImage(bulletImage, bullet.x, bullet.y, 16, 16, bullet.positionX, bullet.positionY, 16, 16)
        })
    }
}

function printCloud() {
    if (random() < 3) {
        cloudsArray.push(new Cloud())
    }
    if (cloudsArray.length != 0) {
        cloudsArray.forEach(cloud => ctx.drawImage(cloudImg, 64, 336, 16, 16, cloud.positionX, cloud.positionY, 16, 16))
    }
}

function printPlant() {
    if (plantsArray.length != 0) {
        plantsArray.forEach(plant => ctx.drawImage(plantImage, plant.animation, 192, 16, 32, plant.positionX, plant.positionY, 20, 32))
    }
}

function createPlant(positionX) {
    if (random() < 70) {
        plantsArray.push(new Plant(positionX))
    }
}


//-------ANIMATIONS
function animation() {
    gravity();
    animationMario();
    animationGround();
    animationPipe();
    animationPlant();
    animationClouds();
    animationBullet();
}

function animationMario() {
    if (mario.jumping) {
        if (mario.vy - mario.gravity > 0) {
            mario.animation = 80;
        } else {
            mario.animation = 96;
        }
    } else if (level.finish) {
        mario.animation = 0
    } else {
        if (mario.animation === 16) {
            mario.animation = 32;
        } else if (mario.animation === 32) {
            mario.animation = 48
        } else if (mario.animation >= 48) {
            mario.animation = 16
        }
    }
}

function animationGround() {
    if (ground.positionX >= width) {
        ground.positionX = 0
    } else {
        ground.positionX += level.speed
    }
}

function animationPipe() {
    pipeArray = pipeArray.filter(pipe => pipe.positionX > -40)
    pipeArray.forEach(pipe => {
        if (pipe.positionX > -40) {
            if (level.finish === false) {
                pipe.positionX -= level.speed - 0.18
            }
        }
    })
}

function animationBullet() {
    bulletsArray = bulletsArray.filter(bullet => bullet.positionX > -40 && bullet.positionY > 50)
    bulletsArray.forEach(bullet => {
        if (bullet.positionX > -40) {
            if (level.finish === false) {
                bullet.positionX -= level.speed * 1.2
            }
        }
    })
}

function animationClouds() {
    cloudsArray = cloudsArray.filter(cloud => cloud.positionX > -32)
    cloudsArray.forEach(cloud => {
        if (cloud.positionX > -32) {
            cloud.positionX -= level.speed / 2
        }
    })
}

function animationPlant() {
    plantsArray = plantsArray.filter(plant => plant.positionX > -40)
    plantsArray.forEach(plant => {
        if (plant.positionX > -40) {
            if (level.finish === false) {
                plant.positionX -= level.speed - 0.18
            }
        }
    })

}

function random() {
    let random = Math.random()
    return Math.round(random * 200)
}

//--------COLLISION
function collision() {
    pipeArray.forEach(pipe => {
        if (pipe.positionX + 40 >= mario.positionX - 2 && pipe.positionX <= mario.positionX + 23) {
            if (mario.positionY - 23 >= pipe.positionY - 40) {
                if (level.finish === false) {
                    audioDeath.play();
                }
                level.finish = true;
                level.speed = 0;
                mario.animation = 0;
            }
        }
    })

    plantsArray.forEach(plant => {
        if (plant.positionX + 16 >= mario.positionX - 2 && plant.positionX <= mario.positionX + 23) {
            plant.animation = 16;
            if (mario.positionY - 23 >= plant.positionY - 32) {
                if (level.finish === false) {
                    audioDeath.play();
                }
                plant.animation = 16;
                level.finish = true;
                level.speed = 0;
                mario.animation = 0;
            }
        } else {
            plant.animation = 0
        }
    })

    bulletsArray.forEach(bullet => {
        if (bullet.positionX + 12 >= mario.positionX - 2 && bullet.positionX <= mario.positionX + 23) {
            if (mario.positionY - 2 <= bullet.positionY + 14 && mario.positionY + 23 >= bullet.positionY) {
                if (level.finish === false) {
                    audioDeath.play();
                }
                level.finish = true;
                level.speed = 0;
                mario.animation = 0;
            }
        }
    })
}


//---------SCORE AND LEVEL UPDATE
function scoreUpdate() {
    if (level.score > level.compareRound) {
        level.speed += 0.4
        level.randomIncrement += 0.01
        level.compareRound = level.score + 100
    }
    ctx.font = "17px super_mario";
    ctx.fillStyle = "#FFD700";
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
    ctx.fillText(`HS: ${userActive.highScore} m Score: ${level.score} m`, 300, 30)
    ctx.strokeText(`HS: ${userActive.highScore} m Score: ${level.score} m`, 300, 30)
    if (level.finish) {
        ctx.font = "30px super_mario";
        ctx.lineWidth = "3";
        ctx.fillStyle = "#FFD700";
        ctx.fillText(`GAME OVER`, 200, 135)
        ctx.strokeText(`GAME OVER`, 200, 135)
        updateLocalStorage(level.score, userActive.highScoreInvaders)
    } else {
        level.score++
    }
}


//----------FINISH AND RESET

function finishPlayGame() {
    if (level.finish === true) {
        clearInterval(playGame);
        resetMarioChrome();
        userData.innerHTML = ""
        userData.innerHTML = `<p>USERNAME: ${userActive.name}</p>
        <p> HS: ${userActive.highScore} M, HS: ${userActive.highScoreInvaders} PTS</p>`
        setTimeout(() => {
            menu.classList.toggle('hidden');
            document.getElementById('canvas').classList.toggle('hidden');
            menuButtons.children[0].focus()
            addListenerMenuButtons()
        }, 3000)
    }
}

function resetMarioChrome() {
    pipeArray = []
    cloudsArray = []
    plantsArray = []
    bulletsArray = []
    ground.positionX = 0;
    mario.animation = 16;
    mario.vy = 0;
    mario.gravity = 2;
    mario.jump = 20;
    mario.jumping = false;
    mario.positionX = 50;
    mario.positionY = 227;
    level.speed = 9;
    level.score = 0;
    level.finish = false;
    level.start = false;
}

//--------LOCALSTORAGE

function updateLocalStorage(hs, hp) {
    if (userActive.highScore < hs) {
        userActive.highScore = hs;
        users.forEach(user => {
            if (user.name === userActive.name) {
                user.highScore = hs
            }
        })
    }
    if (userActive.highScoreInvaders < hp) {
        userActive.highScoreInvaders = hp;
        users.forEach(user => {
            if (user.name === userActive.name) {
                user.highScoreInvaders = hp
            }
        })
    }
    localStorage.setItem('users', JSON.stringify(users));
}

function getLocalStorage() {
    users = JSON.parse(localStorage.getItem('users'));
}