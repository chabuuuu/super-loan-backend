import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PaymentPlan } from '@/models/payment_plan.model';
import { IPaymentPlanService } from '@/service/interface/i.payment_plan.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentPlanController {
  public common: IBaseCrudController<PaymentPlan>;
  private paymentPlanService: IPaymentPlanService<PaymentPlan>;
  constructor(
    @inject('PaymentPlanService') paymentPlanService: IPaymentPlanService<PaymentPlan>,
    @inject(ITYPES.Controller) common: IBaseCrudController<PaymentPlan>
  ) {
    this.paymentPlanService = paymentPlanService;
    this.common = common;
  }
}
