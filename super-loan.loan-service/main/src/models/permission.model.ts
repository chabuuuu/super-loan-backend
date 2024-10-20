import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { RolePermission } from './role_permission.model';
import { PermissionSpecific } from './permission_specific.model';

@Entity('permissions')
export class Permission extends BaseModel {
  @PrimaryColumn({ name: 'permission_id' })
  permissionId!: string;

  @Column('varchar', { length: 255, name: 'description' })
  description!: string;

  @OneToMany(() => RolePermission, (role_permission) => role_permission.permission)
  rolePermissions!: RolePermission[];

  @OneToMany(() => PermissionSpecific, (permission_specific) => permission_specific.permission)
  permissionSpecifics!: PermissionSpecific[];
}
