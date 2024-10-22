import { AppraisalController } from '@/controller/appraisal.controller';
import { AppraisalService } from '@/service/appraisal.service';
import { Appraisal } from '@/models/appraisal.model';
import { AppraisalRepository } from '@/repository/appraisal.repository';
import { IAppraisalService } from '@/service/interface/i.appraisal.service';
import { IAppraisalRepository } from '@/repository/interface/i.appraisal.repository';
import { BaseContainer } from '@/container/base.container';

class AppraisalContainer extends BaseContainer {
  constructor() {
    super(Appraisal);
    this.container.bind<IAppraisalService<Appraisal>>('AppraisalService').to(AppraisalService);
    this.container.bind<IAppraisalRepository<Appraisal>>('AppraisalRepository').to(AppraisalRepository);
    this.container.bind<AppraisalController>(AppraisalController).toSelf();
  }

  export() {
    const appraisalController = this.container.get<AppraisalController>(AppraisalController);
    const appraisalService = this.container.get<IAppraisalService<any>>('AppraisalService');
    return { appraisalController, appraisalService };
  }
}

const appraisalContainer = new AppraisalContainer();
const { appraisalController, appraisalService } = appraisalContainer.export();
export { appraisalController, appraisalService };
