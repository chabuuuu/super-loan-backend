import { ForgotPasswordReq } from '@/dto/borrower/forgot-password-borrower.req';
import { GetProfileRes } from '@/dto/borrower/get-profile.res';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { ResetPasswordReq } from '@/dto/borrower/reset-password-borrower.req';
import { ResetPasswordRes } from '@/dto/borrower/reset-password-borrower.res';
import { VerifyOtpRes } from '@/dto/borrower/verify-otp-borrower.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IBorrowerService<T extends BaseModelType> extends IBaseCrudService<T> {
  login(requestBody: LoginBorrowerReq): Promise<LoginBorrowerRes>;
  register(data: RegisterBorrowerReq): Promise<RegisterBorrowerRes>;
  forgotPassword(requestBody: ForgotPasswordReq): Promise<void>;
  resetPassword(email: string, inputOtp: string, requestBody: ResetPasswordReq): Promise<ResetPasswordRes>;
  verifyOtp(email: string, inputOtp: string): Promise<VerifyOtpRes>;
  getProfile(borrowerId: string): Promise<GetProfileRes>;
}
