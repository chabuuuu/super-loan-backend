import { LoanRequestController } from '@/controller/loan_request.controller';
import { LoanRequestService } from '@/service/loan_request.service';
import { LoanRequest } from '@/models/loan_request.model';
import { LoanRequestRepository } from '@/repository/loan_request.repository';
import { ILoanRequestService } from '@/service/interface/i.loan_request.service';
import { ILoanRequestRepository } from '@/repository/interface/i.loan_request.repository';
import { BaseContainer } from '@/container/base.container';

class LoanRequestContainer extends BaseContainer {
  constructor() {
    super(LoanRequest);
    this.container.bind<ILoanRequestService<LoanRequest>>('LoanRequestService').to(LoanRequestService);
    this.container.bind<ILoanRequestRepository<LoanRequest>>('LoanRequestRepository').to(LoanRequestRepository);
    this.container.bind<LoanRequestController>(LoanRequestController).toSelf();
  }

  export() {
    const loanRequestController = this.container.get<LoanRequestController>(LoanRequestController);
    const loanRequestService = this.container.get<ILoanRequestService<any>>('LoanRequestService');
    return { loanRequestController, loanRequestService };
  }
}

const loanRequestContainer = new LoanRequestContainer();
const { loanRequestController, loanRequestService } = loanRequestContainer.export();
export { loanRequestController, loanRequestService };
