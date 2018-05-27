const Pawn = require("./Pawn");

class IPiece {
  constructor(color, position) {
    this.color = color;
    this.initialPosition = position;
    this.currentPosition = position;
  }

  checkFirstPieceInPath(board, startPosition, endPosition, direction) {
    let Piece = null;
    let x1 = startPosition[0];
    let x2 = endPosition[0];
    let y1 = startPosition[1];
    let y2 = endPosition[1];
    const leftOrRight = y2 > y1 ? "right" : "left";
    const topOrBottom = x2 > x1 ? "bottom" : "top";
    switch (direction) {
      case "vertical":
        if (topOrBottom === "bottom") {
          while (x2 > x1) {
            x1++;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        } else {
          while (x1 > x2) {
            x1--;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        }
        break;
      case "horizontal":
        if (topOrBottom === "right") {
          while (y2 > y1) {
            y1++;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        } else {
          while (y1 > y2) {
            y1--;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        }
        break;
      case "diagonal":
        if (topOrBottom === "bottom" && leftOrRight === "left") {
          while (x2 > x1) {
            x1++;
            y1--;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        } else if (topOrBottom === "bottom" && leftOrRight === "right") {
          while (x2 > x1) {
            x1++;
            y1++;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        } else if (topOrBottom === "top" && leftOrRight === "left") {
          while (x1 > x2) {
            x1--;
            y1--;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        } else if (topOrBottom === "top" && leftOrRight === "right") {
          while (x1 > x2) {
            x1--;
            y1++;
            Piece = board[x1][y1];
            if (Piece) {
              break;
            }
          }
        }
        break;
      default:
        break;
    }
    return Piece;
  }
}

module.exports = IPiece;
