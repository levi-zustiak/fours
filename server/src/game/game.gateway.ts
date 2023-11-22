import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server;

  constructor(private readonly gameSvc: GameService) {}

  public afterInit(server) {
    this.gameSvc.init(server);
  }

  public handleConnection(@ConnectedSocket() client) {
    return this.gameSvc.connect(client);
  }
}
