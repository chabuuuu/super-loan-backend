import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LoanRequest } from '@/models/loan_request.model';
import { ILoanRequestService } from '@/service/interface/i.loan_request.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanRequestController {
  public common: IBaseCrudController<LoanRequest>;
  private loanRequestService: ILoanRequestService<LoanRequest>;
  constructor(
    @inject('LoanRequestService') loanRequestService: ILoanRequestService<LoanRequest>,
    @inject(ITYPES.Controller) common: IBaseCrudController<LoanRequest>
  ) {
    this.loanRequestService = loanRequestService;
    this.common = common;
  }
}
