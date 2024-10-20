import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Asset } from '@/models/asset.model';
import { IAssetService } from '@/service/interface/i.asset.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AssetController {
  public common: IBaseCrudController<Asset>;
  private assetService: IAssetService<Asset>;
  constructor(
    @inject('AssetService') assetService: IAssetService<Asset>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Asset>
  ) {
    this.assetService = assetService;
    this.common = common;
  }
}
