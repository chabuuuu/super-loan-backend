import { PaymentPlan } from '@/models/payment_plan.model';
import { IPaymentPlanRepository } from '@/repository/interface/i.payment_plan.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentPlanService } from '@/service/interface/i.payment_plan.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentPlanService extends BaseCrudService<PaymentPlan> implements IPaymentPlanService<PaymentPlan> {
  private paymentPlanRepository: IPaymentPlanRepository<PaymentPlan>;

  constructor(@inject('PaymentPlanRepository') paymentPlanRepository: IPaymentPlanRepository<PaymentPlan>) {
    super(paymentPlanRepository);
    this.paymentPlanRepository = paymentPlanRepository;
  }
}
