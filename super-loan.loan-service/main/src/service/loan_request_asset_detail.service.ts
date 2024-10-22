import { LoanRequestAssetDetail } from '@/models/loan_request_asset_detail.model';
import { ILoanRequestAssetDetailRepository } from '@/repository/interface/i.loan_request_asset_detail.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILoanRequestAssetDetailService } from '@/service/interface/i.loan_request_asset_detail.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanRequestAssetDetailService
  extends BaseCrudService<LoanRequestAssetDetail>
  implements ILoanRequestAssetDetailService<LoanRequestAssetDetail>
{
  private loanRequestAssetDetailRepository: ILoanRequestAssetDetailRepository<LoanRequestAssetDetail>;

  constructor(
    @inject('LoanRequestAssetDetailRepository')
    loanRequestAssetDetailRepository: ILoanRequestAssetDetailRepository<LoanRequestAssetDetail>
  ) {
    super(loanRequestAssetDetailRepository);
    this.loanRequestAssetDetailRepository = loanRequestAssetDetailRepository;
  }
}
