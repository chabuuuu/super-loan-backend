import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ForgotPasswordReq } from '@/dto/borrower/forgot-password-borrower.req';
import { GetProfileRes } from '@/dto/borrower/get-profile.res';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { ResetPasswordReq } from '@/dto/borrower/reset-password-borrower.req';
import { ResetPasswordRes } from '@/dto/borrower/reset-password-borrower.res';
import { UpdateProfileReq } from '@/dto/borrower/update-profile.req';
import { UpdateProfileRes } from '@/dto/borrower/update-profile.res';
import { VerifyOtpReq } from '@/dto/borrower/verify-otp-borrower.req';
import { VerifyOtpRes } from '@/dto/borrower/verify-otp-borrower.res';
import { ClientInfoDto } from '@/dto/client-info.dto';
import { PagingDto } from '@/dto/paging.dto';
import { SearchDataDto } from '@/dto/search-data.dto';

import { Borrower } from '@/models/borrower.model';
import { BorrowerProfile } from '@/models/borrower_profile.model';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { getClientInfo } from '@/utils/get-client-info.util';
import { getSearchData } from '@/utils/get-search-data.util';
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

  async searchBorrower(req: Request, res: Response, next: NextFunction) {
    try {
      const searchData: SearchDataDto = getSearchData(req);
      const result = await this.borrowerService.search(searchData);
      res.send_ok('Employees fetched successfully', result);
    } catch (error) {
      next(error);
    }
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
      const clientInfo = await getClientInfo(req);
      const result = await this.borrowerService.login(requestBody, clientInfo);
      const responseBody = convertToDto(LoginBorrowerRes, result);
      res.send_ok('Login successful', responseBody);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /logout
   * @param req
   * @param res
   * @param next
   */
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;

      const userId = user!.id;

      await this.borrowerService.logout(userId);

      res.send_ok('Logout success');
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: ForgotPasswordReq = req.body;
      await this.borrowerService.forgotPassword(requestBody);
      res.send_ok('OTP sent successfully');
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const verifyOtpReq: VerifyOtpReq = req.body;
      const result = await this.borrowerService.verifyOtp(verifyOtpReq.email, verifyOtpReq.otp);
      const responseBody = convertToDto(VerifyOtpRes, result);
      res.send_ok(responseBody.message);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resetPasswordReq: ResetPasswordReq = req.body;
      const { email, otp } = resetPasswordReq;
      const result = await this.borrowerService.resetPassword(email, otp, resetPasswordReq);
      const responseBody = convertToDto(ResetPasswordRes, {
        borrowerId: result.borrowerId,
        message: 'Password reset successfully'
      });
      res.send_ok(responseBody.message);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;
      const borrowerId = user?.id;

      if (!borrowerId) {
        throw new Error('You must login');
      }

      const profileData = await this.borrowerService.getProfile(borrowerId);
      const responseBody = convertToDto(GetProfileRes, profileData);
      res.send_ok('Get Profile success', responseBody);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;
      const borrowerId = user?.id;

      if (!borrowerId) {
        throw new Error('You must login');
      }

      const updateData: UpdateProfileReq = req.body;
      const updatedProfile = await this.borrowerService.updateProfile(borrowerId, updateData);
      const responseBody = convertToDto(UpdateProfileRes, updatedProfile);

      res.send_ok('Profile updated successfully', responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const rpp = Number(req.query.rpp) || 10;

      const paging = new PagingDto(page, rpp);

      const borrowers = await this.borrowerService.getAll(paging);

      res.send_ok('Get all borrowers success', borrowers);
    } catch (error) {
      next(error);
    }
  }
}
