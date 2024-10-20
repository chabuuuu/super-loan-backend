import { injectable } from 'inversify';
import { Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';
import { RolePermission } from './role_permission.model';

@injectable()
@Entity('roles')
export class Role extends BaseModel {
  @PrimaryColumn({
    type: 'varchar',
    length: 70,
    name: 'role_id'
  })
  roleId!: string;

  @Column('varchar', { length: 90, name: 'role_name' })
  roleName!: string;

  // @OneToMany(() => Employee, (employee) => employee.role)
  // employees!: Employee[];

  @OneToMany(() => RolePermission, (role_permission) => role_permission.role)
  rolePermissions!: RolePermission[];
}
