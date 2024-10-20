import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { DisbursementPlan } from '@/models/disbursement_plan.model';
import { IDisbursementPlanService } from '@/service/interface/i.disbursement_plan.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class DisbursementPlanController {
  public common: IBaseCrudController<DisbursementPlan>;
  private disbursementPlanService: IDisbursementPlanService<DisbursementPlan>;
  constructor(
    @inject('DisbursementPlanService') disbursementPlanService: IDisbursementPlanService<DisbursementPlan>,
    @inject(ITYPES.Controller) common: IBaseCrudController<DisbursementPlan>
  ) {
    this.disbursementPlanService = disbursementPlanService;
    this.common = common;
  }
}
