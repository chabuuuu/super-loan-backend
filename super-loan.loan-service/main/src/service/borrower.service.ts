import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { Borrower } from '@/models/borrower.model';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  private borrowerRepository: IBorrowerRepository<Borrower>;

  constructor(@inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
  }
  async register(data: RegisterBorrowerReq): Promise<RegisterBorrowerRes> {
    const result = await this.borrowerRepository.create({
      data: data
    });
    return convertToDto(RegisterBorrowerRes, result);
  }
}
