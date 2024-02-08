import { User } from '@prisma/client';
import { v4 } from 'uuid';

import { Token, STAGE, Player, Position } from '../../../core/types/game';

export class Game {
  public id: string;
  public players: Array<Player>;
  public spectators: Array<User>;
  public stage: STAGE;
  public board: any;
  public currentPlayer: Position;
  public moveList: Array<Token>;

  constructor() {
    this.id = v4();
    this.stage = STAGE.WAITING;
    this.players = [];
    this.spectators = [];
  }

  addUser(user) {
    if (
      this.players.some((player) => player.id === user.id) ||
      this.spectators.some((player) => player.id === user.id)
    )
      return;

    // Have to add wins here since init will overwrite on each instance.
    this.players.length < 2
      ? this.players.push({ ...user, wins: 0 })
      : this.spectators.push(user);
  }

  init() {
    const p1 = crypto.getRandomValues(new Uint8Array(1))[0] > 127 ? 0 : 1;

    this.players[0].playingAs = p1;
    this.players[1].playingAs = (1 - p1) as Position;
    this.currentPlayer = 0;
    this.board = [
      [
        { playedBy: 0, coords: { row: 0, col: 0 }, winningToken: false },
        null,
        null,
        null,
        null,
        null,
      ],
      [
        { playedBy: 1, coords: { col: 1, row: 0, winningToken: false } },
        null,
        null,
        null,
        null,
        null,
      ],
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
      this.players[this.currentPlayer].wins += 1;
    } else {
      this.switchPlayer();
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

  private checkArray(arr: Token[]): boolean {
    return arr.every((token) => token && token.playedBy === arr[0].playedBy);
  }

  private min(num: number): number {
    return Math.max(num - 3, 0);
  }

  private max(num: number, max: number): number {
    return Math.min(num + 3, max) + 1;
  }

  switchPlayer() {
    this.currentPlayer = (1 - this.currentPlayer) as Position;
  }
}
