const palavras = [
    p01 = {
        nome: "goiaba",
        categoria: "fruta"
    },
    p02 = {
        nome: "damasco",
        categoria: "fruta"
    },
    p03 = {
        nome: "lichia",
        categoria: "fruta"
    },
    p04 = {
        nome: "pandanus",
        categoria: "fruta"
    },
    p05 = {
        nome: "cherimola",
        categoria: "fruta"
    },
    p06 = {
        nome: "agasalho",
        categoria: "roupa"
    },
    p07 = {
        nome: "cachecol",
        categoria: "roupa"
    },
    p08 = {
        nome: "jardineira",
        categoria: "roupa"
    },
    p09 = {
        nome: "pantalonas",
        categoria: "roupa"
    },
    p10 = {
        nome: "terno",
        categoria: "roupa"
    },
    p11 = {
        nome: "salvador",
        categoria: "cidade"
    },
    p12 = {
        nome: "londrina",
        categoria: "cidade"
    },
    p13 = {
        nome: "queimados",
        categoria: "cidade"
    },
    p14 = {
        nome: "castanhal",
        categoria: "cidade"
    },
    p15 = {
        nome: "camaçari",
        categoria: "cidade"
    }    
];

function escolherPalavra() {
    const indexPalavra = parseInt(Math.random() * palavras.length)
}