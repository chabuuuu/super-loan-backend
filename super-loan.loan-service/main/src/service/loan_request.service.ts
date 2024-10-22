import { LoanRequest } from '@/models/loan_request.model';
import { ILoanRequestRepository } from '@/repository/interface/i.loan_request.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILoanRequestService } from '@/service/interface/i.loan_request.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LoanRequestService extends BaseCrudService<LoanRequest> implements ILoanRequestService<LoanRequest> {
  private loanRequestRepository: ILoanRequestRepository<LoanRequest>;

  constructor(@inject('LoanRequestRepository') loanRequestRepository: ILoanRequestRepository<LoanRequest>) {
    super(loanRequestRepository);
    this.loanRequestRepository = loanRequestRepository;
  }
}
