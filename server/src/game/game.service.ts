import { Logger } from '@nestjs/common';
import { Game } from './game.entity';

export class GameService {
  private logger: Logger = new Logger('GameService');
  private games = new Map();

  public create() {
    const game = new Game({
      id: 1,
      name: 'Levi',
    });

    this.games.set(game.id, game);

    this.logger.log(`Game created: ${game.id}`);

    return game;
  }

  public init(server) {
    this.logger.log('Init');
  }

  public connect(client) {
    this.logger.log(`Client ${client.id} connected`);
  }
}
