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


btnLeft.addEventListener('click', (event) => {
    event.preventDefault();
    if (levelInvaders.start) {
        if (keyMove[1].keyPressed === false) {
            keyMove[1].keyPressed = true
            keyMove[2].keyPressed = false
        } else {
            keyMove[1].keyPressed = false
        }
    }
})
btnRight.addEventListener('click', (event) => {
    event.preventDefault();
    if (levelInvaders.start) {
        if (keyMove[2].keyPressed === false) {
            keyMove[2].keyPressed = true
            keyMove[1].keyPressed = false
        } else {
            keyMove[2].keyPressed = false
        }
    }
})
btnJump.addEventListener('click', (event) => {
    event.preventDefault();
    if (level.start) {
        jump()
    }
    if (levelInvaders.start) {
        if (keyMove[0].keyPressed === false) {
            keyMove[0].keyPressed = true
        } else {
            keyMove[0].keyPressed = false
        }
    }
})