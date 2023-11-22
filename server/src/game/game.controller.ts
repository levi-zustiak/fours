import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(protected gameSvc: GameService) {}

  @Get('/create')
  create() {
    const game = this.gameSvc.create();

    return {
      component: 'Game/Create',
      props: {
        game,
      },
    };
  }

  @Get('/join')
  join() {
    return {
      component: 'Game/Join',
      props: {},
    };
  }

  @Get('/join/:id')
  joinById(@Param() params) {}

  @Get('/play')
  play() {}
}
