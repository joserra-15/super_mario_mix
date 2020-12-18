const chromeStart=document.getElementById('chrome_start');

//------ELEMENTS

//FORM
const usernameInput=document.getElementById('username');
const passwordInput=document.getElementById('password');
const submitInput=document.getElementById('validation_user');
const formUser=document.getElementById('formUser')
//MENU
const menu=document.getElementById('menu');
const selectUsername=document.getElementById('select_user');
const menuButtons=document.getElementById('menuButtons');
const userData=document.getElementById("userData")

//------AUDIO
const audioJump=document.getElementById("audio_jump");
const audioDead=document.getElementById("audio_dead");
//-----CANVAS AND CONTEXT
let canvas,ctx;
const width= 600;
const height= 300;

//---CHROME MARIO
let playGame;
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
const level={speed: 9, score: 0, finish: false}
let FPS=20;


//----USERS
let userActive={name: "jose", highScore: 0 , password: ""}
let users=[]

class User {
    constructor(name, highScore, password){
        this.name=name;
        this.highScore=highScore;
        this.password=password;
    }
}
