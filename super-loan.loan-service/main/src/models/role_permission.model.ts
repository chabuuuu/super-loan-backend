import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Role } from './role.model';
import { Permission } from './permission.model';

@Entity('role_permissions')
export class RolePermission extends BaseModel {
  @PrimaryColumn({ name: 'role_id' })
  roleId!: string;

  @PrimaryColumn({ name: 'permission_id' })
  permissionId!: string;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => Permission, { nullable: false })
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;
}
