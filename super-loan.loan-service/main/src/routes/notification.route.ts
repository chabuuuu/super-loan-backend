import { notificationController } from '@/container/notification.container';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import express from 'express';
const notificationRouter = express.Router();

notificationRouter.get('/me', authenticateJWT, notificationController.getMyNotification.bind(notificationController));

export default notificationRouter;
