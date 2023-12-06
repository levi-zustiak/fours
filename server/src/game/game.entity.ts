import { v4 } from 'uuid';

type Player = any;

enum STAGE {
  WAITING = 'waiting',
  PLAYING = 'playing',
  DISCONNECTED = 'disconnected',
  ENDED = 'ended',
}

type Token = {
  playedBy: Player;
  coords: Coords;
};

type Coords = {
  row: number;
  col: number;
};

type Cell = any;

export class Game {
  public id: string;
  public host: Player;
  public peer: Player;
  public stage: STAGE;
  public players: Record<string, Player>;
  public board: any;
  public currentPlayer: number;
  public moveList: Array<Token>;

  constructor() {
    this.id = v4();
    this.host = null;
    this.peer = null;
    this.stage = STAGE.WAITING;
  }

  setHost(player) {
    this.host = player;
  }

  setPeer(player) {
    this.peer = player;
  }

  init() {
    this.currentPlayer =
      crypto.getRandomValues(new Uint8Array(1))[0] > 127 ? 0 : 1;

    // Possibly change playingAs to just be 0/1 instead of p1/p2
    this.players = [
      { ...this.host, playingAs: this.currentPlayer ? 'p2' : 'p1' },
      { ...this.peer, playingAs: this.currentPlayer ? 'p1' : 'p2' },
    ];

    this.board = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    this.stage = STAGE.PLAYING;
    this.moveList = [];
  }

  update(user: Player, col: number) {
    if (!this.validate(user)) {
      return;
    }

    const board = structuredClone(this.board);
    const row = board[col].indexOf(null);

    const token = {
      playedBy: this.currentPlayer,
      coords: { row, col },
      winningToken: false,
    };

    board[col][row] = token;
    this.moveList.push(token);

    this.board = board;

    if (this.checkWin()) {
      this.stage = STAGE.ENDED;

      return {
        stage: this.stage,
        board: this.board,
        currentPlayer: this.currentPlayer,
        moveList: this.moveList,
        //return result to return winner id or tie
      };
    } else {
      this.switchPlayer();

      return {
        board: this.board,
        currentPlayer: this.currentPlayer,
        moveList: this.moveList,
      };
    }
  }

  validate(player: Player) {
    return (
      player.id === this.players[this.currentPlayer].id &&
      this.stage === STAGE.PLAYING
    );
  }

  checkWin() {
    return (
      this.checkVertical() ||
      this.checkHorizontal() ||
      this.checkRightDiagonal() ||
      this.checkLeftDiagonal()
    );
  }

  private checkVertical(): boolean {
    const { row, col } = this.moveList.at(-1).coords;
    const minRow = this.min(row);

    if (row < 3) return false;

    const segment = this.board[col].slice(minRow, row + 1);

    if (this.checkArray(segment)) {
      segment.forEach((token) => (token.winningToken = true));
      return true;
    } else {
      return false;
    }
  }

  private checkHorizontal(): boolean {
    const { row, col } = this.moveList.at(-1).coords;
    const minCol = this.min(col);
    const maxCol = this.max(col, 6) + 1;

    for (
      let lowerBound = minCol, upperBound = minCol + 4;
      upperBound <= maxCol;
      lowerBound++, upperBound++
    ) {
      const segment = this.board
        .slice(lowerBound, upperBound)
        .map((col) => col[row]);

      if (this.checkArray(segment)) {
        segment.forEach((token) => (token.winningToken = true));
        return true;
      } else {
        return false;
      }
    }
  }

  private checkRightDiagonal(): boolean {
    for (let col = 0; col <= 3; col++) {
      for (let row = 0; row < 4; row++) {
        const segment = [
          this.board[col][row],
          this.board[col + 1][row + 1],
          this.board[col + 2][row + 2],
          this.board[col + 3][row + 3],
        ];

        if (this.checkArray(segment)) {
          segment.forEach((token) => (token.winningToken = true));
          return true;
        } else {
          return false;
        }
      }
    }
  }

  private checkLeftDiagonal(): boolean {
    for (let col = 3; col <= 6; col++) {
      for (let row = 0; row < 4; row++) {
        const segment = [
          this.board[col][row],
          this.board[col - 1][row + 1],
          this.board[col - 2][row - 2],
          this.board[col - 3][row - 3],
        ];
        if (this.checkArray(segment)) {
          segment.forEach((token) => (token.winningToken = true));
          return true;
        } else {
          return false;
        }
      }
    }
  }

  private checkDraw(): boolean {
    return !this.board.flat().some((cell) => cell === null);
  }

  private checkArray(arr: Cell[]): boolean {
    return arr.every((token) => token && token.playedBy === arr[0].playedBy);
  }

  private min(num: number): number {
    return Math.max(num - 3, 0);
  }

  private max(num: number, max: number): number {
    return Math.min(num + 3, max) + 1;
  }

  switchPlayer() {
    this.currentPlayer = 1 - this.currentPlayer;
  }
}
