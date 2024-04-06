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
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';

@WebSocketGateway({ namespace: 'games' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly gameSvc: GameService) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('game:join')
  join(@ConnectedSocket() client: Socket, @MessageBody() data) {
    const game = this.gameSvc.get(data.gameId);

    if (!game) return;

    client.join(game.id);

    this.server.to(game.id).emit('game:update', { game });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('game:update')
  handleUpdate(@ConnectedSocket() client: Socket, @MessageBody() data) {
    const game = this.gameSvc.update(client.data.user, data);

    this.server.to(game.id).emit('game:update', { game });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('game:chat')
  handleChat(@ConnectedSocket() client: Socket, @MessageBody() data) {
    console.log(client.data);
    const chat = { from: client.data.user, text: data.message };

    this.server.to(data.gameId).emit('game:chat', chat);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('rematch:init')
  handleRematch(@ConnectedSocket() client: Socket) {
    // const game = this.gameSvc.rematch(client.data.user);
    // this.server.to(data.gameId).emit('game:rematch', { game });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('rematch:accept')
  acceptRematch() {}

  @OnEvent('game:start')
  handleGameStart(payload) {
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
