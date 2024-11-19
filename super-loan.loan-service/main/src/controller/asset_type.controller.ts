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

  /**
   * * PUT /asset-type/:id
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody = req.body;
      const id = req.params.id;
      const result = await this.assetTypeService.findOneAndUpdate({
        filter: {
          assetTypeId: id
        },
        updateData: requestBody
      });
      res.send_ok('Update AssetType successful', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /asset-type/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.assetTypeService.findOne({
        filter: {
          assetTypeId: id
        }
      });
      res.send_ok('Get AssetType successful', result);
    } catch (error) {
      next(error);
    }
  }
}
