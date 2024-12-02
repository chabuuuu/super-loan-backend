import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { LoginEmployeeReq } from '@/dto/employee/login-employee.req';
import { SearchDataDto } from '@/dto/search-data.dto';
import { Employee } from '@/models/employee.model';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { ITYPES } from '@/types/interface.types';
import { getClientInfo } from '@/utils/get-client-info.util';
import { getSearchData } from '@/utils/get-search-data.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class EmployeeController {
  public common: IBaseCrudController<Employee>;
  private employeeService: IEmployeeService<Employee>;
  constructor(
    @inject('EmployeeService') employeeService: IEmployeeService<Employee>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Employee>
  ) {
    this.employeeService = employeeService;
    this.common = common;
  }

  /**
   * * GET /api/employees/by-role/:roleId
   */
  async getEmployeesByRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = req.params.roleId;
      const searchData: SearchDataDto = getSearchData(req);
      const result = await this.employeeService.getEmployeesByRole(roleId, searchData);

      res.send_ok('Employees fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/employees/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginEmployeeReq = req.body;
      const clientInfo = await getClientInfo(req);
      const result = await this.employeeService.login(data, clientInfo);
      return res.send_ok('Login successful', result);
    } catch (error) {
      next(error);
    }
  }
}
