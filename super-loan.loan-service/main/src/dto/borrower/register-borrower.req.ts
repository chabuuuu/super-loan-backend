import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  MinLength,
  IsPhoneNumber,
  IsDateString,
  MaxLength,
  Matches
} from 'class-validator';

export class RegisterBorrowerReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Fullname must not exceed 50 characters' })
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/, { message: 'Fullname must not contain special characters' })
  fullname!: string;

  @IsNotEmpty()
  @IsDateString()
  birthday!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
    message: 'Phone number must be a valid Vietnamese number'
  })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  homeAddress!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(MALE|FEMALE)$/, { message: 'Gender must be either MALE or FEMALE' })
  gender!: 'MALE' | 'FEMALE';

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12)
  password!: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;

  socialLoginType?: string;
  status?: string;
}
