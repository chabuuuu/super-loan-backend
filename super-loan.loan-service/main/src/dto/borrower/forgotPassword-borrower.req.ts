import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordReq {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
