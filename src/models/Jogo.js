class Jogo {
    /** @type {Jogador} */ jogador;
    /** @type {Jogador} */ oponente;

    /**
     * 
     * @param {Jogo} jogador 
     * @param {Jogo} oponente 
     */
    constructor(jogador, oponente) {
        this.jogador = jogador;
        this.oponente = oponente;
        this.jogador.removerCartas();
        this.oponente.removerCartas();
        this.sortearCartas();
    }

    /**
     * @private
     */
    sortearCartas = () => {
        const idsDeCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        for (let i = 0; i < 10; i++) {
            const idSorteado = Math.floor(Math.random() * idsDeCartas.length);
            if (i % 2 === 0) {
                this.jogador.receberCarta(cartas.filter(carta => carta.id === idsDeCartas[idSorteado])[0]);
            } else {
                this.oponente.receberCarta(cartas.filter(carta => carta.id === idsDeCartas[idSorteado])[0]);
            }
            idsDeCartas.splice(idSorteado, 1);
        }
    }

    /**
     * 
     * @param {number} idDaCartaDoJogador 
     * @param {number} idDaCartaDoOponente 
     */
    conferirVencedor = (idDaCartaDoJogador, idDaCartaDoOponente) => {
        const cartaDoJogador = this.jogador.cartas[idDaCartaDoJogador];
        const cartaDoOponente = this.oponente.cartas[idDaCartaDoOponente];
        if (cartaDoJogador.valor === 'pedra' && cartaDoOponente.valor === 'tesoura') {
            this.jogador.vitorias++;
            this.oponente.derrotas++;
            return 'Vitória';
        }
        if (cartaDoJogador.valor === 'pedra' && cartaDoOponente.valor === 'papel') {
            this.jogador.derrotas++;
            this.oponente.vitorias++;
            return 'Derrota';
        }
        if (cartaDoJogador.valor === 'papel' && cartaDoOponente.valor === 'pedra') {
            this.jogador.vitorias++;
            this.oponente.derrotas++;
            return 'Vitória';
        }
        if (cartaDoJogador.valor === 'papel' && cartaDoOponente.valor === 'tesoura') {
            this.jogador.derrotas++;
            this.oponente.vitorias++;
            return 'Derrota';
        }
        if (cartaDoJogador.valor === 'tesoura' && cartaDoOponente.valor === 'papel') {
            this.jogador.vitorias++;
            this.oponente.derrotas++;
            return 'Vitória';
        }
        if (cartaDoJogador.valor === 'tesoura' && cartaDoOponente.valor === 'pedra') {
            this.jogador.derrotas++;
            this.oponente.vitorias++;
            return 'Derrota';
        }
        return 'Empate';
    }
}