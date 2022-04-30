let categoriaSorteada;
let palavraSorteada;
let erros = 6;
let lista = [];

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function(){
    location.reload();
});

const palavras = [
    (p01 = {
        nome: "GOIABA",
        categoria: "fruta",
    }),
    (p02 = {
        nome: "DAMASCO",
        categoria: "fruta",
    }),
    (p03 = {
        nome: "LICHIA",
        categoria: "fruta",
    }),
    (p04 = {
        nome: "PANDANUS",
        categoria: "fruta",
    }),
    (p05 = {
        nome: "CHERIMOLA",
        categoria: "fruta",
    }),
    (p06 = {
        nome: "AGASALHO",
        categoria: "roupa",
    }),
    (p07 = {
        nome: "CACHECOL",
        categoria: "roupa",
    }),
    (p08 = {
        nome: "JARDINEIRA",
        categoria: "roupa",
    }),
    (p09 = {
        nome: "PANTALONAS",
        categoria: "roupa",
    }),
    (p10 = {
        nome: "TERNO",
        categoria: "roupa",
    }),
    (p11 = {
        nome: "SALVADOR",
        categoria: "cidade",
    }),
    (p12 = {
        nome: "LONDRINA",
        categoria: "cidade",
    }),
    (p13 = {
        nome: "QUEIMADOS",
        categoria: "cidade",
    }),
    (p14 = {
        nome: "CASTANHAL",
        categoria: "cidade",
    }),
    (p15 = {
        nome: "CAMAÇARI",
        categoria: "cidade",
    }),
];

escolherPalavra();
function escolherPalavra() {
    const indexPalavra = parseInt(Math.random() * palavras.length);

    palavraSorteada = palavras[indexPalavra].nome;
    categoriaSorteada = palavras[indexPalavra].categoria;
}

mostrarPalavra();
function mostrarPalavra() {
    const palavra = document.getElementById("palavraSecreta");
    palavra.innerHTML = "";

    const categoria = document.getElementById("categoria");
    categoria.innerHTML = categoriaSorteada;

    for (i = 0; i < palavraSorteada.length; i++) {
        if (lista[i] == undefined) {
            lista[i] = "&nbsp;";
            palavra.innerHTML =
                palavra.innerHTML + "<div class='letras'>" + lista[i] + "</div>";
        } else {
            palavra.innerHTML =
                palavra.innerHTML + "<div class='letras'>" + lista[i] + "</div>";
        }
    }
}

function verificarLetra(letra) {
    document.getElementById("tecla_" + letra).disabled = true;

    if (erros > 0) {
        marcarLetra("tecla_" + letra);
        compararLetra(letra);
        mostrarPalavra();
    }
}

function marcarLetra(tecla) {
    document.getElementById(tecla).style.background = "#0e3600";
    document.getElementById(tecla).style.color = "#fff";
}

function compararLetra(letra) {
    const posicao = palavraSorteada.indexOf(letra);

    if (posicao < 0) {
        erros--;
        trocarImagem();

        if (erros == 0) {
            abrirModal("Vish, perdeu! Mas relaxe, tente mais uma aee!!!<br>Ahhh antes que eu me esqueça, a palavra era " + palavraSorteada + ".");
        }

    } else {
        for (i = 0; i < palavraSorteada.length; i++) {
            if (palavraSorteada[i] == letra) {
                lista[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] != lista[i]) {
            vitoria = false;
        }
    }

    if (vitoria == true) {
        abrirModal("Aeee! Legal, acertou a palavra!!!<br>Tem coragem de tentar mais uma?");
        erros = 0;
    }
}


function trocarImagem() {
    switch (erros) {
        case 5:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca01.png')"
            break;
        case 4:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca02.png')"
            break;
        case 3:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca03.png')"
            break;
        case 2:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca04.png')"
            break;
        case 1:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca05.png')"
            break;
        case 0:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca06.png')"
            break;
        default:
            document.getElementById("imagemForca").style.background = "url('/assets/img/forca.png')"
            break;
    }
}

function abrirModal(mensagem) {
    let modaltxt = document.getElementById("modaltxt");
    modaltxt.innerHTML = mensagem;

    $("#modal").modal({
        show: true
    });
}


/*
Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Einnta, perdeu hem... bóra tentar outra?!',
        showConfirmButton: false,
        timer: 2000
      })
*/