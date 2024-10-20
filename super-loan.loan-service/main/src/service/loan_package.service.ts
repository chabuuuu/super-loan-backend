import { LoanPackage } from '@/models/loan_package.model';
import { ILoanPackageRepository } from '@/repository/interface/i.loan_package.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanPackageService extends BaseCrudService<LoanPackage> implements ILoanPackageService<LoanPackage> {
  private loanPackageRepository: ILoanPackageRepository<LoanPackage>;

  constructor(@inject('LoanPackageRepository') loanPackageRepository: ILoanPackageRepository<LoanPackage>) {
    super(loanPackageRepository);
    this.loanPackageRepository = loanPackageRepository;
  }
}
