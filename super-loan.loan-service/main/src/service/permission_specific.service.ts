import { PermissionSpecific } from '@/models/permission_specific.model';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPermissionSpecificService } from '@/service/interface/i.permission_specific.service';
import { inject, injectable } from 'inversify';

@injectable()
export class PermissionSpecificService
  extends BaseCrudService<PermissionSpecific>
  implements IPermissionSpecificService<PermissionSpecific>
{
  private permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>;

  constructor(
    @inject('PermissionSpecificRepository')
    permissionSpecificRepository: IPermissionSpecificRepository<PermissionSpecific>
  ) {
    super(permissionSpecificRepository);
    this.permissionSpecificRepository = permissionSpecificRepository;
  }
}
