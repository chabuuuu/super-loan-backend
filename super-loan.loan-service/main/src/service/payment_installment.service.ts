import { PaymentInstallment } from '@/models/payment_installment.model';
import { IPaymentInstallmentRepository } from '@/repository/interface/i.payment_installment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentInstallmentService } from '@/service/interface/i.payment_installment.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentInstallmentService
  extends BaseCrudService<PaymentInstallment>
  implements IPaymentInstallmentService<PaymentInstallment>
{
  private paymentInstallmentRepository: IPaymentInstallmentRepository<PaymentInstallment>;

  constructor(
    @inject('PaymentInstallmentRepository')
    paymentInstallmentRepository: IPaymentInstallmentRepository<PaymentInstallment>
  ) {
    super(paymentInstallmentRepository);
    this.paymentInstallmentRepository = paymentInstallmentRepository;
  }
}
