import { Role } from '@/models/role.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class RoleRepository extends BaseRepository<Role> implements IRoleRepository<Role> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Role));
  }
}
