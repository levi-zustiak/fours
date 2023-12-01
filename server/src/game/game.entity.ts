import { v4 } from 'uuid';

type Player = any;

enum STAGE {
  WAITING = 'waiting',
  PLAYING = 'playing',
  DISCONNECTED = 'disconnected',
  ENDED = 'ended',
}

type Token = {
  playedBy: any;
  coords: any;
};

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
      { ...this.host, playingAs: this.currentPlayer ? 'p1' : 'p2' },
      { ...this.peer, playingAs: this.currentPlayer ? 'p2' : 'p1' },
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

  update(col) {
    // if (!this.validate(userId)) {
    //   return;
    // }

    const board = structuredClone(this.board);
    const row = board[col].indexOf(null);

    const token = {
      playedBy: this.players[this.currentPlayer],
      coords: { row, col },
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

  validate(userId) {
    if (userId !== this.currentPlayer) {
      return false;
    }

    return true;
  }

  checkWin() {
    return (
      this.checkVertical() ||
      this.checkHorizontal() ||
      this.checkRightDiagonal() ||
      this.checkLeftDiagonal()
    );
  }

  checkVertical() {
    return false;
  }
  checkHorizontal() {
    return false;
  }
  checkLeftDiagonal() {
    return false;
  }
  checkRightDiagonal() {
    return false;
  }
  checkTie() {
    return false;
  }

  // getcurrentPlayer() {
  //   return this.players.find(
  //     (player) => player.position === this.state.currentplayer
  //   );
  // }

  // getWaitingPlayer() {
  //   return this.players.find(
  //     (player) => player.position !== this.state.currentPlayer
  //   );
  // }

  switchPlayer() {
    this.currentPlayer = 1 - this.currentPlayer;
  }
}
