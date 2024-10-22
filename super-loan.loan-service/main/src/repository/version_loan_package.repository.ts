import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IVersionLoanPackageRepository } from '@/repository/interface/i.version_loan_package.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class VersionLoanPackageRepository
  extends BaseRepository<VersionLoanPackage>
  implements IVersionLoanPackageRepository<VersionLoanPackage>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(VersionLoanPackage));
  }
}
