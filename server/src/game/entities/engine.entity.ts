import { Cell, Position } from '../game.types';
import { Player } from './player.entity';

export class Engine {
  public board: any;
  public currentPlayer: Position;
  public moveList: Array<Cell>;
  public playing: boolean;

  constructor() {
    this.currentPlayer = 0;
    this.playing = true;
    this.board = [
      [
        { playedBy: 0, coords: { row: 0, col: 0 }, winningToken: false },
        { playedBy: 0, coords: { row: 1, col: 0 }, winningToken: false },
        { playedBy: 0, coords: { row: 2, col: 0 }, winningToken: false },
        null,
        null,
        null,
        //null,
        //null,
      ],
      [
        { playedBy: 1, coords: { col: 1, row: 0, winningToken: false } },
        { playedBy: 1, coords: { col: 1, row: 1, winningToken: false } },
        { playedBy: 1, coords: { col: 1, row: 2, winningToken: false } },
        null,
        null,
        //null,
        //null,
      ],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    this.moveList = [];
  }

  public update(col: number) {
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
      this.playing = false;
    } else {
      this.switchPlayer();
    }
  }

  public validate(player: Player) {
    return player.playingAs === this.currentPlayer && this.playing;
  }

  private switchPlayer() {
    this.currentPlayer = (1 - this.currentPlayer) as Position;
  }

  private checkWin() {
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
}
