import { Expose } from 'class-transformer';

export class ForgotPasswordRes {
  @Expose()
  borrowerId!: string;
}
