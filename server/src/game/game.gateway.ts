import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({ namespace: 'games' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly gameSvc: GameService) {}

  @SubscribeMessage('join')
  join(@ConnectedSocket() client: Socket, @MessageBody() data) {
    const game = this.gameSvc.join(client, data);
    console.log('Player connected');

    return { game };
  }

  @SubscribeMessage('game:update')
  handleUpdate(@ConnectedSocket() client: Socket, @MessageBody() data) {
    const game = this.gameSvc.update(data);

    this.server.to(game.id).emit('game:update', { game });
  }

  @OnEvent('game:start')
  handleGameStart(payload) {
    console.log(payload);
    const { game } = payload;
    this.server.to(game.id).emit('game:start', { game });
  }

  public afterInit(server) {
    this.gameSvc.init(server);
  }

  public handleConnection(@ConnectedSocket() client) {
    return this.gameSvc.connect(client);
  }

  public handleDisconnect(@ConnectedSocket() client) {
    return this.gameSvc.disconnect(client);
  }
}
