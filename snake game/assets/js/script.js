window.onload = function () {
    var tela = document.getElementById('tela');   // criando a tela
    var ctx = tela.getContext("2d");      
    var velx = vely = 0;              // velocidade 
    var inix = iniy = 10;             // posição inicial da cobra
    var macax = macay = 20;           // posição inicial da maçã
    var tamp = 20;
    var qtdp = 28;                    // tamanho do quadrado 
    var rastro = [];                  // Rastro da cobra
    var pont = 0;
    const vel = 1;                    // velocidade   

    document.addEventListener("keydown", keyPush); 
    setInterval(jogo, 1000/15);       // Intervalo no qual a função será chamada
    ras = 3;                          // Tamanho inicial da cobra

    function jogo() {
        inix += velx;                 // atualizado posição da cabela da cobra
        iniy += vely                  // a cada vez que  a função é chamada.

        if (inix < 0) {               // quando a cobra atingir a margem, ela
            inix = qtdp -1;           // será enviada para o outro lado da tela. 
        }
        if (inix > qtdp -1) {
            inix = 0;
        }
        if (iniy < 0) {
            iniy = qtdp -1;
        }
        if (iniy > qtdp -1) {
            iniy = 0;
        }


        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, tela.width, tela.height);
        
        ctx.fillStyle = "#af2b2b";
        ctx.fillRect(macax*tamp, macay*tamp, tamp, tamp);

        ctx.fillStyle = "black";
        for(var i=0; i<rastro.length; i++) {
            ctx.fillRect(rastro[i].x*tamp, rastro[i].y*tamp, tamp-1, tamp-1);

            if(rastro[i].x == inix && rastro[i].y == iniy) {
                velx = vely = 0;
                ras = 3;
                pont = 0
            }
        }

        rastro.push({x:inix, y:iniy})     // Tirando um elemento da cobra sempre que o
        while(rastro.length > ras) {      // rastro for maior que o tamanho real da cobra.
            rastro.shift();
        }

        if(macax == inix && macay == iniy) {
            ras++;                                    // Rastro aumenta 1, se a cabeça estiver na 
            macax = Math.floor(Math.random()*qtdp);   // mesma posição que a maçã.
            macay = Math.floor(Math.random()*qtdp);   // Reposicionando a nova maçã
            pont++;
        }
    }

    function keyPush(event) {
        switch(event.keyCode) {
            case 37:             // 37 -> esquerda
                velx =- vel;
                vely = 0
                break;

            case 38:             // 38 -> cima
                velx = 0;
                vely = -vel;
                break;

            case 39:             // 39 -> direita  
                velx = vel;
                vely = 0;
                break;

            case 40:             // 40 -> baixo
                velx = 0;
                vely = vel;
                break;

            default:
                break;
        }
    }

}
