import { StatusContractController } from '@/controller/status_contract.controller';
import { StatusContractService } from '@/service/status_contract.service';
import { StatusContract } from '@/models/status_contract.model';
import { StatusContractRepository } from '@/repository/status_contract.repository';
import { IStatusContractService } from '@/service/interface/i.status_contract.service';
import { IStatusContractRepository } from '@/repository/interface/i.status_contract.repository';
import { BaseContainer } from '@/container/base.container';

class StatusContractContainer extends BaseContainer {
  constructor() {
    super(StatusContract);
    this.container.bind<IStatusContractService<StatusContract>>('StatusContractService').to(StatusContractService);
    this.container
      .bind<IStatusContractRepository<StatusContract>>('StatusContractRepository')
      .to(StatusContractRepository);
    this.container.bind<StatusContractController>(StatusContractController).toSelf();
  }

  export() {
    const statusContractController = this.container.get<StatusContractController>(StatusContractController);
    const statusContractService = this.container.get<IStatusContractService<any>>('StatusContractService');
    return { statusContractController, statusContractService };
  }
}

const statusContractContainer = new StatusContractContainer();
const { statusContractController, statusContractService } = statusContractContainer.export();
export { statusContractController, statusContractService };
