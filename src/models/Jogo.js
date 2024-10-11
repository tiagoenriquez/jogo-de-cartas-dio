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
        this.sortearCartas();
    }

    /**
     * @private
     */
    sortearCartas() {
        const idsDeCartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        for (let i = 0; i < 10; i++) {
            const idSorteado = Math.floor(Math.random() * idsDeCartas.length);
            if (i % 2 === 0) {
                this.jogador.receberCarta(cartas.filter(carta => carta.id === idSorteado)[0]);
            } else {
                this.oponente.receberCarta(cartas.filter(carta => carta.id === idSorteado)[0]);
            }
            idsDeCartas.splice(idSorteado, 1);
        }
    }
}