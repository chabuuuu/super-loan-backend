import { ValidateError } from '@/constants/validate.constants';
import { HomeAddressDto } from '@/dto/home-address.dto';
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
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/)
  @Matches(/^\S.*\S$|^[\S]$/)
  fullname!: string;

  @IsNotEmpty()
  @IsDateString(undefined)
  birthday!: string;

  @IsNotEmpty()
  @IsEmail(undefined)
  email!: string;

  @IsNotEmpty()
  @Matches(/^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}$/, {
    message: ValidateError.INVALID
  })
  phoneNumber!: string;

  @IsNotEmpty()
  homeAddress!: HomeAddressDto;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(MALE|FEMALE)$/)
  gender!: 'MALE' | 'FEMALE';

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6)
  @MaxLength(12)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.newPassword === o.confirmPassword)
  confirmPassword!: string;

  // @IsNotEmpty({name: ValidateError.NOT_EMPTY})
  // @IsString({message: ValidateError.NOT_STRING}))
  // captchaToken!: string;

  socialLoginType?: string;
  status?: string;
}
