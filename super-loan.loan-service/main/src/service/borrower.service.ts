import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { Borrower } from '@/models/borrower.model';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import jwt from 'jsonwebtoken';
import { log } from 'console';
const SECRET_KEY: any = process.env.SECRET_KEY;

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  private borrowerRepository: IBorrowerRepository<Borrower>;

  constructor(@inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
  }
  async register(data: RegisterBorrowerReq): Promise<RegisterBorrowerRes> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.socialLoginType = 'NONE';
    data.status = '1';
    const borrower = await this.borrowerRepository.create({
      data: data
    });
    const result = await this.borrowerRepository.findOne({
      filter: { borrowerId: borrower.borrowerId },
      relations: ['borrowerProfile']
    });
    return convertToDto(RegisterBorrowerRes, result);
  }
  async login(data: LoginBorrowerReq): Promise<LoginBorrowerRes> {
    let borrower: Borrower | null = null;

    if (/^\d{10,11}$/.test(data.emailOrPhoneNumber)) {
      borrower = await this.borrowerRepository.findOne({
        filter: { phoneNumber: data.emailOrPhoneNumber }
      });
    } else {
      borrower = await this.borrowerRepository.findOne({
        filter: { email: data.emailOrPhoneNumber }
      });
    }

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, borrower!.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ borrowerId: borrower!.borrowerId }, SECRET_KEY, {
      expiresIn: 4 * 60 * 60
    });

    const result = convertToDto(LoginBorrowerRes, borrower);
    result.token = token;

    return result;
  }
}
