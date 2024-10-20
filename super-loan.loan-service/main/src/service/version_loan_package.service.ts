import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { IVersionLoanPackageRepository } from '@/repository/interface/i.version_loan_package.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IVersionLoanPackageService } from '@/service/interface/i.version_loan_package.service';
import { inject, injectable } from 'inversify';

@injectable()
export class VersionLoanPackageService
  extends BaseCrudService<VersionLoanPackage>
  implements IVersionLoanPackageService<VersionLoanPackage>
{
  private versionLoanPackageRepository: IVersionLoanPackageRepository<VersionLoanPackage>;

  constructor(
    @inject('VersionLoanPackageRepository')
    versionLoanPackageRepository: IVersionLoanPackageRepository<VersionLoanPackage>
  ) {
    super(versionLoanPackageRepository);
    this.versionLoanPackageRepository = versionLoanPackageRepository;
  }
}
