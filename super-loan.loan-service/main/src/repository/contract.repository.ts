import { Contract } from '@/models/contract.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IContractRepository } from '@/repository/interface/i.contract.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ContractRepository extends BaseRepository<Contract> implements IContractRepository<Contract> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Contract));
  }
}
