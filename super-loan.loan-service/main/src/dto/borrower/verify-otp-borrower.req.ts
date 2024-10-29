import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

export class VerifyOtpReq {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP must be a 6-digit number' })
  otp!: string;
}
