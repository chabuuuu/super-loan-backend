import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Permission } from './permission.model';
import { Employee } from './employee.model';
import { UserTypeEnum } from '@/enums/user-type.enum';

@Entity('permission_specifics')
export class PermissionSpecific extends BaseModel {
  @PrimaryColumn('varchar', { name: 'user_id' })
  userId!: string;

  @PrimaryColumn('varchar', { name: 'permission_id' })
  permissionId!: string;

  @ManyToOne(() => Permission, { nullable: false })
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;

  @Column({ type: 'enum', enum: UserTypeEnum, default: UserTypeEnum.EMPLOYEE })
  userType!: string;

  @Column('text', { nullable: true, name: 'notes' })
  notes!: string | null;
}
