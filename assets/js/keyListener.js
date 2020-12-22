document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        event.preventDefault();
        if (level.start) {
            jump()
        }
        if (levelInvaders.start) {
            keyMove[0].keyPressed = true
        }
    }
    if (event.code == 'ArrowLeft') {
        event.preventDefault();
        if (levelInvaders.start) {
            keyMove[1].keyPressed = true
        }
    }
    if (event.code == 'ArrowRight') {
        event.preventDefault();
        if (levelInvaders.start) {
            keyMove[2].keyPressed = true
        }
    }
})
document.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        event.preventDefault();
        if (levelInvaders.start) {
            keyMove[0].keyPressed = false
        }
    }
    if (event.code == 'ArrowLeft') {
        event.preventDefault();
        if (levelInvaders.start) {
            keyMove[1].keyPressed = false
        }
    }
    if (event.code == 'ArrowRight') {
        event.preventDefault();
        if (levelInvaders.start) {
            keyMove[2].keyPressed = false
        }
    }
})

//----------MOUSE EVENTS


btnLeft.addEventListener('mousedown',(event)=>{
    event.preventDefault();
    if (levelInvaders.start) {
        keyMove[1].keyPressed = true
    }
})
btnRight.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (levelInvaders.start) {
        keyMove[2].keyPressed = true
    }
})
btnJump.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (level.start) {
        jump()
    }
    if (levelInvaders.start) {
        keyMove[0].keyPressed = true
    }
})

btnLeft.addEventListener('mouseup',(event)=>{
    event.preventDefault();
    if (levelInvaders.start) {
        keyMove[1].keyPressed = false
    }
})
btnRight.addEventListener('mouseup', (event) => {
    event.preventDefault();
    if (levelInvaders.start) {
        keyMove[2].keyPressed = false
    }
})
btnJump.addEventListener('mouseup', (event) => {
    event.preventDefault();
    if (levelInvaders.start) {
        keyMove[0].keyPressed = false
    }
})