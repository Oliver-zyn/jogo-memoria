const front = "card_front";
const back = "card_back";
const card = "card";
const icon = "icon";

iniciaJogo();

function iniciaJogo() {
  iniciaCartas(game.criaCartas());
}

function iniciaCartas() {
  let gameBoard = document.querySelector("#gameBoard");
  gameBoard.innerHTML = "";

  for (let carta of game.cartas) {
    let elementoCarta = document.createElement("div");
    elementoCarta.id = carta.id;
    elementoCarta.classList.add(card);
    elementoCarta.dataset.icon = card.icon;

    criaContentCarta(carta, elementoCarta);

    elementoCarta.addEventListener("click", viraCarta);
    gameBoard.appendChild(elementoCarta);
  }
}

function criaContentCarta(carta, elementoCarta) {
  criaFaceCarta(front, carta, elementoCarta);
  criaFaceCarta(back, carta, elementoCarta);
}

function criaFaceCarta(face, carta, elementoCarta) {
  let faceCarta = document.createElement("div");
  faceCarta.classList.add(face);

  if (face == front) {
    let icone = document.createElement("img");
    icone.classList.add(icon);
    icone.src = "./images/" + carta.icon + ".png";
    faceCarta.appendChild(icone);
  } else {
    faceCarta.innerHTML = "&lt/&gt";
  }

  elementoCarta.appendChild(faceCarta);
}

function viraCarta() {
  if (game.setCarta(this.id)) {
    this.classList.add("flip");
    if (game.segundaCarta) {
      if (game.verificaCartasIguais()) {
        let primeiraCartaVirada = document.getElementById(
            game.primeiraCarta.id
          );
          let segundaCartaVirada = document.getElementById(
            game.segundaCarta.id
          );
          
          primeiraCartaVirada.firstChild.classList.add("bordaPar");
          segundaCartaVirada.firstChild.classList.add("bordaPar");

        game.resetaCartas();
        if (game.verificaGameOver()) {
          let gameOver = document.querySelector("#gameOver");
          gameOver.classList.remove('hide');
        }
      } else {
        setTimeout(() => {
          let primeiraCartaVirada = document.getElementById(
            game.primeiraCarta.id
          );
          let segundaCartaVirada = document.getElementById(
            game.segundaCarta.id
          );

          primeiraCartaVirada.classList.remove("flip");
          segundaCartaVirada.classList.remove("flip");
          game.desviraCarta();
        }, 800);
      }
    }
  }
}

function restart() {
  game.resetaCartas();
  iniciaJogo();
  let gameOver = document.querySelector("#gameOver");
  gameOver.classList.add('hide')
}
