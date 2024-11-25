import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { VersionLoanPackage } from './version_loan_package.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';

export enum LoanType {
  UNSECURED_LOAN = 'UNSECURED_LOAN',
  MORTGAGE_LOAN = 'MORTGAGE_LOAN'
}

@Entity('loan_packages')
export class LoanPackage extends BaseModel {
  @PrimaryColumn({ name: 'loan_package_id' })
  loanPackageId!: string;

  @Column('varchar', { length: 255, name: 'loan_package_name' })
  loanPackageName!: string;

  @Column('float', { name: 'interest_rate' })
  interestRate!: number;

  @Column({ type: 'enum', enum: LoanType, name: 'loan_type' })
  loanType!: string;

  @Column('float', { name: 'limit_amount' })
  limitAmount!: number;

  @Column('int', { name: 'loan_term_limit' })
  loanTermLimit!: number;

  @Column('text', { nullable: true })
  preference!: string;

  @Column('text')
  terms!: string;

  @Column('text', { nullable: true })
  description!: string;

  @OneToMany(() => VersionLoanPackage, (version_loan_package) => version_loan_package.loanPackage, { cascade: true })
  versionLoanPackages!: VersionLoanPackage[];

  @OneToMany(() => LoanRequest, (loan_request) => loan_request.loanPackage)
  loanRequests!: Promise<LoanRequest[]>;

  @OneToMany(() => Contract, (contract) => contract.loanPackage)
  contracts!: Promise<Contract[]>;

  // @OneToMany(
  //   () => TrackingContractInformation,
  //   (tracking_contract_information) => tracking_contract_information.loanPackageId
  // )
  // trackingContractInformations!: Promise<TrackingContractInformation[]>;
}
