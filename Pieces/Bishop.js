const IPiece = require("./IPiece");
class Bishop extends IPiece {
  move(board, startPosition, endPosition) {
    if (!this.checkIfMoveWithinBounds(startPosition, endPosition)) {
      return {
        err: "Invalid move",
        result: false
      };
    }
    const moveDirection = this.getMoveDirection(startPosition, endPosition);
    if (
      !["left-bottom", "right-bottom", "left-top", "right-top"].includes(
        moveDirection
      )
    ) {
      return {
        err: "Invalid move",
        result: false
      };
    }

    if (
      this.checkFirstPieceInPath(
        board,
        startPosition,
        endPosition,
        moveDirection
      )
    ) {
      return {
        err: "Invalid move",
        result: false
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

module.exports = Bishop;
