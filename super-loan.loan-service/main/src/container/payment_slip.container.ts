import { PaymentSlipController } from '@/controller/payment_slip.controller';
import { PaymentSlipService } from '@/service/payment_slip.service';
import { PaymentSlip } from '@/models/payment_slip.model';
import { PaymentSlipRepository } from '@/repository/payment_slip.repository';
import { IPaymentSlipService } from '@/service/interface/i.payment_slip.service';
import { IPaymentSlipRepository } from '@/repository/interface/i.payment_slip.repository';
import { BaseContainer } from '@/container/base.container';

class PaymentSlipContainer extends BaseContainer {
  constructor() {
    super(PaymentSlip);
    this.container.bind<IPaymentSlipService<PaymentSlip>>('PaymentSlipService').to(PaymentSlipService);
    this.container.bind<IPaymentSlipRepository<PaymentSlip>>('PaymentSlipRepository').to(PaymentSlipRepository);
    this.container.bind<PaymentSlipController>(PaymentSlipController).toSelf();
  }

  export() {
    const paymentSlipController = this.container.get<PaymentSlipController>(PaymentSlipController);
    const paymentSlipService = this.container.get<IPaymentSlipService<any>>('PaymentSlipService');
    return { paymentSlipController, paymentSlipService };
  }
}

const paymentSlipContainer = new PaymentSlipContainer();
const { paymentSlipController, paymentSlipService } = paymentSlipContainer.export();
export { paymentSlipController, paymentSlipService };
