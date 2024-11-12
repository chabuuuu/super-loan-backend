import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, Index, OneToOne, PrimaryColumn } from 'typeorm';
import { Borrower } from './borrower.model';
import { BaseModel } from './base.model';

export enum IdentifyCardIssuedPlace {
  RESIDENCE_REGISTRY = 'RESIDENCE_REGISTRY',
  ADMINISTRATIVE_POLICE = 'ADMINISTRATIVE_POLICE'
}

@Entity('borrower_profiles')
export class BorrowerProfile extends BaseModel {
  @PrimaryColumn({
    name: 'borrower_id'
  })
  borrowerId!: string;

  @OneToOne(() => Borrower, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'borrower_id' })
  borrower!: Borrower;

  @Column('varchar', { length: 100 })
  fullname!: string;

  @Column('text', { nullable: true })
  avatar?: string;

  // @Index({ unique: true })
  @Column('simple-array')
  emails!: string[];

  // @Index({ unique: true })
  @Column('simple-array', { name: 'phone_number' })
  phoneNumbers!: string[];

  @Column('varchar', { length: 100, name: 'job_tittle', nullable: true })
  jobTitle?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  income?: number;

  @Column('varchar', { length: 50, name: 'identify_card_number', nullable: true })
  identifyCardNumber?: string;

  @Column('date', { name: 'identify_card_issued_date', nullable: true })
  identifyCardIssuedDate?: Date;

  @Column({
    type: 'enum',
    enum: IdentifyCardIssuedPlace,
    nullable: true,
    name: 'identify_card_issued_place'
  })
  identifyCardIssuedPlace?: string;

  @Column('simple-array', { nullable: true, name: 'borrower_income_proof_documents' })
  borrowerIncomeProofDocuments!: string[];

  @Column('varchar', { length: 255, name: 'home_address' })
  homeAddress!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'work_address' })
  workAddress!: string;

  @Column('date')
  birthday!: Date;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'], default: 'MALE' })
  gender!: 'MALE' | 'FEMALE';

  @Column('varchar', { length: 255, nullable: true, name: 'social_link' })
  socialLink!: string;

  @Column('jsonb', { nullable: true, name: 'bank_accounts' })
  bankAccounts!: { accountNumber: string; bankName: string; isDefault: boolean }[];

  @Column('varchar', { length: 255, nullable: true, name: 'sign_attachments' })
  signAttachments!: string[];
}
