import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CreateEmployeeReq } from '@/dto/employee/create-employee.req';
import { LoginEmployeeReq } from '@/dto/employee/login-employee.req';
import { UpdateEmployeeReq } from '@/dto/employee/update-employee.req';
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
   * * PUT /api/employees/:id
   */
  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data: UpdateEmployeeReq = req.body;
      const result = await this.employeeService.updateEmployee(id, data);
      res.send_ok('Employee updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/employees/:id
   */
  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.employeeService.findOne({
        filter: {
          employeeId: id
        },
        relations: ['employeeProfile']
      });

      //Delete field password
      delete (result as any).password;

      res.send_ok('Employee fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/employees
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateEmployeeReq = req.body;
      const result = await this.employeeService.createNewEmployee(data);
      res.send_ok('Employee created successfully', result);
    } catch (error) {
      next(error);
    }
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
   * * GET /api/employees/search
   */
  async searchEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const searchData: SearchDataDto = getSearchData(req);
      const result = await this.employeeService.search(searchData);
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

  /**
   * * GET /api/employees/get-profile
   */
  async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      let result = await this.employeeService.findOne({
        filter: {
          employeeId: user!.id
        },
        relations: ['employeeProfile']
      });

      //Merge employee.employeeProfile to employee
      if (result?.employeeProfile) {
        result = {
          ...result,
          ...result.employeeProfile
        };
      }

      //Delete sensitive field
      delete (result as any).password;
      delete (result as any).employeeProfile;

      res.send_ok('Profile fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
