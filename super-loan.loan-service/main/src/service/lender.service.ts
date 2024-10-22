import { Lender } from '@/models/lender.model';
import { ILenderRepository } from '@/repository/interface/i.lender.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILenderService } from '@/service/interface/i.lender.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LenderService extends BaseCrudService<Lender> implements ILenderService<Lender> {
  private lenderRepository: ILenderRepository<Lender>;

  constructor(@inject('LenderRepository') lenderRepository: ILenderRepository<Lender>) {
    super(lenderRepository);
    this.lenderRepository = lenderRepository;
  }
}
