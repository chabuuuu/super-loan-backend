import { DisbursementPlan } from '@/models/disbursement_plan.model';
import { IDisbursementPlanRepository } from '@/repository/interface/i.disbursement_plan.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IDisbursementPlanService } from '@/service/interface/i.disbursement_plan.service';
import { inject, injectable } from 'inversify';

@injectable()
export class DisbursementPlanService
  extends BaseCrudService<DisbursementPlan>
  implements IDisbursementPlanService<DisbursementPlan>
{
  private disbursementPlanRepository: IDisbursementPlanRepository<DisbursementPlan>;

  constructor(
    @inject('DisbursementPlanRepository') disbursementPlanRepository: IDisbursementPlanRepository<DisbursementPlan>
  ) {
    super(disbursementPlanRepository);
    this.disbursementPlanRepository = disbursementPlanRepository;
  }
}
