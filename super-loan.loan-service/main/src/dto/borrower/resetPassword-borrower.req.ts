import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEmail, IsStrongPassword } from 'class-validator';

export class ResetPasswordReq {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  newPassword!: string;
}
