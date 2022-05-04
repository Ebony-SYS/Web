document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const pontosDisplay = document.querySelector('#pontos')
    const btnIniciarPausar = document.querySelector('#btnIniciarPausar')
    const width = 10
    const cores = [
        'black',
        'orange',
        'green',
        'blue',
        'violet'
    ]

    let ponto = 0
    let timeId
    let nextRandom = 0
    let casas = Array.from(document.querySelectorAll('.grid div'))


    // criando os Tetrominos
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
        ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
        ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
        ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
        ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
        ]

    const todosTetronios = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let posicaoAtual = 4
    let rotacaoAtual = 0

    // selecionando um tetromino randomicamente
    let random = Math.floor(Math.random()*todosTetronios.length)
    let atual = todosTetronios[random][rotacaoAtual]

    // criando os tetrominos
    function desenhar() {
        atual.forEach(index => {
            casas[posicaoAtual + index].classList.add('tetromino')
            casas[posicaoAtual + index].style.backgroundColor = cores[random]
        })
    }

    // apagando os tetrominos
    function apagar() {
        atual.forEach(index => {
            casas[posicaoAtual + index].classList.remove('tetromino')
            casas[posicaoAtual + index].style.backgroundColor = ''
        })
    }

    // determinando velocidade de descida
    // timeId = setInterval(moverBaixo, 500)

    // função de controle por teclas
    function controle(evento) {
        if(evento.keyCode === 37) {
            moverEsquerda()
        }
        else if(evento.keyCode === 38) { // usando a tecla ↑ para girar a peça
            rotate()
        }
        else if(evento.keyCode === 39) {
            moverDireita()
        }
        else if(evento.keyCode === 40) {
            moverBaixo()
        }

    }
    document.addEventListener('keyup', controle)

    // fazendo o tetromino descer
    function moverBaixo() {
        apagar()
        posicaoAtual += width
        desenhar()
        congelando()
    }

    // congelando a primeira linha
    function congelando() {
        if(atual.some(index => casas[posicaoAtual + index + width].classList.contains('taken'))) {
            atual.forEach(index => casas[posicaoAtual + index].classList.add('taken'))

            // iniciando o próximo tetromino
            random = nextRandom
            nextRandom = Math.floor(Math.random() * todosTetronios.length)
            atual = todosTetronios[random][rotacaoAtual]
            posicaoAtual = 4
            desenhar()
            mostrarShape()
            pontos()
            gameover()
        }
    }

    // movendo tetromino para esquerda
    function moverEsquerda() {
        apagar()
        const bordaEsquerda = atual.some(index => (posicaoAtual + index) % width === 0)

        if(!bordaEsquerda) posicaoAtual -= 1

        if(atual.some(index => casas[posicaoAtual + index].classList.contains('taken'))){
            posicaoAtual += 1
        }
        desenhar()
    }

    // movendo tetromino para direita
    function moverDireita() {
        apagar()
        const bordaDireita = atual.some(index => (posicaoAtual + index) % width === width -1)

        if(!bordaDireita) posicaoAtual += 1

        if(atual.some(index => casas[posicaoAtual + index].classList.contains('taken'))) {
            posicaoAtual -= 1
        }
        desenhar()
    }

    function rotate() {
        apagar()
        rotacaoAtual ++

        // se a posição atual estiver 4, irá retornar ao 0
        if(rotacaoAtual === atual.length) {
            rotacaoAtual = 0
        }
        atual = todosTetronios[random][rotacaoAtual]
        desenhar()
    }

    // mostrando o próximo tetromino no grid lateral
    const casasDisplay = document.querySelectorAll('.miniGrid div')
    const tamDisplay = 4
    const indexDisplay = 0

    const proximoTetromino = [
        [1, tamDisplay+1, tamDisplay*2+1, 2], // lTetromino
        [0, tamDisplay, tamDisplay+1, tamDisplay*2+1], // zTetromino
        [1, tamDisplay, tamDisplay+1, tamDisplay+2], // lTetromino
        [0, 1, tamDisplay, tamDisplay+1], // oTetromino
        [1, tamDisplay+1, tamDisplay*2+1, tamDisplay*3+1]
    ]

    // mostrando o shape no grid
    function mostrarShape() {
        casasDisplay.forEach(casas => {
            casas.classList.remove('tetromino')
            casas.style.backgroundColor = ''
        })
        proximoTetromino[nextRandom].forEach( index => {
            casasDisplay[indexDisplay + index].classList.add('tetromino')
            casasDisplay[indexDisplay + index].style.backgroundColor = cores[nextRandom]
        })
    }

    // adicionando funcionalidade iniciar/pausar 
    btnIniciarPausar.addEventListener('click', () => {
        if (timeId) {
            clearInterval(timeId)
            timeId = null
        }
        else {
            desenhar()
            timeId = setInterval(moverBaixo, 500)
            nextRandom = Math.floor(Math.random()*todosTetronios.length)
            mostrarShape()
        }
    })

    // adicionando funcionalidade de pontuação
    function pontos() {
        for (let i = 0; i < 199; i += width) {
            const linha = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(linha.every(index => casas[index].classList.contains('taken'))) {
                ponto += 10
                pontosDisplay.innerHTML = ponto
                linha.forEach(index => {
                    casas[index].classList.remove('taken')
                    casas[index].classList.remove('tetromino')
                    casas[index].style.backgroundColor = ''
                })
                const casasRemovidas = casas.splice(i, width)
                casas = casasRemovidas.concat(casas)
                casas.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // gameover
    function gameover() {
        if(atual.some(index => casas[posicaoAtual + index].classList.contains('taken'))) {
            pontosDisplay.innerHTML = 'end'
            clearInterval(timeId)
        }
    }
});