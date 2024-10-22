import { PaymentInstallmentController } from '@/controller/payment_installment.controller';
import { PaymentInstallmentService } from '@/service/payment_installment.service';
import { PaymentInstallment } from '@/models/payment_installment.model';
import { PaymentInstallmentRepository } from '@/repository/payment_installment.repository';
import { IPaymentInstallmentService } from '@/service/interface/i.payment_installment.service';
import { IPaymentInstallmentRepository } from '@/repository/interface/i.payment_installment.repository';
import { BaseContainer } from '@/container/base.container';

class PaymentInstallmentContainer extends BaseContainer {
  constructor() {
    super(PaymentInstallment);
    this.container
      .bind<IPaymentInstallmentService<PaymentInstallment>>('PaymentInstallmentService')
      .to(PaymentInstallmentService);
    this.container
      .bind<IPaymentInstallmentRepository<PaymentInstallment>>('PaymentInstallmentRepository')
      .to(PaymentInstallmentRepository);
    this.container.bind<PaymentInstallmentController>(PaymentInstallmentController).toSelf();
  }

  export() {
    const paymentInstallmentController = this.container.get<PaymentInstallmentController>(PaymentInstallmentController);
    const paymentInstallmentService = this.container.get<IPaymentInstallmentService<any>>('PaymentInstallmentService');
    return { paymentInstallmentController, paymentInstallmentService };
  }
}

const paymentInstallmentContainer = new PaymentInstallmentContainer();
const { paymentInstallmentController, paymentInstallmentService } = paymentInstallmentContainer.export();
export { paymentInstallmentController, paymentInstallmentService };
