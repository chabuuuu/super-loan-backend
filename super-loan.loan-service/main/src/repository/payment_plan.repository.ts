import { PaymentPlan } from '@/models/payment_plan.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPaymentPlanRepository } from '@/repository/interface/i.payment_plan.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PaymentPlanRepository extends BaseRepository<PaymentPlan> implements IPaymentPlanRepository<PaymentPlan> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(PaymentPlan));
  }
}
