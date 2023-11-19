import { NextFunction, Request, Response } from 'express';

export function inertia(req: Request, res: Response, next: NextFunction) {
  res.vary('X-Inertia');

  next();
}
