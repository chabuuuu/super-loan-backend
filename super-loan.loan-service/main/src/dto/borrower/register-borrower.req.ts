import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsDate,
  IsBoolean,
  MinLength,
  IsPhoneNumber,
  IsDateString
} from 'class-validator';

export class RegisterBorrowerReq {
  @IsNotEmpty()
  @IsString()
  fullname!: string;

  @IsNotEmpty()
  @IsDateString()
  birthday!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  homeAddress!: string;

  @IsNotEmpty()
  @IsBoolean()
  gender!: boolean;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;

  socialLoginType?: string;
  status?: string;
}
