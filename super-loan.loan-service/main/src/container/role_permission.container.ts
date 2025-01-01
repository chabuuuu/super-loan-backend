import { RolePermissionController } from '@/controller/role_permission.controller';
import { RolePermissionService } from '@/service/role_permission.service';
import { RolePermission } from '@/models/role_permission.model';
import { RolePermissionRepository } from '@/repository/role_permission.repository';
import { IRolePermissionService } from '@/service/interface/i.role_permission.service';
import { IRolePermissionRepository } from '@/repository/interface/i.role_permission.repository';
import { BaseContainer } from '@/container/base.container';

class RolePermissionContainer extends BaseContainer {
  constructor() {
    super(RolePermission);
    this.container.bind<IRolePermissionService<RolePermission>>('RolePermissionService').to(RolePermissionService);
    this.container
      .bind<IRolePermissionRepository<RolePermission>>('RolePermissionRepository')
      .to(RolePermissionRepository);
    this.container.bind<RolePermissionController>(RolePermissionController).toSelf();
  }

  export() {
    const rolePermissionController = this.container.get<RolePermissionController>(RolePermissionController);
    const rolePermissionService = this.container.get<IRolePermissionService<any>>('RolePermissionService');
    const rolePermissionRepository = this.container.get<IRolePermissionRepository<any>>('RolePermissionRepository');

    return { rolePermissionController, rolePermissionService, rolePermissionRepository };
  }
}

const rolePermissionContainer = new RolePermissionContainer();
const { rolePermissionController, rolePermissionService, rolePermissionRepository } = rolePermissionContainer.export();
export { rolePermissionController, rolePermissionService, rolePermissionRepository };
