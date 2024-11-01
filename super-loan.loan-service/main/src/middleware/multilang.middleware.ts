import { NextFunction, Request, Response } from 'express';
import i18n from 'i18n';

export function multilangMiddleware(req: Request, res: Response, next: NextFunction) {
  const lang = req.headers['accept-language'] || 'en';
  i18n.setLocale(lang);
  next();
}
