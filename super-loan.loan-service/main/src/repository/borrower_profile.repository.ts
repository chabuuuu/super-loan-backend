import { BorrowerProfile } from '@/models/borrower_profile.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IBorrowerProfileRepository } from '@/repository/interface/i.borrower_profile.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class BorrowerProfileRepository
  extends BaseRepository<BorrowerProfile>
  implements IBorrowerProfileRepository<BorrowerProfile>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(BorrowerProfile));
  }
}
