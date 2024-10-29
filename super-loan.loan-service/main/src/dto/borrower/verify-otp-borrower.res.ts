import { Expose } from 'class-transformer';

export class VerifyOtpRes {
  @Expose()
  message!: string;
}
