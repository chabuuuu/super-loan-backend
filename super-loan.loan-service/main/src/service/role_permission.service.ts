import { RolePermission } from '@/models/role_permission.model';
import { IRolePermissionRepository } from '@/repository/interface/i.role_permission.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IRolePermissionService } from '@/service/interface/i.role_permission.service';
import { inject, injectable } from 'inversify';

@injectable()
export class RolePermissionService
  extends BaseCrudService<RolePermission>
  implements IRolePermissionService<RolePermission>
{
  private rolePermissionRepository: IRolePermissionRepository<RolePermission>;

  constructor(@inject('RolePermissionRepository') rolePermissionRepository: IRolePermissionRepository<RolePermission>) {
    super(rolePermissionRepository);
    this.rolePermissionRepository = rolePermissionRepository;
  }
}
