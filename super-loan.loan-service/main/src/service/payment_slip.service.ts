import { PaymentSlip } from '@/models/payment_slip.model';
import { IPaymentSlipRepository } from '@/repository/interface/i.payment_slip.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentSlipService } from '@/service/interface/i.payment_slip.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentSlipService extends BaseCrudService<PaymentSlip> implements IPaymentSlipService<PaymentSlip> {
  private paymentSlipRepository: IPaymentSlipRepository<PaymentSlip>;

  constructor(@inject('PaymentSlipRepository') paymentSlipRepository: IPaymentSlipRepository<PaymentSlip>) {
    super(paymentSlipRepository);
    this.paymentSlipRepository = paymentSlipRepository;
  }
}
