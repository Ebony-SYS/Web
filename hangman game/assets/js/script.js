let categoriaSorteada;
let palavraSorteada;
let erros = 6;
let lista = [];

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
        // mudar imagem da forca
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
        //mensagem de vitoria
        erros = 0;
    }
}


function novaImagem() {
    
}