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
  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const result = await this.assetService.findOne({
        filter: {
          assetId: id
        }
      });
      res.send_ok('Get Asset successful', result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody = req.body;
      const id = req.params.id;
      const result = await this.assetService.findOneAndUpdate({
        filter: {
          assetId: id
        },
        updateData: requestBody
      });
      res.send_ok('Update Asset successful', result);
    } catch (error) {
      next(error);
    }
  }
}
