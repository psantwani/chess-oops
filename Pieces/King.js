const IPiece = require("./IPiece");
class King extends IPiece {
  move(board, startPosition, endPosition) {
    if (!this.checkIfMoveWithinBounds(startPosition, endPosition)) {
      return {
        err: "Invalid move",
        result: false
      };
    }
    const moveDirection = this.getMoveDirection(startPosition, endPosition);
    if (
      ![
        "left",
        "right",
        "top",
        "down",
        "left-bottom",
        "right-bottom",
        "left-top",
        "right-top"
      ].includes(moveDirection)
    ) {
      return {
        err: "Invalid move",
        result: false
      };
    }

    let x1 = startPosition[0];
    let x2 = endPosition[0];
    let y1 = startPosition[1];
    let y2 = endPosition[1];
    if (Math.abs(x1 - x2) > 1 || Math.abs(y1 - y1) > 1) {
      return {
        err: "Invalid move",
        return: false
      };
    }

    const pieceAtEndPosition = board[endPosition[0]][endPosition[1]];
    if (pieceAtEndPosition.color === this.color) {
      return {
        err: "Invalid move",
        result: false
      };
    }

    this.currentPosition = endPosition;
    return {
      err: null,
      result: true
    };
  }
}

module.exports = King;
