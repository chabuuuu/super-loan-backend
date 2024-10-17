import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Role } from './role.model';
import { EmployeeProfile } from './employee_profile.model';
import { Appraisal } from './appraisal.model';
import { StatusContract } from './status_contract.model';
import { PermissionSpecific } from './permission_specific.model';

@Entity('employees')
export class Employee extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => EmployeeProfile, (employee_profile) => employee_profile.employee)
  @OneToMany(() => Appraisal, (appraisal) => appraisal.appraisalStaff)
  @OneToMany(() => StatusContract, (status_contract) => status_contract.employeeChange)
  @OneToMany(() => PermissionSpecific, (permission_specific) => permission_specific.user)
  @Column({ name: 'employee_id' })
  employeeID!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  email!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15, name: 'phone_number' })
  phoneNumber!: string;

  @Column('varchar', { length: 20 })
  password!: string;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({})
  role!: Role;

  @Column('varchar', { length: 30 })
  status!: string;
}
