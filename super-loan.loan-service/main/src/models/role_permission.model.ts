import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Role } from './role.model';
import { Permission } from './permission.model';

@Entity('role_permissions')
export class RolePermission extends BaseModel {
  @PrimaryColumn('uuid', { name: 'role_id' })
  roleId!: string;

  @PrimaryColumn('uuid', { name: 'permission_id' })
  permissionId!: string;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => Permission, { nullable: false })
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;

  @Column('varchar', { length: 255, name: 'permission_types' })
  permissionTypes!: string;

  @Column('text', { nullable: true, name: 'notes' })
  notes!: string | null;
}
