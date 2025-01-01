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
import { UpdateProfileReq } from '@/dto/borrower/update-profile.req';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { PermissionSpecific } from '@/models/permission_specific.model';
import { UserTypeEnum } from '@/enums/user-type.enum';
import { RoleTypeEnum } from '@/enums/role-type.enum';
import { ClientInfoDto } from '@/dto/client-info.dto';
import { INotificationService } from '@/service/interface/i.notification.service';
import { Notification } from '@/models/notification.model';
import { NotificationType } from '@/enums/notification-type.enum';
import { IBorrowerProfileRepository } from '@/repository/interface/i.borrower_profile.repository';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { GetAllBorrowerRes } from '@/dto/borrower/get-all-borrower.res';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import moment from 'moment';
import { employeeRepostitory } from '@/container/employee.container';
import { IRolePermissionRepository } from '@/repository/interface/i.role_permission.repository';
import { RolePermission } from '@/models/role_permission.model';
import { SearchDataDto } from '@/dto/search-data.dto';
import { SearchUtil } from '@/utils/search.util';
const SECRET_KEY: any = process.env.SECRET_KEY;

@injectable()
export class BorrowerService extends BaseCrudService<Borrower> implements IBorrowerService<Borrower> {
  //Inject
  private borrowerRepository: IBorrowerRepository<Borrower>;
  private permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>;
  private notificationService: INotificationService<Notification>;
  private borrowerProfileRepository: IBorrowerProfileRepository<BorrowerProfile>;
  private rolePermissionRepository: IRolePermissionRepository<RolePermission>;

  //Constant
  private LOGIN_TOKEN_EXPIRE = 4 * 60 * 60;

  constructor(
    @inject('BorrowerRepository') borrowerRepository: IBorrowerRepository<Borrower>,
    @inject('RolePermissionRepository') rolePermissionRepository: IRolePermissionRepository<RolePermission>,
    @inject('PermissionSpecificRepository')
    permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>,
    @inject('NotificationService') notificationService: INotificationService<Notification>,
    @inject('BorrowerProfileRepository') borrowerProfileRepository: IBorrowerProfileRepository<BorrowerProfile>
  ) {
    super(borrowerRepository);
    this.borrowerRepository = borrowerRepository;
    this.permissionSpecificRepository = permissionSpecificRepository;
    this.notificationService = notificationService;
    this.borrowerProfileRepository = borrowerProfileRepository;
    this.rolePermissionRepository = rolePermissionRepository;
  }

  /**
   * * Logout Borrower
   * @param userId
   */
  async logout(userId: string): Promise<void> {
    /*
    Set token logout time => check token logout time when authenticate
    And if token logout time >= token iat => not allow access
    Also set expire time for this key to make sure that the token will be deleted after a period of time = token expire time
    */
    const currentTimeStamp = moment().unix();

    await redis.set(`${RedisSchemaEnum.logoutTokenTime}:${userId}`, currentTimeStamp, 'EX', this.LOGIN_TOKEN_EXPIRE);

    return;
  }

  async search(searchData: SearchDataDto): Promise<PagingResponseDto<Borrower>> {
    const { where, order, paging } = SearchUtil.getWhereCondition(searchData);

    const borrowers = await this.borrowerRepository.findMany({
      filter: where,
      order: order,
      paging: paging,
      relations: ['borrowerProfile']
    });

    //Remove password field
    borrowers.forEach((borrower) => {
      delete (borrower as any).password;
    });

    const total = await this.borrowerRepository.count({
      filter: where
    });

    return new PagingResponseDto(total, borrowers);
  }

  async getAll(paging: PagingDto): Promise<PagingResponseDto<GetAllBorrowerRes>> {
    const borrowers = await this.borrowerRepository.findMany({
      relations: ['contracts', 'borrowerProfile'],
      paging: paging,
      select: {
        borrowerId: true,
        email: true,
        phoneNumber: true,
        borrowerProfile: {
          income: true,
          debtStatus: true
        },
        createAt: true
      }
    });

    console.log(borrowers);

    const result = new Array<GetAllBorrowerRes>();

    //Gắn số lượng hợp đồng
    for (const borrower of borrowers) {
      const contracts = await borrower.contracts;
      (borrower as unknown as any).numberOfContracts = contracts.length;

      result.push(convertToDto(GetAllBorrowerRes, borrower));
    }

    const total = await this.borrowerRepository.count({ filter: {} });

    return {
      items: result,
      total
    };
  }

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
    borrowerProfile.personalEmail = data.email;
    borrowerProfile.phoneNumber = data.phoneNumber;

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

