import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';

@Entity('employee_profiles')
export class EmployeeProfile extends BaseModel {
  @PrimaryColumn('uuid')
  @OneToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employeeId!: Employee;

  @Column({ type: 'text', length: 255 })
  avatar!: string;

  @Index({ unique: true })
  @Column('simple-array')
  emails!: string[];

  @Index({ unique: true })
  @Column('simple-array', { name: 'phone_numbers' })
  phoneNumbers!: string[];

  @Column('varchar', { length: 255 })
  fullname!: string;

  @Column('varchar', { length: 20, name: 'identify_card_number' })
  identifyCardNumber!: string;

  @Column('varchar', { length: 255, name: 'home_address' })
  homeAddress!: string;

  @Column('date')
  birthday!: Date;

  @Column('varchar', { length: 10 })
  gender!: string;

  @Column('varchar', { length: 255, name: 'social_link' })
  socialLink!: string;

  @Column('varchar', { length: 255, name: 'sign_attachments' })
  signAttachments!: string;
}
