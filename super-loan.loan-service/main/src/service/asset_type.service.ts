import { AssetType } from '@/models/asset_type.model';
import { IAssetTypeRepository } from '@/repository/interface/i.asset_type.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAssetTypeService } from '@/service/interface/i.asset_type.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AssetTypeService extends BaseCrudService<AssetType> implements IAssetTypeService<AssetType> {
  private assetTypeRepository: IAssetTypeRepository<AssetType>;

  constructor(@inject('AssetTypeRepository') assetTypeRepository: IAssetTypeRepository<AssetType>) {
    super(assetTypeRepository);
    this.assetTypeRepository = assetTypeRepository;
  }
}
