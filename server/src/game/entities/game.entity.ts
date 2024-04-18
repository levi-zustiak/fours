import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { Engine } from './engine.entity';
import { GameStage, Position } from '../game.types';
import { Player } from './player.entity';

export class Game {
  public id: string;
  public players: Player[];
  public spectators: User[];
  public stage: GameStage;
  public state: { rematch?: { challenger: number; recipient: number } };
  public engine?: Engine;

  constructor() {
    this.id = '1';
    this.players = [];
    this.spectators = [];
    this.stage = GameStage.WAITING;
    this.state = {};
  }

  public join(user: User) {
    // TODO: Check user is not already in the player list
    this.players.length < 2
      ? this.players.push(new Player(user))
      : this.spectators.push(user);
  }

  public leave(user: User) {
    this.players.filter((player) => player.id === user.id);
    this.spectators.filter((spectator) => spectator.id === user.id);
  }

  public ready(user: User) {
    if (this.stage !== GameStage.WAITING) return;

    const player = this.getPlayer(user);

    player.toggleReady();

    if (
      this.players.length === 2 &&
      this.players.every((player) => player.ready)
    ) {
      this.start();
    }

    return;
  }

  public start() {
    this.stage = GameStage.PLAYING;
    this.setPlayerPositions();
    this.engine = new Engine();
  }

  public update(user: User, col: number) {
    const player = this.getPlayer(user);

    if (this.engine.validate(player)) {
      this.engine.update(col);

      if (!this.engine.playing) {
        const winner = this.players.find(
          (player) => player.playingAs === this.engine.currentPlayer,
        );

        winner.incrementWins();
      }
    }
  }

  public requestRematch(user: User) {
    this.state.rematch = {
      challenger: user.id,
      recipient: user.id,
    };
  }

  public acceptRematch() {
    // TODO: validate that the acceptor is the recipient
    delete this.state.rematch;

    this.start();
  }

  private next(stage: GameStage) {
    switch (stage) {
      case GameStage.PLAYING:
        if (this.stage === GameStage.WAITING) {
          this.stage = GameStage.PLAYING;
        }
    }
  }

  private setPlayerPositions() {
    const playingAs =
      crypto.getRandomValues(new Uint8Array(1))[0] > 127 ? 0 : 1;

    this.players[0].setPlayingAs(playingAs);
    this.players[1].setPlayingAs((1 - playingAs) as Position);
  }

  private getPlayer(user: User) {
    const player = this.players.find((player) => player.id === user.id);

    if (!player) {
      throw new Error('Player not found');
    }

    return player;
  }
}
