import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { CreateLoanPackageRes } from '@/dto/loan_package/create-loanpackage.res';
import { LoanPackage } from '@/models/loan_package.model';
import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { ILoanPackageRepository } from '@/repository/interface/i.loan_package.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanPackageService extends BaseCrudService<LoanPackage> implements ILoanPackageService<LoanPackage> {
  private loanPackageRepository: ILoanPackageRepository<LoanPackage>;

  constructor(@inject('LoanPackageRepository') loanPackageRepository: ILoanPackageRepository<LoanPackage>) {
    super(loanPackageRepository);
    this.loanPackageRepository = loanPackageRepository;
  }
  async createPackage(data: CreateLoanPackageReq): Promise<CreateLoanPackageRes> {
    const loanPackage = await this.loanPackageRepository.create({
      data: data
    });
    return convertToDto(CreateLoanPackageRes, loanPackage);
  }

  async getAll() {}

  async getDetail() {}
}
