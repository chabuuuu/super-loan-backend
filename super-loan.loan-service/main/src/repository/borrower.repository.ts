import { Borrower } from '@/models/borrower.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class BorrowerRepository extends BaseRepository<Borrower> implements IBorrowerRepository<Borrower> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Borrower));
  }
}
