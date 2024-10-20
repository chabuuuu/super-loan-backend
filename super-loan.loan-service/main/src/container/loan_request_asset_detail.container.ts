import { LoanRequestAssetDetailController } from '@/controller/loan_request_asset_detail.controller';
import { LoanRequestAssetDetailService } from '@/service/loan_request_asset_detail.service';
import { LoanRequestAssetDetail } from '@/models/loan_request_asset_detail.model';
import { LoanRequestAssetDetailRepository } from '@/repository/loan_request_asset_detail.repository';
import { ILoanRequestAssetDetailService } from '@/service/interface/i.loan_request_asset_detail.service';
import { ILoanRequestAssetDetailRepository } from '@/repository/interface/i.loan_request_asset_detail.repository';
import { BaseContainer } from '@/container/base.container';

class LoanRequestAssetDetailContainer extends BaseContainer {
  constructor() {
    super(LoanRequestAssetDetail);
    this.container
      .bind<ILoanRequestAssetDetailService<LoanRequestAssetDetail>>('LoanRequestAssetDetailService')
      .to(LoanRequestAssetDetailService);
    this.container
      .bind<ILoanRequestAssetDetailRepository<LoanRequestAssetDetail>>('LoanRequestAssetDetailRepository')
      .to(LoanRequestAssetDetailRepository);
    this.container.bind<LoanRequestAssetDetailController>(LoanRequestAssetDetailController).toSelf();
  }

  export() {
    const loanRequestAssetDetailController = this.container.get<LoanRequestAssetDetailController>(
      LoanRequestAssetDetailController
    );
    const loanRequestAssetDetailService = this.container.get<ILoanRequestAssetDetailService<any>>(
      'LoanRequestAssetDetailService'
    );
    return { loanRequestAssetDetailController, loanRequestAssetDetailService };
  }
}

const loanRequestAssetDetailContainer = new LoanRequestAssetDetailContainer();
const { loanRequestAssetDetailController, loanRequestAssetDetailService } = loanRequestAssetDetailContainer.export();
export { loanRequestAssetDetailController, loanRequestAssetDetailService };
