const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConf = document.getElementById('password_conf');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInput();
});


function checkInput() {

    // pegando os valores em cada imput
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passValue = password.value.trim();
    const passConfValue = passwordConf.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Ops, seu nome não pode ficar em branco.');

    } else if (length(usernameValue) <= 3) {
        setErrorFor(username, 'Seu nome de usuário precisa ser um pouco maior.');

    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Ops, email não pode ficar em branco.');

    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Insira um email válido. ');

    } else {
        setSuccessFor(email);
    }

    if (passValue === '') {
        setErrorFor(password, 'A senha não pode ficar em branco.');

    } else {
        setSuccessFor(password);
    }

    if (passConfValue === '') {
        setErrorFor(passwordConf, 'Confirmação de senha não pode ficar em branco');

    } else if (passValue !== passConfValue) {
        setErrorFor(passwordConf, 'Ops, as senhas não são iguais.');

    } else {
        setSuccessFor(passwordConf);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // adc classe de erro
    formControl.className = 'form_control error';

    // adc mensagem de erro no small
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

