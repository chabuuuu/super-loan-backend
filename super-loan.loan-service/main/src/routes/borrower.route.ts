import { borrowerController } from '@/container/borrower.container';
import { ForgotPasswordReq } from '@/dto/borrower/forgot-password-borrower.req';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { ResetPasswordReq } from '@/dto/borrower/reset-password-borrower.req';
import { VerifyOtpReq } from '@/dto/borrower/verify-otp-borrower.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const borrowerRouter = express.Router();
borrowerRouter
  .post('/register', classValidate(RegisterBorrowerReq), borrowerController.register.bind(borrowerController))

  .post('/login', classValidate(LoginBorrowerReq), borrowerController.login.bind(borrowerController))

  .post(
    '/forgot-password',
    classValidate(ForgotPasswordReq),
    borrowerController.forgotPassword.bind(borrowerController)
  )

  .post('/verify-otp', classValidate(VerifyOtpReq), borrowerController.verifyOtp.bind(borrowerController))

  .post('/reset-password', classValidate(ResetPasswordReq), borrowerController.resetPassword.bind(borrowerController))

  .get('/get-profile', authenticateJWT, borrowerController.getProfile.bind(borrowerController))

  .put('/update-profile', authenticateJWT, borrowerController.updateProfile.bind(borrowerController));

export default borrowerRouter;
