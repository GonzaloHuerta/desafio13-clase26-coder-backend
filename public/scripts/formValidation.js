let btnLogin = document.getElementById('submitBtn');

btnLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    let form = document.getElementById('form');
    let passwordInput = document.getElementById('passwordInput');
    let errorContainer = document.getElementById('errorContainer');
    let emailInput = document.getElementById('emailInput');
    errorContainer.innerHTML = "";
    
    if(emailInput.value == ""){
        errorContainer.style.display = 'inline-block';
        errorContainer.innerHTML = `<span>Debe ingresar un email</span>`;
        return;
    }

    if(passwordInput.value == ""){
        errorContainer.style.display = 'inline-block';
        errorContainer.innerHTML = `<span>Debe ingresar una contraseña</span>`;
        return;
    }

    else{
        form.submit()
    }

})


