const IPiece = require("./IPiece");

class Pawn extends IPiece {
  move(board, startPosition, endPosition) {
    const b = board,
      s = startPosition,
      e = endPosition;

    if (!this.checkIfMoveWithinBounds(s, e)) {
      return {
        err: "Invalid move",
        result: false
      };
    }

    if (
      this.singleStep(b, s, e) ||
      this.twoStep(b, s, e) ||
      this.killerMove(b, s, e)
    ) {
      this.currentPosition = endPosition;
      return { err: null, result: true };
    } else {
      return { err: "Invalid move", result: false };
    }
  }

  singleStep(board, startPosition, endPosition) {
    const step = this.color === "white" ? -1 : 1;
    const pieceAtEndPosition = board[endPosition[0]][endPosition[1]];
    if (
      !pieceAtEndPosition &&
      endPosition[0] === startPosition[0] + step &&
      endPosition[1] === startPosition[1]
    ) {
      console.log("Single step move");
      return true;
    }

    return false;
  }

  twoStep(board, startPosition, endPosition) {
    const step = this.color === "white" ? -2 : 2;
    const pieceAtEndPosition = board[endPosition[0]][endPosition[1]];
    const direction = this.getMoveDirection(startPosition, endPosition);
    if (
      direction &&
      !pieceAtEndPosition &&
      !this.checkFirstPieceInPath(
        board,
        startPosition,
        endPosition,
        direction
      ) &&
      this.currentPosition === this.initialPosition &&
      endPosition[0] === startPosition[0] + step &&
      endPosition[1] === startPosition[1]
    ) {
      console.log("Two step move");
      return true;
    }

    return false;
  }

  killerMove(board, startPosition, endPosition) {
    const validRow =
      this.color === "white" ? startPosition[0] - 1 : startPosition[0] + 1;
    const validColumn = [startPosition[1] + 1, startPosition[1] - 1];

    const pieceAtEndPosition = board[endPosition[0]][endPosition[1]];
    if (
      pieceAtEndPosition &&
      pieceAtEndPosition.color !== this.color &&
      endPosition[0] === validRow &&
      validColumn.includes(endPosition[1])
    ) {
      console.log("Killer move");
      return true;
    }

    return false;
  }
}

module.exports = Pawn;
