import { PaymentPlanController } from '@/controller/payment_plan.controller';
import { PaymentPlanService } from '@/service/payment_plan.service';
import { PaymentPlan } from '@/models/payment_plan.model';
import { PaymentPlanRepository } from '@/repository/payment_plan.repository';
import { IPaymentPlanService } from '@/service/interface/i.payment_plan.service';
import { IPaymentPlanRepository } from '@/repository/interface/i.payment_plan.repository';
import { BaseContainer } from '@/container/base.container';

class PaymentPlanContainer extends BaseContainer {
  constructor() {
    super(PaymentPlan);
    this.container.bind<IPaymentPlanService<PaymentPlan>>('PaymentPlanService').to(PaymentPlanService);
    this.container.bind<IPaymentPlanRepository<PaymentPlan>>('PaymentPlanRepository').to(PaymentPlanRepository);
    this.container.bind<PaymentPlanController>(PaymentPlanController).toSelf();
  }

  export() {
    const paymentPlanController = this.container.get<PaymentPlanController>(PaymentPlanController);
    const paymentPlanService = this.container.get<IPaymentPlanService<any>>('PaymentPlanService');
    return { paymentPlanController, paymentPlanService };
  }
}

const paymentPlanContainer = new PaymentPlanContainer();
const { paymentPlanController, paymentPlanService } = paymentPlanContainer.export();
export { paymentPlanController, paymentPlanService };
