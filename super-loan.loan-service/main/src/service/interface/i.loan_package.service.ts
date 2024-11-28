import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { CreateLoanPackageRes } from '@/dto/loan_package/create-loanpackage.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ILoanPackageService<T extends BaseModelType> extends IBaseCrudService<T> {
  createPackage(data: CreateLoanPackageReq): Promise<CreateLoanPackageRes>;
  getDetail(id: string): Promise<CreateLoanPackageRes>;
  getAll(page: number, rpp: number): Promise<PagingResponseDto<CreateLoanPackageRes>>;
}
