import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import cookie from 'cookie';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger('WsAuthGuard');

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient();

    const token = cookie.parse(socket.handshake.headers.cookie)['access_token'];

    if (!token) {
      this.logger.error('No authorization token provided');

      throw new WsException('Unauthorized');
    }

    try {
      const { sub, username } = await this.jwtService.verifyAsync(token);

      socket.data.user = { id: sub, name: username };

      return true;
    } catch {
      throw new WsException('Unauthorized');
    }
  }
}
