import { ReceiptController } from '@/controller/receipt.controller';
import { ReceiptService } from '@/service/receipt.service';
import { Receipt } from '@/models/receipt.model';
import { ReceiptRepository } from '@/repository/receipt.repository';
import { IReceiptService } from '@/service/interface/i.receipt.service';
import { IReceiptRepository } from '@/repository/interface/i.receipt.repository';
import { BaseContainer } from '@/container/base.container';

class ReceiptContainer extends BaseContainer {
  constructor() {
    super(Receipt);
    this.container.bind<IReceiptService<Receipt>>('ReceiptService').to(ReceiptService);
    this.container.bind<IReceiptRepository<Receipt>>('ReceiptRepository').to(ReceiptRepository);
    this.container.bind<ReceiptController>(ReceiptController).toSelf();
  }

  export() {
    const receiptController = this.container.get<ReceiptController>(ReceiptController);
    const receiptService = this.container.get<IReceiptService<any>>('ReceiptService');
    return { receiptController, receiptService };
  }
}

const receiptContainer = new ReceiptContainer();
const { receiptController, receiptService } = receiptContainer.export();
export { receiptController, receiptService };
