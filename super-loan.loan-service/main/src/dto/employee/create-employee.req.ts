import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  Matches,
  MaxLength,
  IsStrongPassword,
  MinLength,
  IsDateString
} from 'class-validator';

export class CreateEmployeeReq {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Matches(/^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}$/, {
    message: 'Phone number must be a valid Vietnamese number'
  })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Fullname must not exceed 50 characters' })
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/, { message: 'Fullname must not contain special characters' })
  @Matches(/^\S.*\S$|^[\S]$/, { message: 'Fullname must not have leading or trailing spaces' })
  fullname!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  roleId!: string;

  @IsOptional()
  avatar?: string;

  @IsNotEmpty()
  @IsString()
  identifyCardNumber!: string;

  @IsNotEmpty()
  @IsString()
  homeAddress!: string;

  @IsNotEmpty()
  @IsDateString()
  birthday!: Date;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(MALE|FEMALE)$/, { message: 'Gender must be either MALE or FEMALE' })
  gender!: string;
}
