
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

function marioInvaders(e){
    e.preventDefault()
    setTimeout(()=>{
        menu.classList.toggle('hidden');
        document.getElementById('canvas').classList.toggle('hidden');
        removeListenerMenuButtons()
    },1000/FPS)
    startInvaders();
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
    sectionEmpty.innerHTML=`<table id='table_ranking'>
        <tr>
            <td>RANK</td>
            <td>SCORE</td>
            <td>NAME</td>
        </tr>
        </table>`
    for(let i=0;i<users.length;i++){
        document.getElementById("table_ranking").insertAdjacentHTML("beforeend",`
        <tr>
        <td>${i+1}</td>
        <td>${users[i].highScore} M</td>
        <td>${users[i].name}</td>
        </tr>`)
    }
    sectionEmpty.insertAdjacentHTML("afterbegin",`<section><button id="ranking_chrome">Mario Chrome</button> <button id="ranking_invaders">Mario Invaders</button> </section`)
    sectionEmpty.insertAdjacentHTML("afterbegin",`<button id="back">back</button>`)
    removeListenerMenuButtons()
    document.getElementById("ranking_chrome").focus()
    document.getElementById("back").addEventListener('click',goToMenu)
    document.getElementById("ranking_chrome").addEventListener('click',showRankingChrome)
    document.getElementById("ranking_invaders").addEventListener('click',showRankingInvaders)

    function showRankingChrome(e){
        e.preventDefault()
        document.getElementById("back").removeEventListener('click',goToMenu)
        document.getElementById("ranking_chrome").removeEventListener('click',showRankingChrome)
        document.getElementById("ranking_invaders").removeEventListener('click',showRankingInvaders)
        sectionEmpty.innerHTML=""
        users=users.sort(((a,b)=>b.highScore - a.highScore))
        sectionEmpty.innerHTML=`<table id='table_ranking'>
        <tr>
            <td>RANK</td>
            <td>SCORE</td>
            <td>NAME</td>
        </tr>
        </table>`
        for(let i=0;i<users.length;i++){
            document.getElementById("table_ranking").insertAdjacentHTML("beforeend",`
            <tr>
            <td>${i+1}</td>
            <td>${users[i].highScore} M</td>
            <td>${users[i].name}</td>
            </tr>`)
        }
        sectionEmpty.insertAdjacentHTML("afterbegin",`<section><button id="ranking_chrome">Mario Chrome</button> <button id="ranking_invaders">Mario Invaders</button> </section`)
        sectionEmpty.insertAdjacentHTML("afterbegin",`<button id="back">back</button>`)
        removeListenerMenuButtons()
        document.getElementById("ranking_chrome").focus()
        document.getElementById("back").addEventListener('click',goToMenu)
        document.getElementById("ranking_chrome").addEventListener('click',showRankingChrome)
        document.getElementById("ranking_invaders").addEventListener('click',showRankingInvaders)
    }
    function showRankingInvaders(e){
        e.preventDefault()
        document.getElementById("back").removeEventListener('click',goToMenu)
        document.getElementById("ranking_chrome").removeEventListener('click',showRankingChrome)
        document.getElementById("ranking_invaders").removeEventListener('click',showRankingInvaders)
        sectionEmpty.innerHTML=""
        users=users.sort(((a,b)=>b.highScoreInvaders - a.highScoreInvaders))
        sectionEmpty.innerHTML=`<table id='table_ranking'>
        <tr>
            <td>RANK</td>
            <td>SCORE</td>
            <td>NAME</td>
        </tr>
        </table>`
        for(let i=0;i<users.length;i++){
            document.getElementById("table_ranking").insertAdjacentHTML("beforeend",`
            <tr>
            <td>${i+1}</td>
            <td>${users[i].highScoreInvaders} PTS</td>
            <td>${users[i].name}</td>
            </tr>`)
        }
        sectionEmpty.insertAdjacentHTML("afterbegin",`<section><button id="ranking_chrome">Mario Chrome</button> <button id="ranking_invaders">Mario Invaders</button> </section`)
        sectionEmpty.insertAdjacentHTML("afterbegin",`<button id="back">back</button>`)
        removeListenerMenuButtons()
        document.getElementById("ranking_invaders").focus()
        document.getElementById("back").addEventListener('click',goToMenu)
        document.getElementById("ranking_chrome").addEventListener('click',showRankingChrome)
        document.getElementById("ranking_invaders").addEventListener('click',showRankingInvaders)
    }
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
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>Chrome Mario: Press the space Bar and Mario will jump over the obstacles in your path. The longer you play, the faster Mario runs/the ground moves. Once you crash into something, the game is over and you have to restart.</p>
    <p>
    Mario Invaders: you have to try to kill all the aliens before they reach you by shooting fireballs by pressing the space Bar. To move you can use the right and left arrow keys on the keyboard. Remember for every alien you kill you earn 1 point. When you finish them all they will come more and faster. The game ends when the aliens arrive at your base.</p>`)
    document.getElementById("back").focus()
    document.getElementById("back").addEventListener('click',goToMenu)

}

function displayDeleteUser(e){
    e.preventDefault()
    sectionEmpty.innerHTML=""
    sectionEmpty.insertAdjacentHTML("beforeend",`<>¿do you want to remove the user?</>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>username: ${userActive.name}</p>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<p>HS: ${userActive.highScore} M </p>`)
    sectionEmpty.insertAdjacentHTML("beforeend",`<section><button id="back">No</button> <button id="yes">yes</button> </section>`)
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
    invadersStart.addEventListener('click',marioInvaders);
    options.addEventListener('click',showOptions)
    ranking.addEventListener('click',showRanking)
    selectUsername.addEventListener('click',activateUsername);
}