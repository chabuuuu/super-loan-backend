import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { AssetType } from '@/models/asset_type.model';
import { IAssetTypeService } from '@/service/interface/i.asset_type.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AssetTypeController {
  public common: IBaseCrudController<AssetType>;
  private assetTypeService: IAssetTypeService<AssetType>;
  constructor(
    @inject('AssetTypeService') assetTypeService: IAssetTypeService<AssetType>,
    @inject(ITYPES.Controller) common: IBaseCrudController<AssetType>
  ) {
    this.assetTypeService = assetTypeService;
    this.common = common;
  }
}
