import { Lender } from '@/models/lender.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILenderRepository } from '@/repository/interface/i.lender.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LenderRepository extends BaseRepository<Lender> implements ILenderRepository<Lender> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Lender));
  }
}
