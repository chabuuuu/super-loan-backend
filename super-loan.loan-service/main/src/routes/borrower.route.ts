import { borrowerController } from '@/container/borrower.container';
import { ForgotPasswordReq } from '@/dto/borrower/forgotPassword-borrower.req';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { ResetPasswordReq } from '@/dto/borrower/resetPassword-borrower.req';
import { VerifyOtpReq } from '@/dto/borrower/verifyOtp-borrower.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const borrowerRouter = express.Router();
borrowerRouter
  .post('/register', classValidate(RegisterBorrowerReq), borrowerController.register.bind(borrowerController))

  .post('/login', classValidate(LoginBorrowerReq), borrowerController.login.bind(borrowerController));
borrowerRouter.post(
  '/forgot-password',
  classValidate(ForgotPasswordReq),
  borrowerController.forgotPassword.bind(borrowerController)
);

borrowerRouter.post('/verify-otp', classValidate(VerifyOtpReq), borrowerController.verifyOtp.bind(borrowerController));

borrowerRouter.post(
  '/reset-password',
  classValidate(ResetPasswordReq),
  borrowerController.resetPassword.bind(borrowerController)
);
export default borrowerRouter;
