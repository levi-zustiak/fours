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
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly gameSvc: GameService) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('join')
  join(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.get(gameId);

    if (!game) {
      return {
        error: 'Failed to join lobby',
      };
    }

    console.log(`User ${client.data.user.name} joined the game`);
    client.join(game.id);

    this.server.to(game.id).emit('update', { game });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('ready')
  ready(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.ready(client.data.user, gameId);

    if (!game) {
      return {
        error: 'Failed to ready up',
      };
    }

    this.server.to(game.id).emit('update', { game });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('update')
  update(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; col: number },
  ) {
    const game = this.gameSvc.update(client.data.user, data);

    if (!game) {
      return {
        error: 'Failed to update game',
      };
    }

    this.server.to(game.id).emit('update', { game });
  }

  @SubscribeMessage('rematch')
  rematch(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.rematch(client.data.user, gameId);

    this.server.to(game.id).emit('update', { game });
  }

  @SubscribeMessage('cancel')
  cancel(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.cancel(gameId);

    this.server.to(game.id).emit('update', { game });
  }

  @SubscribeMessage('accept')
  accept(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.accept(client.data.user, gameId);

    this.server.to(game.id).emit('update', { game });
  }

  @SubscribeMessage('decline')
  decline(
    @ConnectedSocket() client: Socket,
    @MessageBody() { gameId }: { gameId: string },
  ) {
    const game = this.gameSvc.decline(client.data.user, gameId);

    this.server.to(game.id).emit('update', { game });
  }

  @SubscribeMessage('chat')
  chat(@ConnectedSocket() client: Socket) {}

  public afterInit() {
    this.gameSvc.init();
  }

  public handleConnection(@ConnectedSocket() client: Socket) {
    this.gameSvc.connect(client);
  }

  public handleDisconnect(@ConnectedSocket() client: Socket) {
    this.gameSvc.disconnect(client);
  }
}
