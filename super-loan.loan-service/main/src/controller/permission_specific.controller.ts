import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PermissionSpecific } from '@/models/permission_specific.model';
import { IPermissionSpecificService } from '@/service/interface/i.permission_specific.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PermissionSpecificController {
  public common: IBaseCrudController<PermissionSpecific>;
  private permissionSpecificService: IPermissionSpecificService<PermissionSpecific>;
  constructor(
    @inject('PermissionSpecificService') permissionSpecificService: IPermissionSpecificService<PermissionSpecific>,
    @inject(ITYPES.Controller) common: IBaseCrudController<PermissionSpecific>
  ) {
    this.permissionSpecificService = permissionSpecificService;
    this.common = common;
  }
}
