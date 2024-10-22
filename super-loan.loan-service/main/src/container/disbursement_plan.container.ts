import { DisbursementPlanController } from '@/controller/disbursement_plan.controller';
import { DisbursementPlanService } from '@/service/disbursement_plan.service';
import { DisbursementPlan } from '@/models/disbursement_plan.model';
import { DisbursementPlanRepository } from '@/repository/disbursement_plan.repository';
import { IDisbursementPlanService } from '@/service/interface/i.disbursement_plan.service';
import { IDisbursementPlanRepository } from '@/repository/interface/i.disbursement_plan.repository';
import { BaseContainer } from '@/container/base.container';

class DisbursementPlanContainer extends BaseContainer {
  constructor() {
    super(DisbursementPlan);
    this.container
      .bind<IDisbursementPlanService<DisbursementPlan>>('DisbursementPlanService')
      .to(DisbursementPlanService);
    this.container
      .bind<IDisbursementPlanRepository<DisbursementPlan>>('DisbursementPlanRepository')
      .to(DisbursementPlanRepository);
    this.container.bind<DisbursementPlanController>(DisbursementPlanController).toSelf();
  }

  export() {
    const disbursementPlanController = this.container.get<DisbursementPlanController>(DisbursementPlanController);
    const disbursementPlanService = this.container.get<IDisbursementPlanService<any>>('DisbursementPlanService');
    return { disbursementPlanController, disbursementPlanService };
  }
}

const disbursementPlanContainer = new DisbursementPlanContainer();
const { disbursementPlanController, disbursementPlanService } = disbursementPlanContainer.export();
export { disbursementPlanController, disbursementPlanService };
