import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { CreateLoanPackageRes } from '@/dto/loan_package/create-loanpackage.res';
import { PagingDto } from '@/dto/paging.dto';
import { LoanPackage } from '@/models/loan_package.model';
import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { ILoanPackageRepository } from '@/repository/interface/i.loan_package.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanPackageService extends BaseCrudService<LoanPackage> implements ILoanPackageService<LoanPackage> {
  private loanPackageRepository: ILoanPackageRepository<LoanPackage>;

  constructor(@inject('LoanPackageRepository') loanPackageRepository: ILoanPackageRepository<LoanPackage>) {
    super(loanPackageRepository);
    this.loanPackageRepository = loanPackageRepository;
  }
  async createPackage(data: CreateLoanPackageReq): Promise<CreateLoanPackageRes> {
    const lastLoanPackage = await this.loanPackageRepository.findMany({
      order: [{ column: 'createAt', direction: 'DESC' }]
    });

    let nextLoanPackageId = 'GV01';
    if (lastLoanPackage.length > 0 && lastLoanPackage[0].loanPackageId) {
      const numericPart = parseInt(lastLoanPackage[0].loanPackageId.replace('GV', ''), 10);
      const nextNumericPart = (numericPart + 1).toString().padStart(2, '0');
      nextLoanPackageId = `GV${nextNumericPart}`;
    }

    const loanPackage = await this.loanPackageRepository.create({
      data: {
        loanPackageId: nextLoanPackageId,
        ...data
      }
    });

    return convertToDto(CreateLoanPackageRes, loanPackage);
  }

  async getAll(page: number, rpp: number): Promise<CreateLoanPackageRes[]> {
    const paging = new PagingDto(page, rpp);

    const loanPackages = await this.loanPackageRepository.findMany({
      paging: paging,
      order: [{ column: 'createAt', direction: 'ASC' }]
    });

    return loanPackages.map((loanPackage) => convertToDto(CreateLoanPackageRes, loanPackage));
  }

  async getDetail(id: string): Promise<CreateLoanPackageRes> {
    const loanPackage = await this.loanPackageRepository.findOne({
      filter: { loanPackageId: id }
    });

    if (!loanPackage) {
      throw new Error('Loan Package not found');
    }

    return convertToDto(CreateLoanPackageRes, loanPackage);
  }
}
