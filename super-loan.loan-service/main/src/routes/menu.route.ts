import { menuController } from '@/container/menu.container';
import express from 'express';
const menuRouter = express.Router();

menuRouter.get('/me', menuController.getMyMenu);

export default menuRouter;
