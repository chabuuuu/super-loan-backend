import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterBorrowerReq {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  socialLoginType!: string;

  @IsString()
  socialUid?: string;

  @IsNotEmpty()
  @IsString()
  status!: string;
}
