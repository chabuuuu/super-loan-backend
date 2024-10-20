import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PaymentInstallment } from '@/models/payment_installment.model';
import { IPaymentInstallmentService } from '@/service/interface/i.payment_installment.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentInstallmentController {
  public common: IBaseCrudController<PaymentInstallment>;
  private paymentInstallmentService: IPaymentInstallmentService<PaymentInstallment>;
  constructor(
    @inject('PaymentInstallmentService') paymentInstallmentService: IPaymentInstallmentService<PaymentInstallment>,
    @inject(ITYPES.Controller) common: IBaseCrudController<PaymentInstallment>
  ) {
    this.paymentInstallmentService = paymentInstallmentService;
    this.common = common;
  }
}
