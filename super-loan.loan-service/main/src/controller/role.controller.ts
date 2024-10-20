import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Role } from '@/models/role.model';
import { IRoleService } from '@/service/interface/i.role.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RoleController {
  public common: IBaseCrudController<Role>;
  private roleService: IRoleService<Role>;
  constructor(
    @inject('RoleService') roleService: IRoleService<Role>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Role>
  ) {
    this.roleService = roleService;
    this.common = common;
  }
}
