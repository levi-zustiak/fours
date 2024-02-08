import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InertiaInterceptor } from './inertia/inertia.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception-filter';
import session from 'express-session';
import { inertiaAdapter } from './inertia/inertiaAdapter';

type Inertia = any;

declare global {
  namespace Express {
    interface Request {
      Inertia: Inertia;
    }
  }
}

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

  // app.useGlobalInterceptors(new InertiaInterceptor());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.use(inertiaAdapter({ version: '1', flashMessages: {}, html }));
  app.use((req, _, next) => {
    // Inertia.sharedProps({ user });
    console.log(req.user);
    next();
  });
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.SERVER_PORT || 3000);

  app.enableShutdownHooks();
}
bootstrap();

function html(page) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0,
          maximum-scale=1.0"
        />
        <title>Fours</title>

        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/src/app.tsx"></script>
      </head>
      <body>
        <div id="app" data-page=${JSON.stringify(page)}></div>
      </body>
    </html>
    `;
}
