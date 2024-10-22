import { IsNotEmpty, IsString, IsStrongPassword, MinLength, IsPhoneNumber, IsEmail, ValidateIf } from 'class-validator';

export class LoginBorrowerReq {
  @ValidateIf((o) => !o.email)
  @IsPhoneNumber()
  phoneNumber?: string;

  @ValidateIf((o) => !o.phoneNumber)
  @IsEmail({}, { message: 'Email is not valid' })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}
