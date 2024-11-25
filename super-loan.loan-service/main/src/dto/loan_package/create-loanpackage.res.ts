import { Expose } from 'class-transformer';

export class CreateLoanPackageRes {
  @Expose()
  loanPackageId!: string;

  @Expose()
  loanPackageName!: string;

  @Expose()
  limitAmount!: number;

  @Expose()
  loanType!: string;

  @Expose()
  preference!: string;

  @Expose()
  description!: string;

  @Expose()
  interestRate!: number;

  @Expose()
  terms!: string;

  @Expose()
  loanTermLimit!: number;
}
