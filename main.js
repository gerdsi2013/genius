let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const buttonPlay = document.getElementById("button-play");
const viewsScore = document.getElementById("views-score");

// criação de ordem aleatoria das cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    ligthColor(elementColor, Number(i) + 1);
  }
};

// acende a proxima cor
let ligthColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  });
};

// checa se os botoes clicados são as mesmas de ordem geradas no jogo
let checkOrder = () => {

  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      viewsScore.innerHTML = `${score - 1}`;
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    viewsScore.textContent = score;
    nextLivel();
  }
};

//função para o click do usuario

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};
// criar a função que retornar a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};
// função para o nosso proximo nivel do jogo
let nextLivel = () => {
  score++;
  shuffleOrder();
};

// função para o gameOver

let gameOver = () => {
  setTimeout(() => {
    order = [];
    clickedOrder = [];
  }, 5000);

  viewsScore.textContent = "Game over";

  setTimeout(() => {
    location.reload();
  }, 3000);
};
//
let playGame = () => {
  score = 0;
  nextLivel();
};

//eventos de click para nossas cores

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//  iniciar o jogo
buttonPlay.addEventListener("click", function () {
  playGame();
});
