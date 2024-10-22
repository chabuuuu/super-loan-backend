import { StatusContract } from '@/models/status_contract.model';
import { IStatusContractRepository } from '@/repository/interface/i.status_contract.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStatusContractService } from '@/service/interface/i.status_contract.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StatusContractService
  extends BaseCrudService<StatusContract>
  implements IStatusContractService<StatusContract>
{
  private statusContractRepository: IStatusContractRepository<StatusContract>;

  constructor(@inject('StatusContractRepository') statusContractRepository: IStatusContractRepository<StatusContract>) {
    super(statusContractRepository);
    this.statusContractRepository = statusContractRepository;
  }
}
