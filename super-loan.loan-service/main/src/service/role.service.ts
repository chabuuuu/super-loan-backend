import { Role } from '@/models/role.model';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IRoleService } from '@/service/interface/i.role.service';
import { inject, injectable } from 'inversify';

@injectable()
export class RoleService extends BaseCrudService<Role> implements IRoleService<Role> {
  private roleRepository: IRoleRepository<Role>;

  constructor(@inject('RoleRepository') roleRepository: IRoleRepository<Role>) {
    super(roleRepository);
    this.roleRepository = roleRepository;
  }
}
