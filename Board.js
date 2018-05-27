const Table = require("cli-table");
const { Pawn, Bishop, Knight, Rook, King, Queen } = require("./Pieces");
const mapping = {
  "♜": { name: "Rook", type: Rook, color: "black" },
  "♞": { name: "Knight", type: Knight, color: "black" },
  "♝": { name: "Bishop", type: Bishop, color: "black" },
  "♛": { name: "Queen", type: Queen, color: "black" },
  "♚": { name: "King", type: King, color: "black" },
  "♟": { name: "Bishop", type: Pawn, color: "black" },
  "♙": { name: "Pawn", type: Pawn, color: "white" },
  "♖": { name: "Rook", type: Rook, color: "white" },
  "♘": { name: "Knight", type: Knight, color: "white" },
  "♗": { name: "Bishop", type: Bishop, color: "white" },
  "♕": { name: "Queen", type: Queen, color: "white" },
  "♔": { name: "King", type: King, color: "white" }
};

class Board {
  constructor() {
    this.displaGrid = [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
    ];

    this.grid = [];

    for (let i = 0; i < this.displaGrid.length; i++) {
      let row = this.displaGrid[i],
        gridRow = [];
      for (let j = 0; j < row.length; j++) {
        const piece = mapping[this.displaGrid[i][j]];
        if (piece) {
          gridRow.push(new piece.type(piece.name, piece.color, [i, j]));
        } else {
          gridRow.push("");
        }
      }
      this.grid.push(gridRow);
    }
  }

  showGrid() {
    const table = new Table();
    table.push(["", "0", "1", "2", "3", "4", "5", "6", "7"]);
    for (let i = 0; i < this.displaGrid.length; i++) {
      table.push([].concat([i], this.displaGrid[i]));
    }
    console.log(table.toString());
  }

  updateGrid(player, startPosition, endPosition) {
    const piece = this.grid[startPosition[0]][startPosition[1]];

    if (!piece) {
      return {
        err: `No piece at ${startPosition}`
      };
    }
    if (piece.color !== player.color) {
      return {
        err: `You can only move ${player.color} pieces`,
        result: null
      };
    } else {
      const { err, result } = piece.move(this.grid, startPosition, endPosition);
      if (result) {
        const pieceAtEndPosition = this.grid[endPosition[0]][endPosition[1]];
        const gameOver = pieceAtEndPosition.name === "King" ? true : false;
        this.grid[endPosition[0]][endPosition[1]] = this.grid[startPosition[0]][
          startPosition[1]
        ];
        this.grid[startPosition[0]][startPosition[1]] = "";

        this.displaGrid[endPosition[0]][endPosition[1]] = this.displaGrid[
          startPosition[0]
        ][startPosition[1]];
        this.displaGrid[startPosition[0]][startPosition[1]] = "";

        if (gameOver) {
          console.log(`Game Over. ${player.name} wins.`);
          return { err: null, result: "Game Over" };
        }
      }
      return { err, result };
    }
  }
}

module.exports = Board;
