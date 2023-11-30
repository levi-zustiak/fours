import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { GameService } from './game.service';

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
    res.redirect(303, `/game/${gameId}`);
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
