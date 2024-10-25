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
import { ResetPasswordReq } from '@/dto/borrower/resetPassword-borrower.req';
import { ResetPasswordRes } from '@/dto/borrower/resetPassword-borrower.res';
import { ForgotPasswordReq } from '@/dto/borrower/forgotPassword-borrower.req';
import { ForgotPasswordRes } from '@/dto/borrower/forgotPassword-borrwer.res';
import { VerifyOtpRes } from '@/dto/borrower/verifyOtp-borrower.res';
import { sendEmail } from '@/utils/email/email-sender.util';
import axios from 'axios';
import { createEmailContent } from '@/utils/email/create-email-content.util';
const SECRET_KEY: any = process.env.SECRET_KEY;

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  private borrowerRepository: IBorrowerRepository<Borrower>;

  constructor(@inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
  }
  forgotPassword(requestBody: ForgotPasswordReq): Promise<ForgotPasswordRes> {
    throw new Error('Method not implemented.');
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
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ borrowerId: borrower!.borrowerId }, SECRET_KEY, {
      expiresIn: 4 * 60 * 60
    });

    const result = convertToDto(LoginBorrowerRes, borrower);
    result.token = token;

    return result;
  }
  async verifyOtp(email: string, inputOtp: string): Promise<VerifyOtpRes> {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp) {
      throw new Error('Invalid OTP');
    }

    if (storedOtp === inputOtp) {
      return { message: 'OTP verified successfully' };
    } else {
      throw new Error('Invalid OTP');
    }
  }

  async resetPassword(requestBody: ResetPasswordReq): Promise<ResetPasswordRes> {
    const { email, newPassword } = requestBody;

    const borrower = await this.borrowerRepository.findOne({
      filter: { email }
    });

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    borrower.password = hashedPassword;

    await this.borrowerRepository.findOneAndUpdate({
      filter: {
        borrowerId: borrower.borrowerId
      },
      updateData: borrower
    });

    const response = new ResetPasswordRes();
    response.borrowerId = borrower.borrowerId;
    response.message = 'Password has been reset successfully.';

    return response;
  }
}
