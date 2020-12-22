const chromeStart = document.getElementById('chrome_start');
const invadersStart = document.getElementById('invaders_start');

//------ELEMENTS

//FORM
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitInput = document.getElementById('validation_user');
const formUser = document.getElementById('formUser');
//MENU
const menu = document.getElementById('menu');
const selectUsername = document.getElementById('select_user');
const menuButtons = document.getElementById('menuButtons');
const userData = document.getElementById("userData");
const ranking = document.getElementById("ranking");
const options = document.getElementById("options");
const sectionEmpty = document.querySelector(".section__empty");


//------AUDIO
const audioJump = document.getElementById("audio_jump");
const audioDeath = document.getElementById("audio_death");
const audioFireball = document.getElementById("audio_fireball");
const audioDeathAlien = document.getElementById("audio_aliens");
const audioFastx = document.getElementById("audio_fastx");
const audioFasty = document.getElementById("audio_fasty");
//-----CANVAS AND CONTEXT
let canvas, ctx;
const width = 600;
const height = 300;

//---CHROME MARIO
let playGame;
let marioSprite, groundImg, pipeImg, cloudImg;
const ground = {
    positionX: 0
}
const mario = {
    animation: 16,
    vy: 0,
    gravity: 2,
    jump: 20,
    jumping: false,
    doubleJump: false,
    positionX: 50,
    positionY: 227
}
const level = {
    speed: 9,
    score: 0,
    finish: false,
    start: false,
    compareRound: 100
}
let FPS = 20;
let pipeArray = []
let cloudsArray = []

//-----MARIO INVADERS
let playGameInvader
const levelInvaders = {
    speed: 0.2,
    score: 0,
    finish: false,
    start: false,
    delayAnimation: 0,
}
let plantImage, fireballImage, squidImage, bulletImage
const plantInvaders = {
    animation: 0,
    speed: 7,
    shoot: false,
    positionX: 276,
    positionY: 250
}
let fireballArray = []
let squidArray = []
let starsArray = []
let plantsArray = []
let bulletsArray = []
let keyMove = [{
    keyName: 'Space',
    keyPressed: false
}, {
    keyName: 'ArrowLeft',
    keyPressed: false
}, {
    keyName: 'ArrowRight',
    keyPressed: false
}]

//----USERS
let userActive = {}
let users = []

class User {
    constructor(name, highScore, password, highScoreInvaders) {
        this.name = name;
        this.highScore = highScore;
        this.password = password;
        this.highScoreInvaders = highScoreInvaders
    }
}