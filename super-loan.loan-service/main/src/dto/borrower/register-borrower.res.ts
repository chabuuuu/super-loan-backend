import { Expose } from 'class-transformer';

export class RegisterBorrowerRes {
  @Expose()
  borrowerId!: string;

  @Expose()
  email!: string;

  @Expose()
  phoneNumber!: string;

  @Expose()
  socialLoginType!: string;

  @Expose()
  socialUid?: string;

  @Expose()
  status!: string;
}
