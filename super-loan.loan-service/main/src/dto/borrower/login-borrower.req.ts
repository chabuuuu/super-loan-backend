import { IsNotEmpty, IsString, IsStrongPassword, MinLength, ValidateIf, MaxLength, Matches } from 'class-validator';

export class LoginBorrowerReq {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[235789][0-9]{8}|[\w\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]{2,4})$/, {
    message: 'Must be a valid email or Vietnamese phone number'
  })
  emailOrPhoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  captchaToken!: string;
}
