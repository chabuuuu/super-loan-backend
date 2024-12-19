import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { SeenNotificationReq } from '@/dto/notification/seen-notification.req';
import { UnSeenNotificationReq } from '@/dto/notification/unseen-notification.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Notification } from '@/models/notification.model';
import { INotificationService } from '@/service/interface/i.notification.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { In } from 'typeorm';

@injectable()
export class NotificationController {
  public common: IBaseCrudController<Notification>;
  private notificationService: INotificationService<Notification>;
  constructor(
    @inject('NotificationService') notificationService: INotificationService<Notification>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Notification>
  ) {
    this.notificationService = notificationService;
    this.common = common;
  }

  /**
   * * GET /me
   */
  async getMyNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;

      if (!req.query.seen) {
        throw new BaseError(ErrorCode.BAD_REQUEST, 'Seen is required');
      }

      const seen = req.query.seen.toString();

      const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
      const rpp = req.query.rpp ? parseInt(req.query.rpp.toString()) : 10;

      if (!user) {
        throw new BaseError(ErrorCode.AUTH_01, 'User not login');
      }

      const result = await this.notificationService.getMyNotification(user.id, user.roleId, seen, page, rpp);

      res.send_ok('Get my notification successful', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /seen
   */
  async seenNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;

      const seenNotificationReq: SeenNotificationReq = req.body;

      await this.notificationService.seenNotification(user!.id, user!.roleId, seenNotificationReq);

      res.send_ok('Seen notifications successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /unseen
   */
  async unseenNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;

      const unseenNotificationReq: UnSeenNotificationReq = req.body;

      await this.notificationService.unSeenNotification(user!.id, user!.roleId, unseenNotificationReq);

      res.send_ok('Unseen notifications successful');
    } catch (error) {
      next(error);
    }
  }
}
