import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoanPackage } from './loan_package.model';
import { BaseModel } from './base.model';

@Entity('version_loan_packages')
export class VersionLoanPackage extends BaseModel {
  @PrimaryColumn({ name: 'loan_package_id' })
  loanPackageId!: string;

  @ManyToOne(() => LoanPackage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'loan_package_id' })
  loanPackage!: LoanPackage;

  @PrimaryColumn('int')
  version!: number;

  @Column('varchar', { length: 255, name: 'loan_package_name' })
  loanPackageName!: string;

  @Column('decimal', { precision: 5, scale: 2, name: 'interest_rate' })
  interestRate!: number;

  @Column('varchar', { length: 50, name: 'loan_type' })
  loanType!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'limit_amount' })
  limitAmount!: number;

  @Column('int', { name: 'loan_term_limit' })
  loanTermLimit!: number;

  @Column('text', { nullable: true })
  preference!: string;

  @Column('text')
  terms!: string;

  @Column('text', { nullable: true })
  description!: string;
}
