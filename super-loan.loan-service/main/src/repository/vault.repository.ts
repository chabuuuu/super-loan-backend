import { Vault } from '@/models/vault.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IVaultRepository } from '@/repository/interface/i.vault.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class VaultRepository extends BaseRepository<Vault> implements IVaultRepository<Vault> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Vault));
  }
}
