import { Asset } from '@/models/asset.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IAssetRepository } from '@/repository/interface/i.asset.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class AssetRepository extends BaseRepository<Asset> implements IAssetRepository<Asset> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Asset));
  }
}
