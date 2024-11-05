import { ErrorCode } from '@/enums/error-code.enums';
import { IMenuService } from '@/service/interface/i.menu.service';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class MenuController {
  private menuService: IMenuService;
  constructor(@inject('MenuService') menuService: IMenuService) {
    this.menuService = menuService;
  }

  /**
   * * GET /menu/me
   */
  async getMyMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new BaseError(ErrorCode.AUTH_01, 'User not found');
      }

      const result = await this.menuService.getMyMenu(user);

      res.send_ok('Menu fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
