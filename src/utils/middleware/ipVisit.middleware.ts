import { InjectQueue } from '@nestjs/bull';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Queue } from 'bull';

@Injectable()
export class IpVisitMiddleware implements NestMiddleware {
  constructor(@InjectQueue('backend-rgb') private queue: Queue) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('log from middleware');
    console.log({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
      originalUrl: req.originalUrl,
      clientIp: req.clientIp,
      // response: res,
    });
    this.queue.add(
      'login-history-job',
      {
        ip: '127.0.0.18',
      },
      {
        removeOnComplete: true,
        delay: 5000,
      },
    );
    next();
  }
}
