import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PaymentSlip } from '@/models/payment_slip.model';
import { IPaymentSlipService } from '@/service/interface/i.payment_slip.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentSlipController {
  public common: IBaseCrudController<PaymentSlip>;
  private paymentSlipService: IPaymentSlipService<PaymentSlip>;
  constructor(
    @inject('PaymentSlipService') paymentSlipService: IPaymentSlipService<PaymentSlip>,
    @inject(ITYPES.Controller) common: IBaseCrudController<PaymentSlip>
  ) {
    this.paymentSlipService = paymentSlipService;
    this.common = common;
  }
}
