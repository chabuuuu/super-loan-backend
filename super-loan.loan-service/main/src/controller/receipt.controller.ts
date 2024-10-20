import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Receipt } from '@/models/receipt.model';
import { IReceiptService } from '@/service/interface/i.receipt.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ReceiptController {
  public common: IBaseCrudController<Receipt>;
  private receiptService: IReceiptService<Receipt>;
  constructor(
    @inject('ReceiptService') receiptService: IReceiptService<Receipt>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Receipt>
  ) {
    this.receiptService = receiptService;
    this.common = common;
  }
}
