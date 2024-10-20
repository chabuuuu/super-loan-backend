import { PaymentInstallment } from '@/models/payment_installment.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPaymentInstallmentRepository } from '@/repository/interface/i.payment_installment.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PaymentInstallmentRepository
  extends BaseRepository<PaymentInstallment>
  implements IPaymentInstallmentRepository<PaymentInstallment>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(PaymentInstallment));
  }
}
