import { AssetType } from '@/models/asset_type.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IAssetTypeRepository } from '@/repository/interface/i.asset_type.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class AssetTypeRepository extends BaseRepository<AssetType> implements IAssetTypeRepository<AssetType> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(AssetType));
  }
}
