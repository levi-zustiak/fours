import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(protected gameSvc: GameService) {}

  @Get('/create')
  getCreate(@Res() res) {
    const game = this.gameSvc.create();

    res.redirect(303, `/game/${game.id}`);
  }

  @Get('/join')
  getJoin() {
    return {
      component: '/game/join',
      props: {},
    };
  }

  @Post('/join/:id')
  joinById(@Param('id') gameId, @Res() res) {
    const game = this.gameSvc.get(gameId);

    if (game) {
      res.redirect(303, `/game/${game.id}`);
    }
  }

  @Get('/:id')
  wait(@Req() req, @Param('id') gameId: string) {
    // const game = this.gameSvc.get(gameId);
    const game = this.gameSvc.join(req.user, gameId);

    return {
      component: '/game/play',
      props: {
        game,
      },
    };
  }
}
