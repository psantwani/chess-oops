class Game {
  constructor(board, whiteP, blackP) {
    this.board = board;
    this.whiteP = whiteP;
    this.blackP = blackP;
    this.currentP = whiteP;
    this.nextP = blackP;
    this.winner = null;
  }
}

module.exports = Game;
