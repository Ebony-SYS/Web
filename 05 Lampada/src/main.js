const lamp = window.document.getElementById("lampada");
const ebo = window.document.getElementById("ebony");

function ligar() {
    lampada.src = '/img/ligada.jpg';
    ebony.src = '/img/ebonyaceso.jpg';
}

function desligar() {
    lampada.src = '/img/desligada.jpg';
    ebony.src = '/img/ebonyapagado.jpg';
}