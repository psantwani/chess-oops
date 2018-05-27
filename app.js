const Player = require("./Player");
const Board = require("./Board");
const Game = require("./Game");

const whiteP = new Player("Piyush", "white");
const blackP = new Player("Computer", "black");
const board = new Board();
const game = new Game(board, whiteP, blackP);
const hrstart = process.hrtime();

// Start Screen
board.showGrid();
const stdin = process.openStdin();
console.log("Type in the following format: 6,1 -> 5,1");
console.log("Your turn: " + game.currentP.name);
stdin.addListener("data", d => {
  const command = d
    .toString()
    .trim()
    .split("->");
  if (command.length !== 2) {
    console.log("Invalid command");
  } else {
    const startPosition = command[0].trim().split(",");
    const endPosition = command[1].trim().split(",");
    move(startPosition, endPosition);
  }
});

function move(startPosition, endPosition) {
  const { err, result } = board.updateGrid(
    game.currentP,
    [parseInt(startPosition[0]), parseInt(startPosition[1])],
    [parseInt(endPosition[0]), parseInt(endPosition[1])]
  );
  if (err) {
    console.log(err);
  } else {
    board.showGrid();
    if (result === "Game Over") {
      process.exit(1);
    }
    const temp = game.currentP;
    game.currentP = game.nextP;
    game.nextP = temp;
    console.log("Your turn: " + game.currentP.name);
  }
}

const simulationStartPos = [
  [6, 0],
  [1, 0],
  [7, 0],
  [1, 3],
  [5, 0],
  [0, 2],
  [6, 6],
  [1, 4],
  [5, 7],
  [0, 3],
  [6, 5],
  [4, 7],
  [7, 4],
  [5, 6]
];
const simulationEndPos = [
  [4, 0],
  [2, 0],
  [5, 0],
  [2, 3],
  [5, 7],
  [5, 7],
  [5, 7],
  [2, 4],
  [4, 7],
  [4, 7],
  [5, 5],
  [5, 6],
  [6, 5],
  [6, 5]
];
let i = 0;

setInterval(() => {
  if (i < simulationStartPos.length) {
    move(simulationStartPos[i], simulationEndPos[i]);
    i++;
  } else {
    console.log("end simulation");
    process.exit(1);
  }
}, 2000);

function exitHandler(options, err) {
  if (options.endMessage) {
    const hrend = process.hrtime(hrstart);
    console.log("Game time (sec): ", hrend[0]);
  }
  process.exit();
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { endMessage: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { endMessage: true }));
