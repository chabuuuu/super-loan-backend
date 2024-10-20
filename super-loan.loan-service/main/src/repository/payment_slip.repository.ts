import { PaymentSlip } from '@/models/payment_slip.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPaymentSlipRepository } from '@/repository/interface/i.payment_slip.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PaymentSlipRepository extends BaseRepository<PaymentSlip> implements IPaymentSlipRepository<PaymentSlip> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(PaymentSlip));
  }
}
