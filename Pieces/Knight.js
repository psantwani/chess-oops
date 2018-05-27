const IPiece = require("./IPiece");

class Knight extends IPiece {
  move(board, startPosition, endPosition) {
    if (!this.checkIfMoveWithinBounds(startPosition, endPosition)) {
      return {
        err: "Invalid move",
        result: false
      };
    }
    const validEndPositions = this.computeValidEndPositions(startPosition);
    const e = endPosition.join(",");
    if (!validEndPositions.includes(e)) {
      return { err: "Invalid move", result: false };
    }

    const pieceAtEndPosition = board[endPosition[0]][endPosition[1]];
    if (pieceAtEndPosition.color === this.color) {
      return {
        err: "Invalid move",
        result: false
      };
    }

    this.currentPosition = endPosition;
    return { err: null, result: true };
  }

  computeValidEndPositions(startPosition) {
    const x1 = startPosition[0];
    const y1 = startPosition[1];
    return [
      `${x1 + 1},${y1 - 2}`,
      `${x1 + 1},${y1 + 2}`,
      `${x1 + 2},${y1 - 1}`,
      `${x1 + 2},${y1 + 1}`,
      `${x1 - 1},${y1 - 2}`,
      `${x1 - 1},${y1 + 2}`,
      `${x1 - 2},${y1 - 1}`,
      `${x1 - 2},${y1 + 1}`
    ];
  }
}

module.exports = Knight;
