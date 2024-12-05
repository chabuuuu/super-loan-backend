import { ClientInfoDto } from '@/dto/client-info.dto';
import { EmployeeGetByRoleRes } from '@/dto/employee/employee-get-by-role.res';
import { LoginEmployeeReq } from '@/dto/employee/login-employee.req';
import { LoginEmployeeRes } from '@/dto/employee/login-employee.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search-data.dto';
import { EmployeeStatus } from '@/enums/employee-status.enum';
import { Employee } from '@/models/employee.model';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { SearchUtil } from '@/utils/search.util';
import { inject, injectable, LazyServiceIdentifier } from 'inversify';
import { MoreThanOrEqual } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { PermissionSpecific } from '@/models/permission_specific.model';
import { UserTypeEnum } from '@/enums/user-type.enum';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { RoleTypeEnum } from '@/enums/role-type.enum';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { INotificationService } from '@/service/interface/i.notification.service';
import { Notification } from '@/models/notification.model';

const SECRET_KEY: any = process.env.SECRET_KEY;

@injectable()
export class EmployeeService extends BaseCrudService<Employee> implements IEmployeeService<Employee> {
  private employeeRepository: IEmployeeRepository<Employee>;
  private permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>;
  private notificationService: INotificationService<Notification>;

  //Constant
  private LOGIN_TOKEN_EXPIRE = 4 * 60 * 60;

  constructor(
    @inject('NotificationService')
    notificationService: INotificationService<Notification>,
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>,
    @inject('PermissionSpecificRepository')
    permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>
  ) {
    super(employeeRepository);
    this.employeeRepository = employeeRepository;
    this.permissionSpecificRepository = permissionSpecificRepository;
    this.notificationService = notificationService;
  }

  async login(data: LoginEmployeeReq, clientInfo: ClientInfoDto): Promise<LoginEmployeeRes> {
    let employee: Employee | null = null;

    if (/^\d{10,11}$/.test(data.emailOrPhoneNumber)) {
      employee = await this.employeeRepository.findOne({
        filter: { phoneNumber: data.emailOrPhoneNumber }
      });
    } else {
      employee = await this.employeeRepository.findOne({
        filter: { email: data.emailOrPhoneNumber }
      });
    }

    if (!employee) {
      throw new Error('Employee not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, employee!.password);

    if (!isPasswordValid) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const employeePermissions = await this.permissionSpecificRepository.findMany({
      filter: {
        userId: employee.employeeId,
        userType: UserTypeEnum.EMPLOYEE
      }
    });

    const permissionIds = employeePermissions!.map((permission) => permission.permissionId) || [''];

    const claim = new JwtClaimDto(employee.employeeId, '', permissionIds, employee.roleId);

    const token = jwt.sign(_.toPlainObject(claim), SECRET_KEY, {
      expiresIn: this.LOGIN_TOKEN_EXPIRE
    });

    const result = convertToDto(LoginEmployeeRes, employee);
    result.token = token;

    //Send notification login success
    this.notificationService.sendWhenLoggedIn(clientInfo, UserTypeEnum.EMPLOYEE, employee.employeeId);

    return result;
  }

  async getEmployeesByRole(roleId: string, searchData: SearchDataDto): Promise<EmployeeGetByRoleRes> {
    const { where, order, paging } = SearchUtil.getWhereCondition(searchData);

    const employees = await this.employeeRepository.findMany({
      filter: where,
      order: order,
      paging: paging,
      relations: ['employeeProfile']
    });

    const total = await this.employeeRepository.count({
      filter: where
    });

    const totalBlockedEmployee = await this.employeeRepository.count({
      filter: {
        status: EmployeeStatus.BLOCKED
      }
    });

    //Total employee that have been created from 3 days ago
    const totalNewEmployee = await this.employeeRepository.totalNewEmployee();

    return {
      total: total,
      items: employees,
      counts: {
        totalEmployee: total,
        totalBlockedEmployee: totalBlockedEmployee,
        totalNewEmployee: totalNewEmployee
      }
    };
  }
}
