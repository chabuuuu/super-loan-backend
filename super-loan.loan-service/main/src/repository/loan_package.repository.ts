import { LoanPackage } from '@/models/loan_package.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILoanPackageRepository } from '@/repository/interface/i.loan_package.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LoanPackageRepository extends BaseRepository<LoanPackage> implements ILoanPackageRepository<LoanPackage> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(LoanPackage));
  }
}
