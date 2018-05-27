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
    const { err, result } = board.updateGrid(
      game.currentP,
      [parseInt(startPosition[0]), parseInt(startPosition[1])],
      [parseInt(endPosition[0]), parseInt(endPosition[1])]
    );
    if (err) {
      console.log(err);
    } else {
      board.showGrid();
      const temp = game.currentP;
      game.currentP = game.nextP;
      game.nextP = temp;
      console.log("Your turn: " + game.currentP.name);
    }
  }
});

function exitHandler(options, err) {
  if (options.endMessage) {
    const hrend = process.hrtime(hrstart);
    console.log("Game time (sec): ", hrend[0]);
  }
  if (err) console.log(err.stack);
  process.exit();
}

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { endMessage: true }));
