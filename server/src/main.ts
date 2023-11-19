import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { inertia } from './inertia/inertia.middleware';
import { InertiaInterceptor } from './inertia/inertia.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(inertia);
  app.useGlobalInterceptors(new InertiaInterceptor());

  await app.listen(3000);
}
bootstrap();
