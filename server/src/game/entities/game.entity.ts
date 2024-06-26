import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { Engine } from './engine.entity';
import { GameStage, Position } from '../game.types';
import { Player } from './player.entity';
import { Spectator } from './spectator.entity';

// TODO: check user actions are made by players and not spectators
export class Game {
  public id: string;
  public players: Player[];
  public spectators: Spectator[];
  public stage: GameStage;
  public state: {
    rematch?: { challenger: number; recipient: number; pending: boolean };
  };
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
      : this.spectators.push(new Spectator(user));
  }

  public leave(user: User) {
    this.players.filter((player) => player.id === user.id);
    this.spectators.filter((spectator) => spectator.id === user.id);

    if (this.isPlayer(user)) {
      this.cancelRematch();
    }
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
    if (this.state.rematch === undefined) {
      const recipient = this.players.find((player) => player.id !== user.id);

      this.state.rematch = {
        challenger: user.id,
        recipient: recipient.id,
        pending: true,
      };
    }
  }

  public acceptRematch(user: User) {
    if (
      this.state.rematch !== undefined &&
      user.id === this.state.rematch.recipient
    ) {
      delete this.state.rematch;

      this.start();
    }
  }

  public declineRematch(user: User) {
    console.log('decline rematch');
    if (
      this.state.rematch !== undefined &&
      user.id === this.state.rematch.recipient
    ) {
      this.state.rematch.pending = false;
    }
  }

  // TODO: possibly update this to provide a state value for reason instead of just deleting
  public cancelRematch() {
    console.log('decline rematch');
    delete this.state.rematch;
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

  private isPlayer(user: User) {
    return this.getPlayer(user) instanceof Player;
  }
}
