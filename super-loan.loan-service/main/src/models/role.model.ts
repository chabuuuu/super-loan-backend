import { Account } from '@/models/account.model';
import { injectable } from 'inversify';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';
import { RolePermission } from './role_permission.model';

@injectable()
@Entity('roles')
export class Role extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'role_id' })
  roleId!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30, name: 'role_name' })
  roleName!: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees!: Employee[];

  @OneToMany(() => RolePermission, (role_permission) => role_permission.role)
  rolePermissions!: RolePermission[];

  @OneToMany(() => Account, (account) => account.role)
  accounts!: Account[];
}
