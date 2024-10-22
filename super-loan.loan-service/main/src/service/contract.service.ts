import { Contract } from '@/models/contract.model';
import { IContractRepository } from '@/repository/interface/i.contract.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IContractService } from '@/service/interface/i.contract.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ContractService extends BaseCrudService<Contract> implements IContractService<Contract> {
  private contractRepository: IContractRepository<Contract>;

  constructor(@inject('ContractRepository') contractRepository: IContractRepository<Contract>) {
    super(contractRepository);
    this.contractRepository = contractRepository;
  }
}
