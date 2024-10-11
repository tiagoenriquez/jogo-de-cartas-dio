class TelaPresenter {
    /** @type {Jogador} */ jogador;
    /** @type {Jogador} */ oponente;
    /** @type {Jogo} */ jogo
    /** @type {HTMLParagraphElement} */ vitoriasElement;
    /** @type {HTMLParagraphElement} */ derrotasElement;
    /** @type {HTMLCollectionOf<HTMLDivElement>} */ cartasDoOponenteElements;
    /** @type {HTMLCollectionOf<HTMLDivElement>} */ cartasDoJogadorElements;
    /** @type {HTMLDivElement} */ cartaLancadaPeloJogadorElement;
    /** @type {HTMLDivElement} */ cartaLancadaPeloOponenteElement;
    /** @type {HTMLButtonElement} */ button

    constructor() {
        this.jogador = new Jogador('jogador');
        this.oponente = new Jogador('oponente');
        this.vitoriasElement = document.getElementById('vitorias');
        this.derrotasElement = document.getElementById('derrotas');
        this.cartasDoOponenteElements = document.getElementsByClassName('lugar-de-carta-de-oponente');
        this.cartasDoJogadorElements = document.getElementsByClassName('lugar-de-carta-de-jogador');
        this.cartaLancadaPeloJogadorElement = document.getElementById('carta-lancada-pelo-jogador');
        this.cartaLancadaPeloOponenteElement = document.getElementById('carta-lancada-pelo-oponente');
        this.button = document.getElementsByTagName('button')[0];
        this.comecarNovoJogo();
        this.atualizarHistorico();
    }

    /**
     * @private
     */
    comecarNovoJogo = () => {
        this.jogo = new Jogo(this.jogador, this.oponente);
        this.removerCartasLancadas();
        this.porCartasNaMesa();
        this.adicionarEventos();
        this.esconderBotao();
    }

    /**
     * @private
     */
    atualizarHistorico = () => {
        this.vitoriasElement.textContent = `Vitórias: ${this.jogador.vitorias.toString()}`;
        this.derrotasElement.textContent = `Derrotas: ${this.jogador.derrotas.toString()}`;
    }

    /**
     * 
     * @param {HTMLDivElement} lugar 
     * @private
     */
    porCarta = (lugar) => {
        lugar.classList.add('carta-virada');
        lugar.style.backgroundColor = 'rgb(246, 193, 53)';
        lugar.style.backgroundImage = '';
    }

    /**
     * 
     * @param {HTMLDivElement} lugar 
     * @private
     */
    tirarCarta = (lugar) => {
        lugar.classList.remove('carta-virada');
        lugar.style.backgroundColor = '';
        lugar.style.backgroundImage = '';
    }

    /**
     * @private
     */
    porCartasNaMesa = () => {
        for (let i = 0; i < this.cartasDoOponenteElements.length; i++) {
            const cartaDoOponenteElement = this.cartasDoOponenteElements[i];
            const cartaDoJogadorElement = this.cartasDoJogadorElements[i];
            this.porCarta(cartaDoOponenteElement);
            this.porCarta(cartaDoJogadorElement);
            this.esconderCarta(cartaDoOponenteElement);
            this.esconderCarta(cartaDoJogadorElement);
        }
    }

    /**
     * 
     * @param {HTMLDivElement} lugar 
     * @param {number} id 
     * @param {Jogador} jogador 
     * @private
     */
    revelarCarta = (lugar, id, jogador) => {
        lugar.style.backgroundColor = 'white';
        lugar.style.backgroundImage = `url("./img/${jogador.cartas[id].valor}.png")`;
        lugar.style.backgroundSize = 'cover';
    }

    /**
     * 
     * @param {HTMLDivElement} lugar 
     * @private
     */
    esconderCarta = (lugar) => {
        lugar.style.backgroundColor = 'rgb(246, 193, 53)';
        lugar.style.backgroundImage = '';
    }

    /**
     * @private
     */
    sortearCartaAdversaria = () => {
        const id = Math.floor(Math.random() * this.oponente.cartas.length);
        this.revelarCarta(this.cartaLancadaPeloOponenteElement, id, this.oponente);
        return id;
    }

    /**
     * @private
     */
    removerEventos = () => {
        for (let i = 0; i < this.cartasDoJogadorElements.length; i++) {
            const carta = this.cartasDoJogadorElements[i];
            carta.onmouseover = null;
            carta.onmouseleave = null;
            carta.onclick = null;
        }
    }

    /**
     * @private
     */
    removerCartasDasMesas = () => {
        for (let i = 0; i < this.cartasDoOponenteElements.length; i++) {
            const cartaDoOponenteElement = this.cartasDoOponenteElements[i];
            const cartaDoJogadorElement = this.cartasDoJogadorElements[i];
            this.tirarCarta(cartaDoOponenteElement);
            this.tirarCarta(cartaDoJogadorElement);
        }
    }

    /**
     * 
     * @param {string} texto 
     * @private
     */
    mostrarBotao = (texto) => {
        this.button.textContent = texto;
        this.button.style.display = 'inline-block';
        this.button.onclick = this.comecarNovoJogo;
    }

    /**
     * @private
     */
    esconderBotao = () => {
        this.button.style.display = 'none';
    }

    /**
     * 
     * @param {number} idDaCartaDoJogador 
     */
    escolherCarta = (idDaCartaDoJogador) => {
        this.removerEventos();
        this.revelarCarta(this.cartaLancadaPeloJogadorElement, idDaCartaDoJogador, this.jogador);
        const idDaCartaDoOponente = this.sortearCartaAdversaria();
        this.removerEventos();
        this.removerCartasDasMesas();
        const resultado = this.jogo.conferirVencedor(idDaCartaDoJogador, idDaCartaDoOponente);
        this.atualizarHistorico();
        this.mostrarBotao(resultado);
    }

    removerCartasLancadas = () => {
        this.esconderCarta(this.cartaLancadaPeloJogadorElement);
        this.esconderCarta(this.cartaLancadaPeloOponenteElement);
        this.tirarCarta(this.cartaLancadaPeloJogadorElement);
        this.tirarCarta(this.cartaLancadaPeloOponenteElement);
    }

    /**
     * @private
     */
    adicionarEventos = () => {
        for (let i = 0; i < this.cartasDoJogadorElements.length; i++) {
            const carta = this.cartasDoJogadorElements[i];
            carta.onmouseover = () => this.revelarCarta(carta, i, this.jogador);
            carta.onmouseleave = () => this.esconderCarta(carta);
            carta.onclick = () => this.escolherCarta(i);
        }
    }
}