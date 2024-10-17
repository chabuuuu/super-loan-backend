import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { Borrower } from './borrower.model';
import { BaseModel } from './base.model';

@Entity('borrower_profiles')
export class BorrowerProfile extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Borrower, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'borrower_id' })
  borrower!: Borrower;

  @Column('varchar', { length: 255 })
  fullname!: string;

  @Column('varchar', { length: 255 })
  avatar!: string;

  @Index({ unique: true })
  @Column('simple-array')
  emails!: string[];

  @Index({ unique: true })
  @Column('simple-array', { name: 'phone_number' })
  phoneNumbers!: string[];

  @Index({ unique: true })
  @Column('varchar', { length: 100, name: 'job_tittle' })
  jobTitle!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  income!: number;

  @Column('varchar', { length: 20, name: 'identify_card_number' })
  identifyCardNumber!: string;

  @Column('date', { name: 'identify_card_issued_date' })
  identifyCardIssuedDate!: Date;

  @Column('varchar', { length: 255, name: 'identify_card_issued_place' })
  identifyCardIssuedPlace!: string;

  @Column('varchar', { length: 255, name: 'home_address' })
  homeAddress!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'work_address' })
  workAddress!: string;

  @Column('date')
  birthday!: Date;

  @Column('varchar', { length: 10 })
  gender!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'social_link' })
  socialLink!: string;

  @Column('simple-array', { nullable: true, name: 'bank_accounts' })
  bankAccounts!: { accountNumber: string; bankName: string; isDefault: boolean }[];

  @Column('varchar', { length: 255, nullable: true, name: 'sign_attachments' })
  signAttachments!: string[];
}
