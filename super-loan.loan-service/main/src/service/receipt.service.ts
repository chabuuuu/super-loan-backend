import { Receipt } from '@/models/receipt.model';
import { IReceiptRepository } from '@/repository/interface/i.receipt.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IReceiptService } from '@/service/interface/i.receipt.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ReceiptService extends BaseCrudService<Receipt> implements IReceiptService<Receipt> {
  private receiptRepository: IReceiptRepository<Receipt>;

  constructor(@inject('ReceiptRepository') receiptRepository: IReceiptRepository<Receipt>) {
    super(receiptRepository);
    this.receiptRepository = receiptRepository;
  }
}
