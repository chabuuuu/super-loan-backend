import { Permissions } from '@/constants/permission.constants';
import { assetController } from '@/container/asset.container';
import { AssetCreateReq } from '@/dto/asset/asset-create.req';
import { AssetUpdateReq } from '@/dto/asset/asset-update.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const assetRouter = express.Router();

assetRouter

  .put(
    '/:id',
    authenticateJWT,
    checkPermission([Permissions.QUAN_LY_TAI_SAN]),
    classValidate(AssetUpdateReq),
    assetController.update.bind(assetController)
  )
  .post(
    '/',
    authenticateJWT,
    checkPermission([Permissions.QUAN_LY_TAI_SAN]),
    classValidate(AssetCreateReq),
    assetController.common.create.bind(assetController.common)
  )
  .get('/paging', assetController.common.findWithPaging.bind(assetController.common))
  .get('/:id', assetController.findOne.bind(assetController))
  .get('/', assetController.common.findAll.bind(assetController.common));

export default assetRouter;
