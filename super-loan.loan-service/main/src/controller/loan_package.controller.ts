import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LoanPackage } from '@/models/loan_package.model';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanPackageController {
  public common: IBaseCrudController<LoanPackage>;
  private loanPackageService: ILoanPackageService<LoanPackage>;
  constructor(
    @inject('LoanPackageService') loanPackageService: ILoanPackageService<LoanPackage>,
    @inject(ITYPES.Controller) common: IBaseCrudController<LoanPackage>
  ) {
    this.loanPackageService = loanPackageService;
    this.common = common;
  }
}
