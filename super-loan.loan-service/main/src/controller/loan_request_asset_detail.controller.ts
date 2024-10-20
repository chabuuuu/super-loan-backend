import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LoanRequestAssetDetail } from '@/models/loan_request_asset_detail.model';
import { ILoanRequestAssetDetailService } from '@/service/interface/i.loan_request_asset_detail.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanRequestAssetDetailController {
  public common: IBaseCrudController<LoanRequestAssetDetail>;
  private loanRequestAssetDetailService: ILoanRequestAssetDetailService<LoanRequestAssetDetail>;
  constructor(
    @inject('LoanRequestAssetDetailService')
    loanRequestAssetDetailService: ILoanRequestAssetDetailService<LoanRequestAssetDetail>,
    @inject(ITYPES.Controller) common: IBaseCrudController<LoanRequestAssetDetail>
  ) {
    this.loanRequestAssetDetailService = loanRequestAssetDetailService;
    this.common = common;
  }
}
