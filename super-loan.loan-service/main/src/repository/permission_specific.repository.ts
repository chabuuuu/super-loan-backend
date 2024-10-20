import { PermissionSpecific } from '@/models/permission_specific.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PermissionSpecificRepository
  extends BaseRepository<PermissionSpecific>
  implements IPermissionSpecificRepository<PermissionSpecific>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(PermissionSpecific));
  }
}
