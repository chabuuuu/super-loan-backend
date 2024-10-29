import { Expose } from 'class-transformer';

export class ResetPasswordRes {
  @Expose()
  borrowerId!: string;

  @Expose()
  message!: string;
}
