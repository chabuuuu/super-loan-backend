import { VersionLoanPackageController } from '@/controller/version_loan_package.controller';
import { VersionLoanPackageService } from '@/service/version_loan_package.service';
import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { VersionLoanPackageRepository } from '@/repository/version_loan_package.repository';
import { IVersionLoanPackageService } from '@/service/interface/i.version_loan_package.service';
import { IVersionLoanPackageRepository } from '@/repository/interface/i.version_loan_package.repository';
import { BaseContainer } from '@/container/base.container';

class VersionLoanPackageContainer extends BaseContainer {
  constructor() {
    super(VersionLoanPackage);
    this.container
      .bind<IVersionLoanPackageService<VersionLoanPackage>>('VersionLoanPackageService')
      .to(VersionLoanPackageService);
    this.container
      .bind<IVersionLoanPackageRepository<VersionLoanPackage>>('VersionLoanPackageRepository')
      .to(VersionLoanPackageRepository);
    this.container.bind<VersionLoanPackageController>(VersionLoanPackageController).toSelf();
  }

  export() {
    const versionLoanPackageController = this.container.get<VersionLoanPackageController>(VersionLoanPackageController);
    const versionLoanPackageService = this.container.get<IVersionLoanPackageService<any>>('VersionLoanPackageService');
    return { versionLoanPackageController, versionLoanPackageService };
  }
}

const versionLoanPackageContainer = new VersionLoanPackageContainer();
const { versionLoanPackageController, versionLoanPackageService } = versionLoanPackageContainer.export();
export { versionLoanPackageController, versionLoanPackageService };
