
addListenerMenuButtons()


function marioChrome(e){
    e.preventDefault()
    setTimeout(()=>{
        menu.classList.toggle('hidden');
        document.getElementById('canvas').classList.toggle('hidden');
        removeListenerMenuButtons()
    },1000/FPS)
    start();
}




function activateUsername(e){
    e.preventDefault();
    formUser.classList.toggle('hidden');
    menuButtons.classList.toggle('hidden');
    usernameInput.value="";
    usernameInput.focus();
    addformListener()
    removeListenerMenuButtons()
}



function showRanking(e){
    e.preventDefault();
    sectionEmpty.innerHTML=""
    menuButtons.classList.toggle('hidden')
    sectionEmpty.classList.toggle('hidden')
    users=users.sort(((a,b)=>b.highScore - a.highScore))
    for(let i=0;i<users.length;i++){
        sectionEmpty.insertAdjacentHTML("beforeend",`<p>${i+1}- username: ${users[i].name} HS: ${users[i].highScore} M</p>`)
    }
    sectionEmpty.insertAdjacentHTML("afterbegin",`<button id="back">back</button>`)
    removeListenerMenuButtons()
    document.getElementById("back").focus()
    document.getElementById("back").addEventListener('click',goToMenu)
}

function goToMenu(e){
    e.preventDefault()
    menuButtons.classList.toggle('hidden')
    sectionEmpty.classList.toggle('hidden')
    menuButtons.children[0].focus()
    addListenerMenuButtons()
}



function showOptions(e){
    e.preventDefault();
    sectionEmpty.innerHTML=""
    menuButtons.classList.toggle('hidden')
    sectionEmpty.classList.toggle('hidden')
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="back">back</button>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="delete_user">Delete user</button>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="instruction">instruction</button>`)
    removeListenerMenuButtons()
    document.getElementById("back").focus()
    document.getElementById("back").addEventListener('click',goToMenu)
    document.getElementById("delete_user").addEventListener('click',displayDeleteUser)
    document.getElementById("instruction").addEventListener('click',showInstruction)

}

function showInstruction(e){
    e.preventDefault();
    document.getElementById("back").removeEventListener('click',goToMenu)
    document.getElementById("delete_user").removeEventListener('click',displayDeleteUser)
    document.getElementById("instruction").removeEventListener('click',showInstruction)
    sectionEmpty.innerHTML=""
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="back">back</button>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>Chrome Mario: Press the space Bar and Mario will jump over the obstacles in your path. The longer you play, the faster Mario runs/the ground moves. Once you crash into something, the game is over and you have to restart.</p>`)
    document.getElementById("back").focus()
    document.getElementById("back").addEventListener('click',goToMenu)

}

function displayDeleteUser(e){
    e.preventDefault()
    sectionEmpty.innerHTML=""
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>¿do you want to remove the user?</p>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>username: ${userActive.name}</p>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>HS: ${userActive.highScore} M </p>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="back">No</button>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<button id="yes">yes</button>`)
    document.getElementById("back").focus()
    document.getElementById("back").addEventListener('click',goToMenu)
    document.getElementById("yes").addEventListener('click',deleteUser)

}


function deleteUser(e){
    e.preventDefault()
    users=users.filter(e=>{
        if(e.name!==userActive.name){
            return true
        }else{return false}
    })
    document.getElementById("back").removeEventListener('click',goToMenu)
    document.getElementById("yes").removeEventListener('click',deleteUser)
    sectionEmpty.innerHTML=""
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>User deleted succesfully</p>`)
    setTimeout(()=>{
        formUser.classList.toggle('hidden');
        sectionEmpty.classList.toggle('hidden');
        usernameInput.value="";
        usernameInput.focus();
        addformListener()
    },2000)
}

function removeListenerMenuButtons(){
    selectUsername.removeEventListener('click',activateUsername);
    chromeStart.removeEventListener('click',marioChrome);
    options.removeEventListener('click',showOptions)
    ranking.removeEventListener('click',showRanking)
    selectUsername.removeEventListener('click',activateUsername);
}

function addListenerMenuButtons(){
    selectUsername.addEventListener('click',activateUsername);
    chromeStart.addEventListener('click',marioChrome);
    options.addEventListener('click',showOptions)
    ranking.addEventListener('click',showRanking)
    selectUsername.addEventListener('click',activateUsername);
}