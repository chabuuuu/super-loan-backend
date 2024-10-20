import { StatusContract } from '@/models/status_contract.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IStatusContractRepository } from '@/repository/interface/i.status_contract.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class StatusContractRepository
  extends BaseRepository<StatusContract>
  implements IStatusContractRepository<StatusContract>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(StatusContract));
  }
}
