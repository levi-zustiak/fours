import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { GameService } from './game.service';

@Controller()
export class GameController {
  constructor(protected gameSvc: GameService) {}

  @Get('/create')
  getCreate(@Res() res) {
    const game = this.gameSvc.create();

    res.redirect(303, `/wait/${game.id}`);
  }

  @Get('/join')
  getJoin() {
    return {
      component: 'Game/Join',
      props: {},
    };
  }

  @Post('/join/:id')
  joinById(@Param() params, @Res() res) {
    // const game = this.gameSvc.join(params.id);
    // res.redirect(303, `/${game.id}`);
  }

  @Get('/wait/:id')
  wait(@Param('id') gameId: string) {
    const game = this.gameSvc.get(gameId);

    // If game is not full and user is not the host, join the lobby

    return {
      component: 'Game/Wait',
      props: {
        game,
      },
    };
  }

  @Get('/play/:id')
  getPlay(@Param('id') gameId: string) {
    const game = this.gameSvc.get(gameId);

    return {
      component: 'Game/Play',
      props: {
        game,
      },
    };
  }

  // @Delete('/:id')
  // deleteGame(@Param() params, @Res() res) {
  //   this.gameSvc.delete(params.id);

  //   res.redirect(303, '/');
  // }
}
