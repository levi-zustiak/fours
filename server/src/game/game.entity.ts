import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { Engine } from './engine.entity';
import { GameStage, Player } from './game.types';

export class Game {
  public id: string;
  public players: Array<Player>;
  public spectators: Array<User>;
  public stage: GameStage;
  public state: any;
  public engine?: Engine;
  public challenge?: any;

  constructor() {
    this.id = '1';
    this.players = [];
    this.spectators = [];
    this.stage = GameStage.WAITING;
  }

  public join(user: User) {
    // TODO: Check user is not already in the player list
    this.players.length < 2
      ? this.players.push({ ...user, wins: 0, ready: false })
      : this.spectators.push(user);
  }

  public leave(user: User) {
    this.players.filter((player) => player.id === user.id);
    this.spectators.filter((spectator) => spectator.id === user.id);
  }

  public ready(user: User) {
    if (this.stage !== GameStage.WAITING) return;

    this.players = this.players.map((player) =>
      player.id === user.id ? { ...player, ready: !player.ready } : player,
    );

    if (
      this.players.length === 2 &&
      this.players.every((player) => player.ready)
    ) {
      this.next(GameStage.PLAYING);
    }
  }

  public start() {
    this.engine = new Engine(this.players);
  }

  public update(user: User, col: number) {
    return this.engine.update(user, col);
  }

  public rematch(user: User) {
    this.challenge = {
      challenger: user.id,
      recipient: user.id,
    };
  }

  public accept() {
    delete this.challenge;

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
}
