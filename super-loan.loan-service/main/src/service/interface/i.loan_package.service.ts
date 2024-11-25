import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { CreateLoanPackageRes } from '@/dto/loan_package/create-loanpackage.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ILoanPackageService<T extends BaseModelType> extends IBaseCrudService<T> {
  createPackage(data: CreateLoanPackageReq): Promise<CreateLoanPackageRes>;
}
