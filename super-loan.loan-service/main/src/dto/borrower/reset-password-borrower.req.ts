import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsStrongPassword, ValidateIf } from 'class-validator';

export class ResetPasswordReq {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  otp!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  newPassword!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.newPassword === o.confirmPassword, {
    message: 'Confirm Password must match New Password'
  })
  confirmPassword!: string;
}
