import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

type Page = any;

@Injectable()
export class InertiaInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    res.vary('X-Inertia');

    if (req.header('X-Inertia')) {
      res.header('X-Inertia', 'true').type('json');
    } else {
      res.type('html');
    }

    return next.handle().pipe(
      map((data: Page) => {
        const page = {
          ...data,
          url: req.baseUrl + req.path,
          version: this.getVersion(),
        };

        return req.header('X-Inertia') ? page : this.toHtml(page);
      }),
    );
  }

  private getVersion(): string {
    return '1';
  }

  private toHtml(page) {
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

  // private toHtml(page) {
  //   return `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="utf-8" />
  //       <meta
  //         name="viewport"
  //         content="width=device-width, initial-scale=1.0,
  //         maximum-scale=1.0"
  //       />
  //       <title>Fours</title>

  //       <link rel="stylesheet" href="http://localhost:3000/build/assets/app-sU_7rSjT.css">
  //       <script type="module" src="http://localhost:3000/build/assets/app-dPBXl3T1.js"></script>
  //     </head>
  //     <body>
  //       <div id="app" data-page=${JSON.stringify(page)}></div>
  //     </body>
  //   </html>
  //   `;
  // }
}
