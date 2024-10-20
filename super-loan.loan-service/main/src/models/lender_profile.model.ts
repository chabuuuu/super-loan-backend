import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, PrimaryColumn, OneToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { Lender } from './lender.model';

@Entity('lender_profiles')
export class LenderProfile extends BaseModel {
  @PrimaryColumn({ name: 'lender_id' })
  lenderId!: string;

  @OneToOne(() => Lender, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lender_id' })
  lender!: Lender;

  @Column('varchar', { length: 255, name: 'fullname' })
  fullname!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'avatar' })
  avatar!: string | null;

  @Column('varchar', { length: 100, nullable: true, name: 'job_title' })
  jobTitle!: string | null;

  @Column('simple-array', { nullable: true, name: 'emails' })
  emails!: string[] | null;

  @Column('simple-array', { nullable: true, name: 'phone_numbers' })
  phoneNumbers!: string[] | null;

  @Column('varchar', { length: 255, nullable: true, name: 'company_name' })
  companyName!: string | null;

  @Column('varchar', { length: 255, nullable: true, name: 'company_address' })
  companyAddress!: string | null;

  @Column('varchar', { length: 50, nullable: true, name: 'company_tax_code' })
  companyTaxCode!: string | null;

  @Column('json', { nullable: true, name: 'bank_accounts' })
  bankAccounts!: Array<{ account_number: string; bank_name: string; is_default: boolean }> | null;

  @Column('text', { nullable: true, name: 'description' })
  description!: string | null;

  @Column('varchar', { length: 255, nullable: true, name: 'social_link' })
  socialLink!: string | null;

  @Column('text', { nullable: true, name: 'sign' })
  sign!: string | null;
}
