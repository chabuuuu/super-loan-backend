import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IBorrowerService<T extends BaseModelType> extends IBaseCrudService<T> {
  login(requestBody: LoginBorrowerReq): Promise<LoginBorrowerRes>;
  register(data: RegisterBorrowerReq): Promise<RegisterBorrowerRes>;
}
