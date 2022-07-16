let game = {
  locMode: false,
  primeiraCarta: null,
  segundaCarta: null,

  valoresCartas: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],

  setCarta: function (id) {
    let carta = this.cartas.filter((carta) => carta.id === id)[0];

    if (carta.flipped || this.locMode) {
      return false;
    }

    if (!this.primeiraCarta) {
      this.primeiraCarta = carta;
      this.primeiraCarta.flipped = true
      return true;
    } else {
      this.segundaCarta = carta;
      this.segundaCarta.flipped = true
      this.locMode = true;
      return true;
    }
  },

  desviraCarta: function () {
    this.primeiraCarta.flipped = false
    this.segundaCarta.flipped = false
    this.resetaCartas()
  },

  verificaCartasIguais: function () {
    if (!this.primeiraCarta || !this.segundaCarta) {
      return false
    } 
    return this.primeiraCarta.icon === this.segundaCarta.icon
  },

  resetaCartas: function () {
    this.primeiraCarta = null
    this.segundaCarta = null
    this.locMode = false
  },

  verificaGameOver: function () {
    return this.cartas.filter(carta => !carta.flipped).length == 0
  },

  cartas: null,

  criaCartas: function () {
    this.cartas = [];

    for (let valor of this.valoresCartas) {
      this.cartas.push(this.criaParCarta(valor));
    }

    this.cartas = this.cartas.flatMap((par) => par);
    this.embaralhaCartas();

    return this.cartas;
  },

  criaParCarta: function (valor) {
    return [
      {
        id: this.criaId(valor),
        icon: valor,
        flipped: false,
      },
      {
        id: this.criaId(valor),
        icon: valor,
        flipped: false,
      },
    ];
  },

  criaId: function (valor) {
    return valor + parseInt(Math.random() * 1000);
  },

  embaralhaCartas: function () {
    let indexAtual = this.cartas.length;
    let indexRandom = 0;

    while (indexAtual !== 0) {
      indexRandom = Math.floor(Math.random() * indexAtual);
      indexAtual--;

      [this.cartas[indexRandom], this.cartas[indexAtual]] = [
        this.cartas[indexAtual],
        this.cartas[indexRandom],
      ];
    }
  },
};
