import { Borrower } from '@/models/borrower.model';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { inject, injectable } from 'inversify';

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  private borrowerRepository: IBorrowerRepository<Borrower>;

  constructor(@inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
  }
}
