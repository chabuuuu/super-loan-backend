import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { Borrower } from '@/models/borrower.model';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { LoginBorrowerReq } from '@/dto/borrower/login-borrower.req';
import { LoginBorrowerRes } from '@/dto/borrower/login-borrower.res';
import jwt from 'jsonwebtoken';
import redis from '@/utils/redis/redis.util';
import { ForgotPasswordReq } from '@/dto/borrower/forgot-password-borrower.req';
import { VerifyOtpRes } from '@/dto/borrower/verify-otp-borrower.res';
import { sendEmail } from '@/utils/email/email-sender.util';
import axios from 'axios';
import { createEmailContent } from '@/utils/email/create-email-content.util';
import { createEmailOtpContent } from '@/utils/email/create-email-otp-content.util';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';
import { ResetPasswordReq } from '@/dto/borrower/reset-password-borrower.req';
import { ResetPasswordRes } from '@/dto/borrower/reset-password-borrower.res';
import { BorrowerProfile } from '@/models/borrower_profile.model';
import { GetProfileRes } from '@/dto/borrower/get-profile.res';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import _ from 'lodash';
const SECRET_KEY: any = process.env.SECRET_KEY;

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  private borrowerRepository: IBorrowerRepository<Borrower>;

  constructor(@inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
  }
  // private async verifyCaptcha(captchaToken: string): Promise<boolean> {
  //   const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  //   const url = `https://www.google.com/recaptcha/api/siteverify`;
  //   //if(!DataTransfer.isClickcaptcha) throw
  //   try {
  //     const response = await axios.post(url, null, {
  //       params: {
  //         secret: secretKey,
  //         response: captchaToken
  //       }
  //     });
  //     return response.data.success; // Kiểm tra nếu success là true
  //   } catch (error) {
  //     console.error('Error verifying CAPTCHA:', error);
  //     return false;
  //   }
  // }
  async register(data: RegisterBorrowerReq): Promise<RegisterBorrowerRes> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.socialLoginType = 'NONE';
    data.status = '1';

    // const isCaptchaValid = await this.verifyCaptcha(data.captchaToken);
    // if (!isCaptchaValid) {
    //   throw new Error('Invalid CAPTCHA. Please try again.');
    // }

    const borrowerProfile = new BorrowerProfile();
    borrowerProfile.fullname = data.fullname;
    borrowerProfile.birthday = new Date(data.birthday);
    borrowerProfile.homeAddress = data.homeAddress;
    borrowerProfile.emails = [data.email];
    borrowerProfile.phoneNumbers = [data.phoneNumber];

    (data as unknown as Borrower).borrowerProfile = borrowerProfile;

    const borrower = await this.borrowerRepository.create({
      data: data
    });

    const result = await this.borrowerRepository.findOne({
      filter: { borrowerId: borrower.borrowerId },
      relations: ['borrowerProfile']
    });

    if (!result) {
      throw new Error('Failed to find the registered borrower');
    }

    const gender = data.gender;
    let checkGender = '';
    if (gender === 'MALE') {
      checkGender = 'ông';
    } else if (gender === 'FEMALE') checkGender = 'bà';

    const emailContent = createEmailContent(checkGender, data.fullname);
    console.log(emailContent);

    sendEmail({
      from: { name: 'Công ty Alpha' },
      to: { emailAddress: [result.email] },
      subject: 'Chúc mừng đăng ký tài khoản thành công',
      text: emailContent
    });
    return convertToDto(RegisterBorrowerRes, result);
  }
  async login(data: LoginBorrowerReq): Promise<LoginBorrowerRes> {
    // const isCaptchaValid = await this.verifyCaptcha(data.captchaToken);
    // if (!isCaptchaValid) {
    //   throw new Error('Invalid CAPTCHA. Please try again.');
    // }
    let borrower: Borrower | null = null;

    if (/^\d{10,11}$/.test(data.emailOrPhoneNumber)) {
      borrower = await this.borrowerRepository.findOne({
        filter: { phoneNumber: data.emailOrPhoneNumber }
      });
    } else {
      borrower = await this.borrowerRepository.findOne({
        filter: { email: data.emailOrPhoneNumber }
      });
    }

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, borrower!.password);

    if (!isPasswordValid) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const claim = new JwtClaimDto(borrower.borrowerId, '', [], '');

    const token = jwt.sign(_.toPlainObject(claim), SECRET_KEY, {
      expiresIn: 4 * 60 * 60
    });

    const result = convertToDto(LoginBorrowerRes, borrower);
    result.token = token;

    return result;
  }
  async forgotPassword(data: ForgotPasswordReq): Promise<void> {
    let borrower: Borrower | null = null;

    if (/^\d{10,11}$/.test(data.emailOrPhoneNumber)) {
      borrower = await this.borrowerRepository.findOne({ filter: { phoneNumber: data.emailOrPhoneNumber } });
    } else {
      borrower = await this.borrowerRepository.findOne({ filter: { email: data.emailOrPhoneNumber } });
    }

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${borrower.email}`, otp, 'EX', 300);

    const emailContent = createEmailOtpContent(otp);
    sendEmail({
      from: { name: 'Công ty Alpha' },
      to: { emailAddress: [borrower.email] },
      subject: 'OTP for Password Reset',
      text: emailContent
    });
  }
  async verifyOtp(email: string, inputOtp: string): Promise<VerifyOtpRes> {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== inputOtp) {
      throw new Error('Invalid OTP');
    }
    return { message: 'OTP verified successfully' };
  }

  async resetPassword(email: string, inputOtp: string, requestBody: ResetPasswordReq): Promise<ResetPasswordRes> {
    const storedOtp = await redis.get(`otp:${email}`);

    if (!storedOtp || storedOtp !== inputOtp) {
      throw new Error('Invalid OTP');
    }

    await redis.del(`otp:${email}`);

    const { newPassword, confirmPassword } = requestBody;

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const borrower = await this.borrowerRepository.findOne({ filter: { email } });
    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    borrower.password = hashedPassword;

    await this.borrowerRepository.findOneAndUpdate({
      filter: { borrowerId: borrower.borrowerId },
      updateData: borrower
    });

    const response = new ResetPasswordRes();
    response.borrowerId = borrower.borrowerId;
    response.message = 'Password has been reset successfully.';
    return response;
  }

  async getProfile(borrowerId: string): Promise<GetProfileRes> {
    const borrower = await this.borrowerRepository.findOne({
      filter: { borrowerId },
      relations: ['borrowerProfile']
    });

    if (!borrower || !borrower.borrowerProfile) {
      throw new Error('Borrower profile not found');
    }

    return borrower.borrowerProfile;
  }
}
