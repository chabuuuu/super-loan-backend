import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';

@Entity('employee_profiles')
export class EmployeeProfile extends BaseModel {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId!: string;

  @OneToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column({ type: 'text' })
  avatar!: string;

  @Column('simple-array')
  emails!: string[];

  @Column('simple-array', { name: 'phone_numbers' })
  phoneNumbers!: string[];

  @Column('varchar', { length: 100 })
  fullname!: string;

  @Column('varchar', { length: 50, name: 'identify_card_number' })
  identifyCardNumber!: string;

  @Column('varchar', { length: 255, name: 'home_address' })
  homeAddress!: string;

  @Column('date')
  birthday!: Date;

  @Column('varchar', { length: 10 })
  gender!: string;

  @Column('varchar', { length: 255, name: 'social_link' })
  socialLink!: string;

  @Column('simple-array', { name: 'sign_attachments' })
  signAttachments!: string[];
}