    const admins = await employeeRepostitory.findMany({
      filter: {
        roleId: RoleTypeEnum.ADMIN
      }
    });

    //Send notification register success
    this.notificationService.sendWhenRegisterBorrowerSuccess(data.fullname, admins);

    return convertToDto(RegisterBorrowerRes, result);
  }

  async login(data: LoginBorrowerReq, clientInfo: ClientInfoDto): Promise<LoginBorrowerRes> {
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

    const rolePermission = await this.rolePermissionRepository.findMany({
      filter: {
        roleId: RoleTypeEnum.BORROWER
      }
    });

    const borrowerSpecificPermissions = await this.permissionSpecificRepository.findMany({
      filter: {
        userId: borrower.borrowerId,
        userType: UserTypeEnum.BORROWER
      }
    });

    const specificPermissionIds = borrowerSpecificPermissions!.map((permission) => permission.permissionId) || [''];

    const rolePermissionIds = rolePermission!.map((permission) => permission.permissionId) || [''];

    //Merge specificPermissionIds and rolePermissionIds

    const permissionIds = _.union(specificPermissionIds, rolePermissionIds);

    const claim = new JwtClaimDto(borrower.borrowerId, '', permissionIds, RoleTypeEnum.BORROWER);

    const token = jwt.sign(_.toPlainObject(claim), SECRET_KEY, {
      expiresIn: this.LOGIN_TOKEN_EXPIRE
    });

    const result = convertToDto(LoginBorrowerRes, borrower);
    result.token = token;

    //Send notification login success
    this.notificationService.sendWhenLoggedIn(clientInfo, UserTypeEnum.BORROWER, borrower.borrowerId);

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

    //Logout after reset password
    await this.logout(borrower.borrowerId);

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

  async updateProfile(borrowerId: string, updateData: UpdateProfileReq): Promise<GetProfileRes> {
    const updatedBorrower = await this.borrowerRepository.findOne({
      filter: { borrowerId },
      relations: ['borrowerProfile']
    });

    if (!updatedBorrower || !updatedBorrower.borrowerProfile) {
      throw new Error('Borrower profile not found');
    }

    const borrowerUpdatePayload: Partial<Borrower> = {
      email: updateData.personalEmail
    };

    const borrowerProfileUpdatePayload: Partial<BorrowerProfile> = {
      fullname: updateData.fullname,
      avatar: updateData.avatar,
      personalEmail: updateData.personalEmail,
      workEmail: updateData.workEmail,
      jobTitle: updateData.jobTitle,
      income: updateData.income,
      identifyCardNumber: updateData.identifyCardNumber,
      identifyCardIssuedDate: updateData.identifyCardIssuedDate
        ? new Date(updateData.identifyCardIssuedDate)
        : undefined,
      identifyCardIssuedPlace: updateData.identifyCardIssuedPlace,
      borrowerIncomeProofDocuments: updateData.borrowerIncomeProofDocuments,
      homeAddress: updateData.homeAddress,
      workAddress: updateData.workAddress,
      birthday: updateData.birthday ? new Date(updateData.birthday) : undefined,
      gender: updateData.gender,
      socialLink: updateData.socialLink,
      bankAccounts: updateData.bankAccounts?.map((account) => ({
        bankId: account.bankId,
        accountNumber: account.accountNumber,
        bankName: account.bankName,
        isDefault: account.isDefault ?? false
      })),
      signAttachments: updateData.signAttachments
    };

    Object.keys(borrowerProfileUpdatePayload).forEach(
      (key) =>
        borrowerProfileUpdatePayload[key as keyof BorrowerProfile] === undefined &&
        delete borrowerProfileUpdatePayload[key as keyof BorrowerProfile]
    );

    await this.borrowerRepository.findOneAndUpdate({
      filter: { borrowerId },
      updateData: borrowerUpdatePayload
    });

    await this.borrowerProfileRepository.findOneAndUpdate({
      filter: { borrowerId },
      updateData: borrowerProfileUpdatePayload
    });

    const updatedProfile = await this.borrowerRepository.findOne({
      filter: { borrowerId },
      relations: ['borrowerProfile']
    });

    return updatedProfile!.borrowerProfile;
  }
}
