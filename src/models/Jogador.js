class Jogador {
    /** @type {string} */ nome;
    /** @type {Carta[]} */ cartas;
    /** @type {number} */ vitorias;
    /** @type {number} */ derrotas;

    /**
     * 
     * @param {string} nome 
     */
    constructor(nome) {
        this.nome = nome;
        this.vitorias = 0;
        this.derrotas = 0;
    }

    /**
     * 
     * @param {Carta} cartas
     */
    receberCarta = (carta) => {
        this.cartas.push(carta);
    }

    /**
     * 
     * @param {number} index 
     */
    escolherCarta = (index) => {
        return this.cartas[index];
    }

    ganhar = () => {
        this.vitorias++;
    }

    perder = () => {
        this.derrotas++;
    }

    removerCartas = () => {
        this.cartas = [];
    }
}