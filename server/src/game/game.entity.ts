import { v4 } from 'uuid';

type Player = any;

enum STAGE {
  WAITING = 'waiting',
  PLAYING = 'playing',
  DISCONNECTED = 'disconnected',
  ENDED = 'ended',
}

export class Game {
  public id: string;
  public host: Player;
  public peer: Player;
  public stage: STAGE;

  constructor(host) {
    this.id = v4();
    this.host = host;
    this.peer == null;
    this.stage = STAGE.WAITING;
  }
}
