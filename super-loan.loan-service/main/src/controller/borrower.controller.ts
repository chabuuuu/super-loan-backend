import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { ResetPasswordReq } from '@/dto/borrower/resetPassword-borrower.req';
import { VerifyOtpReq } from '@/dto/borrower/verifyOtp-borrower.req';

import { Borrower } from '@/models/borrower.model';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class BorrowerController {
  public common: IBaseCrudController<Borrower>;
  private borrowerService: IBorrowerService<Borrower>;
  constructor(
    @inject('BorrowerService') borrowerService: IBorrowerService<Borrower>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Borrower>
  ) {
    this.borrowerService = borrowerService;
    this.common = common;
  }
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: RegisterBorrowerReq = req.body;
      const result = await this.borrowerService.register(requestBody);
      const responseBody = convertToDto(RegisterBorrowerRes, result);
      res.send_ok('Register Borrower successful', responseBody);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: LoginBorrowerReq = req.body;
      const result = await this.borrowerService.login(requestBody);
      const responseBody = convertToDto(LoginBorrowerRes, result);
      res.send_ok('Login successful', responseBody);
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await this.borrowerService.forgotPassword(email);
      res.send_ok('OTP sent successfully');
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const verifyOtpReq: VerifyOtpReq = req.body;
      const result = await this.borrowerService.verifyOtp(verifyOtpReq.email, verifyOtpReq.otp);
      res.send_ok(result.message);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resetPasswordReq: ResetPasswordReq = req.body;
      await this.borrowerService.resetPassword(resetPasswordReq);
      res.send_ok('Password reset successfully');
    } catch (error) {
      next(error);
    }
  }
}
