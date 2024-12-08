import { ValidateError } from '@/constants/validate.constants';
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
  Matches,
  ValidateIf
} from 'class-validator';

export class RegisterBorrowerReq {
  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsString({ message: ValidateError.NOT_STRING })
  @MaxLength(30, { message: 'MAX_FULLNAME_LENGTH:30' })
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/, {
    message: 'FULLNAME_CONTAIN_SPECIAL_CHARS'
  })
  @Matches(/^\S.*\S$|^[\S]$/, { message: 'FULLNAME_LEADING_OR_TRAINLING_SPACE' })
  fullname!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsDateString(undefined, { message: ValidateError.NOT_DATE_STRING })
  birthday!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsEmail(undefined, { message: 'INVALID_EMAIL' })
  email!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @Matches(/^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}$/, {
    message: ValidateError.NOT_PHONE_NUMBER
  })
  phoneNumber!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsString({ message: ValidateError.NOT_STRING })
  homeAddress!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsString({ message: ValidateError.NOT_STRING })
  @Matches(/^(MALE|FEMALE)$/, { message: 'MUST_BE:MALE/FEMALE' })
  gender!: 'MALE' | 'FEMALE';

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsString({ message: ValidateError.NOT_STRING })
  @IsStrongPassword(undefined, { message: ValidateError.NOT_STRONG_PASSWORD })
  @MinLength(6, { message: 'PASSWORD_MIN:6' })
  @MaxLength(12, { message: 'PASSWORD_MAX:12' })
  password!: string;

  @IsNotEmpty({ message: ValidateError.NOT_EMPTY })
  @IsString({ message: ValidateError.NOT_STRING })
  @ValidateIf((o) => o.newPassword === o.confirmPassword, {
    message: 'Confirm Password must match New Password'
  })
  confirmPassword!: string;

  // @IsNotEmpty({name: ValidateError.NOT_EMPTY})
  // @IsString({message: ValidateError.NOT_STRING}))
  // captchaToken!: string;

  socialLoginType?: string;
  status?: string;
}
