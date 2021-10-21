const classX = 'x'
const classO = 'circle'
const combinacaoVencedor = [
 [0, 1, 2],
 [3, 4, 5],
 [6, 7, 8],
 [0, 3, 6],
 [1, 4, 7],
 [2, 5, 8],
 [0, 4, 8],
 [2, 4, 6]
]
const celulaElements = document.querySelectorAll('[data-celula]')
const borda = document.getElementById('borda')
const winningMessageElement = document.getElementById('winningMessage')
const btReiniciar = document.getElementById('btReiniciar')
const msg_vencedor_text = document.querySelector('[data-msg_vencedor-text]')
let turnoO

iniciar()

btReiniciar.addEventListener('click', iniciar)

function iniciar() {
 turnoO = false
 celulaElements.forEach(celula => {
 celula.classList.remove(classX)
 celula.classList.remove(classO)
 celula.removeEventListener('click', aoclicar)
 celula.addEventListener('click', aoclicar, { once: true })
 })
 setHoverBorda()
 winningMessageElement.classList.remove('show')
}

function aoclicar(e) {
 const celula = e.target
 const currentClass = turnoO ? classO : classX
 marcarCelula(celula, currentClass)
 if (checkVencedor(currentClass)) {
 final(false)
 } else if (empatou()) {
 final(true)
 } else {
 trocarJogador()
 setHoverBorda()
 }
}

function final(empate) {
 if (empate) {
 msg_vencedor_text.innerText = 'Ops, empatou!!!'
 } else {
 msg_vencedor_text.innerText = `${turnoO ? "O 'o'" : "O 'x'"} Venceu!!!`
 }
 winningMessageElement.classList.add('show')
}

function empatou() {
 return [...celulaElements].every(celula => {
 return celula.classList.contains(classX) || celula.classList.contains(classO)
 })
}

function marcarCelula(celula, currentClass) {
 celula.classList.add(currentClass)
}

function trocarJogador() {
 turnoO = !turnoO
}

function setHoverBorda() {
 borda.classList.remove(classX)
 borda.classList.remove(classO)
 if (turnoO) {
 borda.classList.add(classO)
 } else {
 borda.classList.add(classX)
 }
}

function checkVencedor(currentClass) {
 return combinacaoVencedor.some(combinacao => {
 return combinacao.every(index => {
 return celulaElements[index].classList.contains(currentClass)
 })
 })
}