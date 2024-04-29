import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '@prisma/client';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  private logger: Logger = new Logger('GameService');
  private games = new Map<string, Game>();

  public create() {
    // TODO: Check user doesn't have a game already
    const game = new Game();

    this.logger.log(`Game ${game.id} created`);

    this.games.set(game.id, game);

    return game;
  }

  public join(user: User, gameId: string) {
    const game = this.get(gameId);

    // TODO: create prroper error handling
    if (!game) return;

    game.join(user);

    return game;
  }

  public ready(user: User, gameId: string) {
    const game = this.get(gameId);

    // TODO: Add proper error here
    if (!game) return;

    game.ready(user);

    return game;
  }

  public update(user: User, { gameId, col }) {
    const game = this.games.get(gameId);

    game.update(user, col);

    return game;
  }

  public rematch(user: User, gameId: string) {
    const game = this.games.get(gameId);

    this.logger.log(`${user.name} wants a rematch`);

    // TODO: Check lobby status is still connected
    if (!game || !game.players.some((player) => player.id === user.id)) return;

    game.requestRematch(user);

    return game;
  }

  public accept(user: User, gameId: string) {
    const game = this.games.get(gameId);

    this.logger.log(`${user.name} accepted the rematch`);

    game.acceptRematch(user);

    return game;
  }

  public get(gameId: string): Game | undefined {
    const game = this.games.get(gameId);

    if (!game) {
      // TODO: Throw unfound game exception
      this.logger.log(`Failed to find game ${gameId}`);
      return;
    }

    return game;
  }

  public delete(gameId: string) {
    this.logger.log('Game deleted');
    this.games.delete(gameId);
  }

  public init() {
    this.logger.log('Game wsserver init');
  }

  public connect(client: Socket) {
    this.logger.log(`Client ${client.id} connected`);
  }

  public disconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }
}
