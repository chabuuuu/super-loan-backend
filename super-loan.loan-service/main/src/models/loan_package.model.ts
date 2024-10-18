import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { VersionLoanPackage } from './version_loan_package.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';

@Entity('loan_packages')
export class LoanPackage extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @Column({ name: 'loan_package_id' })
  loanPackageId!: string;

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

  @OneToMany(() => VersionLoanPackage, (version_loan_package) => version_loan_package.loanPackage)
  versionLoanPackages!: VersionLoanPackage[];

  @OneToMany(() => LoanRequest, (loan_request) => loan_request.loanPackage)
  loanRequests!: LoanRequest[];

  @OneToMany(() => Contract, (contract) => contract.loanPackage)
  contracts!: Contract[];

  @OneToMany(
    () => TrackingContractInformation,
    (tracking_contract_information) => tracking_contract_information.loanPackageId
  )
  trackingContractInformations!: TrackingContractInformation[];
}
