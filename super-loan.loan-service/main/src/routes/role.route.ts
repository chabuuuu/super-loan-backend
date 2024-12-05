import { roleController } from '@/container/role.container';
import express from 'express';
const roleRouter = express.Router();

roleRouter.get('/', roleController.common.findAll.bind(roleController.common));

export default roleRouter;
