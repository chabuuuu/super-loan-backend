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
  @OneToMany(() => Employee, (employee) => employee.role)
  @OneToMany(() => RolePermission, (role_permission) => role_permission.roleID)
  roleID!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  name!: string;

  @OneToMany(() => Account, (account) => account.role)
  accounts!: Account[];
}
