let validation={username: false, password: false}
getLocalStorage();
usernameInput.focus()
usernameInput.addEventListener('blur', validationUser)
passwordInput.addEventListener('blur', validationUser)

function validationUser(e){
    switch(e.target.name){
        case "username":
            if(e.target.value!==""){
                if(e.target.value.length <= 18 && e.target.value.length>=3){
                    validation.username=true;
                }else{
                    e.target.value=""
                    e.target.setAttribute('placeholder', 'Min 3 or Max 18 letters')
                    validation.username=false;
                }
            }else{
                e.target.value=  ""
                e.target.setAttribute('placeholder', 'Empty field')
                validation.username=false;
            }
            break
        case "password":
            if(e.target.value!==""){
                if(e.target.value.length <= 18 && e.target.value.length>=5){
                    validation.password=true;
                }else{
                    e.target.value=""
                    e.target.setAttribute('placeholder', 'Min 5 or Max 18 letters')
                    validation.password=false;
                }
            }else{
                e.target.value=  ""
                e.target.setAttribute('placeholder', 'Empty field')
                validation.password=false;
            }
            break
        default:
            break
    }
}

submitInput.addEventListener("click",checkValidation)


function checkValidation(e){
    e.preventDefault()
    if(validation.username){
        if(validation.password){
            let result=checkUser(usernameInput.value, passwordInput.value);
            if(result==="true"){
                usernameInput.value="";
                passwordInput.value="";
                formUser.classList.add("hidden");
                menuButtons.classList.remove("hidden");
                chromeStart.focus();
                userData.textContent=`USERNAME: ${userActive.name} HS: ${userActive.highScore} M`
            }else if(result==="passIncorrect"){
                return
            }else if(result==="false"){
                createNewUser(usernameInput.value, passwordInput.value)
                usernameInput.value="";
                passwordInput.value="";
                formUser.classList.add("hidden");
                menuButtons.classList.remove("hidden");
                chromeStart.focus();
                userData.textContent=`USERNAME: ${userActive.name} HS: ${userActive.highScore} M`
            }
        }else{passwordInput.focus()}
    }else{usernameInput.focus()}
}

function checkUser(username, userPass){
    let value=""
    users.forEach(e=>{
        if(e.name===username){
            if(decryptPassword(e.password)===userPass){
                userActive=e
                value= "true";
            }else{
                passwordInput.value=""
                passwordInput.setAttribute('placeholder', 'Incorrect password')
                validation.password=false;
                value= "passIncorrect";
            }
        }
    })
    if(value===""){
        return "false"
    }else{
        return value
    }
}

function createNewUser(username,password){
    let newUser= new User(username, 0, encryptPassword(password))
    userActive=newUser;
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
}


function encryptPassword(pass){
    let randomNumber=random()
    let i=0
    while(randomNumber<5 || randomNumber >9){
        randomNumber=random()
    }
    for(i;i<randomNumber;i++){
        pass=btoa(pass)
    }
    pass=`${i}${pass}`
    pass=btoa(pass)
    return pass;
}

function decryptPassword(pass){
    pass=atob(pass)
    let i= pass.slice(0,1)
    i=parseInt(i)
    pass=pass.slice(1)
    while(i>0){
        pass=atob(pass)
        i--
    }
    return pass;
}
