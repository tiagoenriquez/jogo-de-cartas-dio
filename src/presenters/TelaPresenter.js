class TelaPresenter {
    /** @type {Jogador} */ jogador;
    /** @type {Jogador} */ oponente;
    /** @type {Jogo} */ jogo
    /** @type {HTMLParagraphElement} */ vitoriasElement;
    /** @type {HTMLParagraphElement} */ derrotasElement;

    constructor() {
        this.jogador = new Jogador('jogador');
        this.oponente = new Jogador('oponente');
        this.vitoriasElement = document.getElementById('vitorias');
        this.derrotasElement = document.getElementById('derrotas');
        this.comecarNovoJogo();
        this.atualizarVitorias();
        this.atualizarDerrotas();
    }

    /**
     * @private
     */
    comecarNovoJogo() {
        this.jogo = new Jogo(this.jogador, this.oponente);
    }

    /**
     * @private
     */
    atualizarVitorias() {
        this.vitoriasElement.textContent = `Vitórias: ${this.jogador.vitorias}`;
    }

    /**
     * @private
     */
    atualizarDerrotas() {
        this.derrotasElement.textContent = `Derrotas: ${this.jogador.derrotas}`;
    }
}