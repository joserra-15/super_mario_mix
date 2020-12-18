
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

ranking.addEventListener('click',showRanking)

function showRanking(e){
    e.preventDefault();
    rankingTable.innerHTML=""
    menuButtons.classList.toggle('hidden')
    rankingTable.classList.toggle('hidden')
    users=users.sort(((a,b)=>b.highScore - a.highScore))
    for(let i=0;i<users.length;i++){
        rankingTable.insertAdjacentHTML("beforeend",`<p>${i+1}- username: ${users[i].name} HS: ${users[i].highScore} M</p>`)
    }
    rankingTable.insertAdjacentHTML("afterbegin",`<button id="back">back</button>`)

    document.getElementById("back").addEventListener('click',goToMenu)
}

function goToMenu(e){
    e.preventDefault()
    menuButtons.classList.toggle('hidden')
    rankingTable.classList.toggle('hidden')
}