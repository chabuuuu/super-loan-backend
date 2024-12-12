import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { RolePermission } from '@/models/role_permission.model';
import { IRolePermissionService } from '@/service/interface/i.role_permission.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RolePermissionController {
  public common: IBaseCrudController<RolePermission>;
  private rolePermissionService: IRolePermissionService<RolePermission>;
  constructor(
    @inject('RolePermissionService') rolePermissionService: IRolePermissionService<RolePermission>,
    @inject(ITYPES.Controller) common: IBaseCrudController<RolePermission>
  ) {
    this.rolePermissionService = rolePermissionService;
    this.common = common;
  }
}
