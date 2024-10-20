import { LenderController } from '@/controller/lender.controller';
import { LenderService } from '@/service/lender.service';
import { Lender } from '@/models/lender.model';
import { LenderRepository } from '@/repository/lender.repository';
import { ILenderService } from '@/service/interface/i.lender.service';
import { ILenderRepository } from '@/repository/interface/i.lender.repository';
import { BaseContainer } from '@/container/base.container';

class LenderContainer extends BaseContainer {
  constructor() {
    super(Lender);
    this.container.bind<ILenderService<Lender>>('LenderService').to(LenderService);
    this.container.bind<ILenderRepository<Lender>>('LenderRepository').to(LenderRepository);
    this.container.bind<LenderController>(LenderController).toSelf();
  }

  export() {
    const lenderController = this.container.get<LenderController>(LenderController);
    const lenderService = this.container.get<ILenderService<any>>('LenderService');
    return { lenderController, lenderService };
  }
}

const lenderContainer = new LenderContainer();
const { lenderController, lenderService } = lenderContainer.export();
export { lenderController, lenderService };
