import { notificationController } from '@/container/notification.container';
import { SeenNotificationReq } from '@/dto/notification/seen-notification.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const notificationRouter = express.Router();

notificationRouter
  .get('/me', authenticateJWT, notificationController.getMyNotification.bind(notificationController))
  .post(
    '/seen',
    classValidate(SeenNotificationReq),
    authenticateJWT,
    notificationController.seenNotification.bind(notificationController)
  );

export default notificationRouter;
