import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';

type Inertia = any;

// declare global {
//   namespace Express {
//     interface Request {
//       Inertia: Inertia;
//     }
//   }
// }

export const Inertia = (): ParameterDecorator => {
  return (target, key, index) => {
    Reflect.defineMetadata(
      RESPONSE_PASSTHROUGH_METADATA,
      false,
      target.constructor,
      key,
    );
    return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      return req.Inertia;
    })()(target, key, index);
  };
};
