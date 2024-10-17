import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';

@Entity('employee_profiles')
export class EmployeeProfile extends BaseModel {
  @PrimaryColumn('uuid')
  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee;

  @Column('varchar', { length: 20 })
  avatar!: string;

  @Index({ unique: true })
  @Column('simple-array')
  emails!: string[];

  @Index({ unique: true })
  @Column('simple-array', { name: 'phone_numbers' })
  phoneNumbers!: string[];

  @Column('varchar', { length: 255 })
  fullname!: string;

  @Column('varchar', { length: 20 })
  identify_card_number!: string;

  @Column('varchar', { length: 255 })
  home_address!: string;

  @Column('date')
  birthday!: Date;

  @Column('varchar', { length: 10 })
  gender!: string;

  @Column('varchar', { length: 255 })
  social_link!: string;

  @Column('varchar', { length: 255 })
  sign_attachments!: string;
}
