chromeStart.addEventListener('click',marioChrome);

function marioChrome(e){
    e.preventDefault()
        setTimeout(()=>{
            menu.classList.toggle('hidden');
            document.getElementById('canvas').classList.toggle('hidden');
        },1000/FPS)
        start();
}

