import { menuController } from '@/container/menu.container';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import express from 'express';
const menuRouter = express.Router();

menuRouter.get('/me', authenticateJWT, menuController.getMyMenu.bind(menuController));

export default menuRouter;
