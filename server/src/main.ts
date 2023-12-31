import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InertiaInterceptor } from './inertia/inertia.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception-filter';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalInterceptors(new InertiaInterceptor());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.SERVER_PORT || 3000);

  app.enableShutdownHooks();
}
bootstrap();
