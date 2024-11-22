import { assetController } from '@/container/asset.container';
import { AssetCreateReq } from '@/dto/asset/asset-create.req';
import { AssetUpdateReq } from '@/dto/asset/asset-update.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const assetRouter = express.Router();

assetRouter

  .put('/:id', classValidate(AssetUpdateReq), assetController.update.bind(assetController))
  .post('/', classValidate(AssetCreateReq), assetController.common.create.bind(assetController.common))
  .get('/paging', assetController.common.findWithPaging.bind(assetController.common))
  .get('/:id', assetController.findOne.bind(assetController))
  .get('/', assetController.common.findAll.bind(assetController.common));

export default assetRouter;
