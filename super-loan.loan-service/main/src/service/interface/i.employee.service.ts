import { ClientInfoDto } from '@/dto/client-info.dto';
import { EmployeeGetByRoleRes } from '@/dto/employee/employee-get-by-role.res';
import { LoginEmployeeReq } from '@/dto/employee/login-employee.req';
import { LoginEmployeeRes } from '@/dto/employee/login-employee.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search-data.dto';
import { Employee } from '@/models/employee.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IEmployeeService<T extends BaseModelType> extends IBaseCrudService<T> {
  getEmployeesByRole(roleId: string, searchData: SearchDataDto): Promise<EmployeeGetByRoleRes>;
  login(data: LoginEmployeeReq, clientInfo: ClientInfoDto): Promise<LoginEmployeeRes>;
}
