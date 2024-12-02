import { IsNotEmpty, IsString, Matches, IsStrongPassword, MinLength, MaxLength } from 'class-validator';

export class LoginEmployeeReq {
  @IsNotEmpty({ message: () => i18n.__('IS_NOT_EMPTY') })
  @IsString({ message: () => i18n.__('IS_STRING') })
  @Matches(/^(0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}|[\w\-.]+@[a-zA-Z\d\-.]+\.[a-zA-Z]{2,4})$/, {
    message: () => i18n.__('IS_VALID_PHONE')
  })
  emailOrPhoneNumber!: string;

  @IsNotEmpty({ message: () => i18n.__('IS_NOT_EMPTY') })
  @IsString({ message: () => i18n.__('IS_STRING') })
  @IsStrongPassword()
  @MinLength(6, { message: () => i18n.__('IS_MIN_6') })
  @MaxLength(12, { message: () => i18n.__('IS_MAX_12') })
  password!: string;
}
