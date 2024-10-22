import { PermissionSpecificController } from '@/controller/permission_specific.controller';
import { PermissionSpecificService } from '@/service/permission_specific.service';
import { PermissionSpecific } from '@/models/permission_specific.model';
import { PermissionSpecificRepository } from '@/repository/permission_specific.repository';
import { IPermissionSpecificService } from '@/service/interface/i.permission_specific.service';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { BaseContainer } from '@/container/base.container';

class PermissionSpecificContainer extends BaseContainer {
  constructor() {
    super(PermissionSpecific);
    this.container
      .bind<IPermissionSpecificService<PermissionSpecific>>('PermissionSpecificService')
      .to(PermissionSpecificService);
    this.container
      .bind<IPermissionSpecificRepository<PermissionSpecific>>('PermissionSpecificRepository')
      .to(PermissionSpecificRepository);
    this.container.bind<PermissionSpecificController>(PermissionSpecificController).toSelf();
  }

  export() {
    const permissionSpecificController = this.container.get<PermissionSpecificController>(PermissionSpecificController);
    const permissionSpecificService = this.container.get<IPermissionSpecificService<any>>('PermissionSpecificService');
    return { permissionSpecificController, permissionSpecificService };
  }
}

const permissionSpecificContainer = new PermissionSpecificContainer();
const { permissionSpecificController, permissionSpecificService } = permissionSpecificContainer.export();
export { permissionSpecificController, permissionSpecificService };
