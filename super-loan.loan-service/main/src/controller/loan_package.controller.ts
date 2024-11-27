import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { CreateLoanPackageRes } from '@/dto/loan_package/create-loanpackage.res';
import { LoanPackage } from '@/models/loan_package.model';
import { ILoanPackageService } from '@/service/interface/i.loan_package.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
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

  async createPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: CreateLoanPackageReq = req.body;
      const result = await this.loanPackageService.createPackage(requestBody);
      res.send_ok('Create Loan Package successful', result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const rpp = Number(req.query.rpp) || 10;

      const loanPackages = await this.loanPackageService.getAll(page, rpp);

      res.json({ message: 'Success', data: loanPackages });
    } catch (error) {
      next(error);
    }
  }

  async getLoanPackageDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const loanPackage = await this.loanPackageService.getDetail(id);
      res.json({ data: loanPackage });
    } catch (error) {
      next(error);
    }
  }
}
