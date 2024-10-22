import { ContractController } from '@/controller/contract.controller';
import { ContractService } from '@/service/contract.service';
import { Contract } from '@/models/contract.model';
import { ContractRepository } from '@/repository/contract.repository';
import { IContractService } from '@/service/interface/i.contract.service';
import { IContractRepository } from '@/repository/interface/i.contract.repository';
import { BaseContainer } from '@/container/base.container';

class ContractContainer extends BaseContainer {
  constructor() {
    super(Contract);
    this.container.bind<IContractService<Contract>>('ContractService').to(ContractService);
    this.container.bind<IContractRepository<Contract>>('ContractRepository').to(ContractRepository);
    this.container.bind<ContractController>(ContractController).toSelf();
  }

  export() {
    const contractController = this.container.get<ContractController>(ContractController);
    const contractService = this.container.get<IContractService<any>>('ContractService');
    return { contractController, contractService };
  }
}

const contractContainer = new ContractContainer();
const { contractController, contractService } = contractContainer.export();
export { contractController, contractService };
