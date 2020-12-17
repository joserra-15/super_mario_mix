
getLocalStorage()
usernameInput.setAttribute("value", user.name);
topData.textContent= `TOP - ${user.highScore} M`;
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
    usernameInput.disabled = false;
    usernameInput.value="";
    usernameInput.focus();
}

usernameInput.addEventListener('blur', validationUser)

function validationUser(){
    if(usernameInput.value!=="" || usernameInput.value !== "Empty field"){

    }else{
        usernameInput.value=  "Empty field"
        usernameInput.focus()
    }
}