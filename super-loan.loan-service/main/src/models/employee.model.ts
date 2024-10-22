import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Role } from './role.model';
import { EmployeeProfile } from './employee_profile.model';
import { Appraisal } from './appraisal.model';
import { StatusContract } from './status_contract.model';
import { PermissionSpecific } from './permission_specific.model';

@Entity('employees')
export class Employee extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
  employeeId!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  email!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15, name: 'phone_number' })
  phoneNumber!: string;

  @Column('varchar', { length: 100 })
  password!: string;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn()
  role!: Role;

  @OneToOne(() => EmployeeProfile, (employee_profile) => employee_profile.employeeId)
  employeeProfile!: EmployeeProfile;

  @OneToMany(() => Appraisal, (appraisal) => appraisal.appraisalStaff)
  appraisals!: Promise<Appraisal[]>;

  @OneToMany(() => PermissionSpecific, (permission_specific) => permission_specific.user)
  permissionSpecifics!: Promise<PermissionSpecific[]>;

  @Column('varchar', { length: 30 })
  status!: string;
}
