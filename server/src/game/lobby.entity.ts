import { Player } from './game.types';

type P = {
  id: string;
  name: string;
  ready: boolean;
  playingAs?: string;
};

export class Lobby {
  public id: string;
  public players: Array<Player>;
  public spectators: any;
  public stage: any;

  constructor() {
    this.id = 'lobby.id';
    this.stage = 'connecting';
  }

  connect(player) {}
  rematch() {}
  disconnect() {}
}
