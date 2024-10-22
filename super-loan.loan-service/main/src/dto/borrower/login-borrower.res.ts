import { Expose } from 'class-transformer';

export class LoginBorrowerRes {
  @Expose()
  borrowerId!: string;

  @Expose()
  token!: string;
}
