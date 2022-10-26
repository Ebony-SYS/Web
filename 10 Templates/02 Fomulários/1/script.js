class Validator {

    constructor() {

        this.validations = [
            'data-min-length',
        ]
    }

    // iniciando a validação de todos os campos
    validate(form) {

        // limpando as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length) {

            this.cleanValidations(currentValidations);

        }

        // capturar os inputs
        let inputs = form.getElementsByTagName('input');

        // transformando HTMLcollection em array
        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {

            // loop nas validações
            for(let i = 0; this.validations.length > i; i++) {
                
                // verifica se a validação está vazia
                if(input.getAttribute(this.validations[i]) != null) {
                    
                    // alterando data-min-length para minlength
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // chamando o método
                    this[method](input, value);

                }
            }

        }, this);
    }

    // verificando quantidade mínima de caracteres no input
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisar ter pelo menos ${minValue} caracteres.`

        if(inputLength < minValue) {
            
            this.printMessage(input, errorMessage);

        }
    }

    // verificando a quantidade máxima de caracteres no input
    maxLength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres.`;

        if(inputLength > maxValue) {

            this.printMessage(input, errorMessage);

        }
    }

    // verificando strings (Apenas letras)
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números e/ou caracteres especiais`;

        if(!re.test(inputValue)) {

            this.printMessage(input, errorMessage);

        }
    }

    // validando email
    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um email válido.`;

        if(!re.test(email)) {

            this.printMessage(input, errorMessage);

        }
    }

    // verificando se os campos são iguais
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `As senhas são diferentes.`;

        if(input.value != inputToCompare.value) {

            this.printMessage(input, errorMessage);

        }
    }

    // exibindo inputs obrigatórios
    required(input) {

        let inputValue = input.value;

        if(inputValue === '') {

            let errorMessage = `Este campo é obrigatório.`;

            this.printMessage(input, errorMessage);

        }
    }

    // validando o campo senha
    passwordvalidate(input) {

        // transformando string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {

            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {

            let errorMessage = `Obrigatório ter uma letra maiúscula e um número`;

            this.errorMessage(input, errorMessage);

        }
    }

    // imprimindo a mensagem de erro na tela
    printMessage(input, msg) {
        
        let template = document.querySelector('.error_validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }

    // removendo validações para nova checagem
    cleanValidations(validations) {

        validations.forEach(el => el.remove());

    }
}

let form = document.getElementById("form_cad");
let submit = document.getElementById("btn_submit");
let validator = new Validator();


// evento que dispara as validações
submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

})