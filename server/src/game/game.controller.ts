import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
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
      component: 'Game/Join',
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
  wait(@Param('id') gameId: string) {
    const game = this.gameSvc.get(gameId);

    return {
      component: 'Game/Play',
      props: {
        game,
      },
    };
  }
}
