import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Permission } from './permission.model';
import { Employee } from './employee.model';

@Entity('permission_specifics')
export class PermissionSpecific extends BaseModel {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userID!: string;

  @PrimaryColumn('uuid', { name: 'permission_id' })
  permissionID!: string;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: Employee;

  @ManyToOne(() => Permission, { nullable: false })
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;

  @Column('varchar', { length: 50, name: 'user_type' })
  userType!: string;

  @Column('varchar', { length: 255, name: 'permission_types' })
  permissionTypes!: string;

  @Column('text', { nullable: true, name: 'notes' })
  notes!: string | null;
}
