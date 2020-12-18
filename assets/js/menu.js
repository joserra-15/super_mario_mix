
chromeStart.addEventListener('click',marioChrome);


function marioChrome(e){
    e.preventDefault()
    setTimeout(()=>{
        menu.classList.toggle('hidden');
        document.getElementById('canvas').classList.toggle('hidden');
    },1000/FPS)
    start();
}


selectUsername.addEventListener('click',activateUsername);

function activateUsername(e){
    e.preventDefault();
    formUser.classList.toggle('hidden');
    menuButtons.classList.toggle('hidden');
    usernameInput.value="";
    usernameInput.focus();
}

