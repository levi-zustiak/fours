import { User } from '@prisma/client';
import { Position } from '../game.types';

export class Player implements Omit<User, 'password'> {
  public id: number;
  public name: string;
  public ready: boolean;
  public wins: number;
  public playingAs: Position;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.wins = 0;
    this.ready = false;
  }

  public toggleReady() {
    this.ready = !this.ready;
  }

  public setPlayingAs(playingAs: Position) {
    this.playingAs = playingAs;
  }

  public incrementWins() {
    this.wins = ++this.wins;
  }
}
