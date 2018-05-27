const Pawn = require("./Pawn");

class IPiece {
  constructor(name, color, position) {
    this.name = name;
    this.color = color;
    this.initialPosition = position;
    this.currentPosition = position;
  }

  checkIfMoveWithinBounds(startPosition, endPosition) {
    let x1 = startPosition[0];
    let x2 = endPosition[0];
    let y1 = startPosition[1];
    let y2 = endPosition[1];
    if (
      x1 >= 0 &&
      x1 <= 7 &&
      y1 >= 0 &&
      y1 <= 7 &&
      x2 >= 0 &&
      x2 <= 7 &&
      y2 >= 0 &&
      y2 <= 7
    ) {
      return true;
    }

    return false;
  }

  getMoveDirection(startPosition, endPosition) {
    let x1 = startPosition[0];
    let x2 = endPosition[0];
    let y1 = startPosition[1];
    let y2 = endPosition[1];
    let direction;

    if (x1 === x2 && y1 !== y2) {
      direction = "horizontal";
    } else if (y1 === y2 && x1 !== x2) {
      direction = "vertical";
    } else if (
      x1 !== x2 &&
      y1 !== y2 &&
      Math.abs(x1 - x2) === Math.abs(y1 - y2)
    ) {
      direction = "diagonal";
    } else {
      return null;
    }

    const leftOrRight = y2 > y1 ? "right" : "left";
    const topOrBottom = x2 > x1 ? "bottom" : "top";
    if (direction === "vertical") {
      direction = topOrBottom;
    } else if (direction === "horizontal") {
      direction = leftOrRight;
    } else {
      direction = `${leftOrRight}-${topOrBottom}`;
    }

    return direction;
  }

  checkFirstPieceInPath(board, startPosition, endPosition, direction) {
    let x1 = startPosition[0];
    let x2 = endPosition[0];
    let y1 = startPosition[1];
    let y2 = endPosition[1];
    let Piece = null;

    switch (direction) {
      case "bottom":
        x1 += 1;
        while (x2 > x1) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1++;
        }
        break;
      case "top":
        x1 -= 1;
        while (x1 > x2) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1--;
        }
        break;
      case "right":
        y1 += 1;
        while (y2 > y1) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          y1++;
        }
        break;
      case "left":
        y -= 1;
        while (y1 > y2) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          y1--;
        }
        break;
      case "left-bottom":
        x1 += 1;
        y1 -= 1;
        while (x2 > x1) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1++;
          y1--;
        }
        break;
      case "right-bottom":
        x1 += 1;
        y1 += 1;
        while (x2 > x1) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1++;
          y1++;
        }
        break;
      case "left-top":
        x1 -= 1;
        y1 -= 1;
        while (x1 > x2) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1--;
          y1--;
        }
        break;
      case "right-top":
        x1 -= 1;
        y1 += 1;
        while (x1 > x2) {
          Piece = board[x1][y1];
          if (Piece) {
            break;
          }
          x1--;
          y1++;
        }
        break;
      default:
        break;
    }
    return Piece;
  }
}

module.exports = IPiece;
