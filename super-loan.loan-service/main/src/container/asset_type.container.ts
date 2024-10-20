import { AssetTypeController } from '@/controller/asset_type.controller';
import { AssetTypeService } from '@/service/asset_type.service';
import { AssetType } from '@/models/asset_type.model';
import { AssetTypeRepository } from '@/repository/asset_type.repository';
import { IAssetTypeService } from '@/service/interface/i.asset_type.service';
import { IAssetTypeRepository } from '@/repository/interface/i.asset_type.repository';
import { BaseContainer } from '@/container/base.container';

class AssetTypeContainer extends BaseContainer {
  constructor() {
    super(AssetType);
    this.container.bind<IAssetTypeService<AssetType>>('AssetTypeService').to(AssetTypeService);
    this.container.bind<IAssetTypeRepository<AssetType>>('AssetTypeRepository').to(AssetTypeRepository);
    this.container.bind<AssetTypeController>(AssetTypeController).toSelf();
  }

  export() {
    const assetTypeController = this.container.get<AssetTypeController>(AssetTypeController);
    const assetTypeService = this.container.get<IAssetTypeService<any>>('AssetTypeService');
    return { assetTypeController, assetTypeService };
  }
}

const assetTypeContainer = new AssetTypeContainer();
const { assetTypeController, assetTypeService } = assetTypeContainer.export();
export { assetTypeController, assetTypeService };
