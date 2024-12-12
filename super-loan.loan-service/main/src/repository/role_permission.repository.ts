import { RolePermission } from '@/models/role_permission.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IRolePermissionRepository } from '@/repository/interface/i.role_permission.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class RolePermissionRepository
  extends BaseRepository<RolePermission>
  implements IRolePermissionRepository<RolePermission>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(RolePermission));
  }
}
