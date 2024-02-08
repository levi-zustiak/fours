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
import { Inertia } from 'src/inertia/inertia.decorator';
import { inertiaAdapter } from 'src/inertia/inertiaAdapter';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
  constructor(protected gameSvc: GameService) {}

  @Get('/create')
  getCreate(@Inertia() inertia) {
    const game = this.gameSvc.create();

    inertia.redirect(`/game/${game.id}`);

    // res.redirect(303, `/game/${game.id}`);
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
  wait(@Inertia() inertia, @Req() req, @Param('id') gameId: string) {
    const game = this.gameSvc.join(req.user, gameId);

    inertia.render({
      component: '/game/play',
      props: {
        game,
        user: req.user,
      },
    });

    // return {
    //   component: '/game/play',
    //   props: {
    //     game,
    //   },
    // };
  }
}
