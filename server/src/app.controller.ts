import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Inertia } from './inertia/inertia.decorator';

type Inertia = any;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Inertia() inertia: Inertia) {
    inertia.render({
      component: '',
      props: {},
    });
  }
}
