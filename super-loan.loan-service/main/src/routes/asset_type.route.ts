import { assetTypeController } from '@/container/asset_type.container';
import { AssetTypeCreateReq } from '@/dto/asset_type/asset-type-create.req';
import { AssetTypeUpdateReq } from '@/dto/asset_type/asset-type-update.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const assetTypeRouter = express.Router();

assetTypeRouter

  .post('/', classValidate(AssetTypeCreateReq), assetTypeController.common.create.bind(assetTypeController.common))
  .put('/:id', classValidate(AssetTypeUpdateReq), assetTypeController.update.bind(assetTypeController))
  .get('/paging', assetTypeController.common.findWithPaging.bind(assetTypeController.common))
  .get('/:id', assetTypeController.findOne.bind(assetTypeController))
  .get('/', assetTypeController.common.findAll.bind(assetTypeController.common));

export default assetTypeRouter;
