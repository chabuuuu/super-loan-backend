import { LoanPackageController } from '@/controller/loan_package.controller';
import { LoanPackageService } from '@/service/loan_package.service';
import { LoanPackage } from '@/models/loan_package.model';
import { LoanPackageRepository } from '@/repository/loan_package.repository';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { ILoanPackageRepository } from '@/repository/interface/i.loan_package.repository';
import { BaseContainer } from '@/container/base.container';

class LoanPackageContainer extends BaseContainer {
  constructor() {
    super(LoanPackage);
    this.container.bind<ILoanPackageService<LoanPackage>>('LoanPackageService').to(LoanPackageService);
    this.container.bind<ILoanPackageRepository<LoanPackage>>('LoanPackageRepository').to(LoanPackageRepository);
    this.container.bind<LoanPackageController>(LoanPackageController).toSelf();
  }

  export() {
    const loanPackageController = this.container.get<LoanPackageController>(LoanPackageController);
    const loanPackageService = this.container.get<ILoanPackageService<any>>('LoanPackageService');
    return { loanPackageController, loanPackageService };
  }
}

const loanPackageContainer = new LoanPackageContainer();
const { loanPackageController, loanPackageService } = loanPackageContainer.export();
export { loanPackageController, loanPackageService };
