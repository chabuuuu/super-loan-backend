import { staticDataController } from '@/container/static_data.container';
import express from 'express';
const staticDataRouter = express.Router();

staticDataRouter

  .get('/tinh-thanh-vietnam', staticDataController.getAllTinhThanhVietnamData.bind(staticDataController))

  .get('/bank', staticDataController.getAllBankData.bind(staticDataController));

export default staticDataRouter;
