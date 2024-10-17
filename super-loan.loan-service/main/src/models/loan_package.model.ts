import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { VersionLoanPackage } from './version_loan_package.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';

@Entity('loan_packages')
export class LoanPackage extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => VersionLoanPackage, (version_loan_package) => version_loan_package.loanPackage)
  @OneToMany(() => LoanRequest, (loan_request) => loan_request.loanPackage)
  @OneToMany(() => Contract, (contract) => contract.loanPackage)
  @OneToMany(
    () => TrackingContractInformation,
    (tracking_contract_information) => tracking_contract_information.loanPackageID
  )
  @Column({ name: 'loan_package_id' })
  loanPackageID!: string;

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
