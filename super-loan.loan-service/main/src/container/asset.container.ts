import { AssetController } from '@/controller/asset.controller';
import { AssetService } from '@/service/asset.service';
import { Asset } from '@/models/asset.model';
import { AssetRepository } from '@/repository/asset.repository';
import { IAssetService } from '@/service/interface/i.asset.service';
import { IAssetRepository } from '@/repository/interface/i.asset.repository';
import { BaseContainer } from '@/container/base.container';

class AssetContainer extends BaseContainer {
  constructor() {
    super(Asset);
    this.container.bind<IAssetService<Asset>>('AssetService').to(AssetService);
    this.container.bind<IAssetRepository<Asset>>('AssetRepository').to(AssetRepository);
    this.container.bind<AssetController>(AssetController).toSelf();
  }

  export() {
    const assetController = this.container.get<AssetController>(AssetController);
    const assetService = this.container.get<IAssetService<any>>('AssetService');
    return { assetController, assetService };
  }
}

const assetContainer = new AssetContainer();
const { assetController, assetService } = assetContainer.export();
export { assetController, assetService };
