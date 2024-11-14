import { ErrorCode } from '@/enums/error-code.enums';
import mediaRouter from '@/routes/media.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use('/media', mediaRouter);
  //Check health
  app.get(`/health`, (req: any, res: any) => {
    res.json({
      message: 'OK'
    });
  });
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
