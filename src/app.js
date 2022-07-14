//HTML Elements
const statusContainer = document.querySelector(".status-display");
const resetContainer = document.querySelector(".reset-button");
const cellContainer = document.querySelectorAll(".cell");

//Constants
const xSymbol = "×";
const oSymbol = "○";

// Game Variables
let gameIsOn = true;
let xIsNext = true;

//functions
const letterToSymbol = (letter) => (letter === "x" ? xSymbol : oSymbol);

const handleWinner = (letter) => {
  gameIsOn = false;
  if (letter === "x") {
    statusContainer.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    statusContainer.innerHTML = `<span>${letterToSymbol(
      letter
    )} has won!</span>`;
  }
};

const gameStatus = () => {
  const topLeft = cellContainer[0].classList[2];
  const topMiddle = cellContainer[1].classList[2];
  const topRight = cellContainer[2].classList[2];
  const middleLeft = cellContainer[3].classList[2];
  const middleMiddle = cellContainer[4].classList[2];
  const middleRight = cellContainer[5].classList[2];
  const bottomLeft = cellContainer[6].classList[2];
  const bottomMiddle = cellContainer[7].classList[2];
  const bottomRight = cellContainer[8].classList[2];

  //Winner Check Condition

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWinner(topLeft);
    cellContainer[0].classList.add("won");
    cellContainer[1].classList.add("won");
    cellContainer[2].classList.add("won");
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWinner(middleLeft);
    cellContainer[3].classList.add("won");
    cellContainer[4].classList.add("won");
    cellContainer[5].classList.add("won");
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWinner(bottomLeft);
    cellContainer[6].classList.add("won");
    cellContainer[7].classList.add("won");
    cellContainer[8].classList.add("won");
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWinner(topLeft);
    cellContainer[0].classList.add("won");
    cellContainer[3].classList.add("won");
    cellContainer[6].classList.add("won");
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWinner(topMiddle);
    cellContainer[1].classList.add("won");
    cellContainer[4].classList.add("won");
    cellContainer[7].classList.add("won");
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWinner(topRight);
    cellContainer[2].classList.add("won");
    cellContainer[5].classList.add("won");
    cellContainer[8].classList.add("won");
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWinner(topLeft);
    cellContainer[0].classList.add("won");
    cellContainer[4].classList.add("won");
    cellContainer[8].classList.add("won");
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWinner(topRight);
    cellContainer[2].classList.add("won");
    cellContainer[4].classList.add("won");
    cellContainer[6].classList.add("won");
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsOn = false;
    statusContainer.innerHTML = "Game is tied!";
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusContainer.innerHTML = `${xSymbol} is next`;
    } else {
      statusContainer.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

//Event Handlers
const handleReset = (event) => {
  xIsNext = true;
  statusContainer.innerHTML = `${xSymbol} is next `;
  for (const cell of cellContainer) {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("won");
  }
  gameIsOn = true;
};

const handleCellClick = (event) => {
  const classList = event.target.classList;

  if (!gameIsOn || classList[1] === "x" || classList[1] === "o") {
    return;
  }

  if (xIsNext) {
    classList.add("x");
  } else {
    classList.add("o");
  }
  gameStatus();
};

//Event Listeners
resetContainer.addEventListener("click", handleReset);

for (const cell of cellContainer) {
  cell.addEventListener("click", handleCellClick);
}
