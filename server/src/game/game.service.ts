import { Injectable, Logger } from '@nestjs/common';
import { Game } from './game.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Socket } from 'socket.io';

@Injectable()
export class GameService {
  private logger: Logger = new Logger('GameService');
  public games = new Map();
  private players = new Set();

  constructor(private eventEmitter: EventEmitter2) {}

  public create() {
    // Check user doesn't have a game already
    const game = new Game();

    this.games.set(game.id, game);

    this.logger.log(`Game created: ${game.id}`);

    return game;
  }

  public join(user, gameId) {
    const game = this.get(gameId);

    if (!game) {
    }

    game.addUser(user);

    if (game.players.length === 2 && game.stage === 'waiting') {
      game.init();
    }

    console.log(game);

    return game;
  }

  public update(player, { gameId, col }) {
    const game = this.games.get(gameId);

    game.update(player, col);

    return game;
  }

  public rematch(player, { gameId }) {
    const game = this.games.get(gameId);

    //    game.rematch();

    return game;
  }

  public get(gameId: string): Game | undefined {
    const game = this.games.get(gameId);

    if (!game) {
      this.logger.log('Failed to find game');
      return;
    }

    return game;
  }

  public delete(gameId: string) {
    this.logger.log('Game deleted');
    this.games.delete(gameId);
  }

  public init(server) {
    this.logger.log('Init');
  }

  public connect(client) {
    this.logger.log(`Client ${client.id} connected`);
  }

  public disconnect(client) {
    this.logger.log(`Client ${client.id} disconnected`);
  }
}
