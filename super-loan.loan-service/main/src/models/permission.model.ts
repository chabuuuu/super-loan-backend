import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { RolePermission } from './role_permission.model';
import { PermissionSpecific } from './permission_specific.model';

@Entity('permissions')
export class Permission extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'permission_id' })
  permissionId!: string;

  @Column('varchar', { length: 255, name: 'subject' })
  subject!: string;

  @OneToMany(() => RolePermission, (role_permission) => role_permission.permission)
  rolePermissions!: RolePermission[];

  @OneToMany(() => PermissionSpecific, (permission_specific) => permission_specific.permission)
  permissionSpecifics!: PermissionSpecific[];
}
