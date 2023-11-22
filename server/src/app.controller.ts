import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return {
      component: 'Home',
      props: {
        foo: 'bar',
      },
    };
  }

  @Get('/play')
  play(): any {
    return {
      component: 'Play',
      props: {
        foo: 'bar',
      },
    };
  }

  @Get('/create')
  create() {
    return {
      component: 'Game/Create',
      props: {
        game: {
          id: '1',
        },
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
}
