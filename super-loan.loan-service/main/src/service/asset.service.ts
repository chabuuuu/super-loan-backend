import { Asset } from '@/models/asset.model';
import { IAssetRepository } from '@/repository/interface/i.asset.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAssetService } from '@/service/interface/i.asset.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AssetService extends BaseCrudService<Asset> implements IAssetService<Asset> {
  private assetRepository: IAssetRepository<Asset>;

  constructor(@inject('AssetRepository') assetRepository: IAssetRepository<Asset>) {
    super(assetRepository);
    this.assetRepository = assetRepository;
  }
}
