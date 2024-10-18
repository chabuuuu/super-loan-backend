import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { LoanPackage } from './loan_package.model';
import { Borrower } from './borrower.model';
import { LoanRequestAssetDetail } from './loan_request_asset_detail.model';
import { Appraisal } from './appraisal.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';

@Entity('loan_requests')
export class LoanRequest extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'loan_request_id' })
  loanRequestId!: string;

  @ManyToOne(() => Borrower, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'borrower_id' })
  borrower!: Borrower;

  @Column('varchar', { length: 255, name: 'borrower_fullname' })
  borrowerFullName!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'borrower_avatar' })
  borrowerAvatar!: string;

  @Column('varchar', { length: 15, name: 'borrower_phone_number' })
  borrowerPhoneNumber!: string;

  @Column('varchar', { length: 255, name: 'borrower_email' })
  borrowerEmail!: string;

  @Column('varchar', { length: 20, name: 'borrower_identify_card_number' })
  borrowerIdentifyCardNumber!: string;

  @Column('varchar', { length: 255, name: 'borrower_home_address' })
  borrowerHomeAddress!: string;

  @Column('varchar', { length: 100, name: 'borrower_job_title' })
  borrowerJobTitle!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'borrower_income' })
  borrowerIncome!: number;

  @Column('text', { nullable: true, name: 'borrower_income_proof_documents' })
  borrowerIncomeProofDocuments!: string;

  @ManyToOne(() => LoanPackage)
  @JoinColumn({ name: 'loan_package_id' })
  loanPackage!: LoanPackage;

  @Column('varchar', { length: 255, name: 'loan_package_name' })
  loanPackageName!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'loan_amount' })
  loanAmount!: number;

  @Column('text', { name: 'loan_purpose' })
  loanPurpose!: string;

  @Column('varchar', { length: 50, name: 'request_status' })
  requestStatus!: string;

  @Column('varchar', { length: 50, name: 'loan_type' })
  loanType!: string;

  @Column('decimal', { precision: 5, scale: 2, name: 'interest_rate' })
  interestRate!: number;

  @Column('int', { name: 'loan_term' })
  loanTerm!: number;

  @Column('text', { name: 'loan_request_form', nullable: true })
  loanRequestForm!: string;

  @OneToMany(() => LoanRequestAssetDetail, (loan_request_asset_detail) => loan_request_asset_detail.loanRequest)
  loanRequestAssetDetails!: LoanRequestAssetDetail[];

  @OneToMany(() => Appraisal, (appraisal) => appraisal.loanRequest)
  appraisals!: Appraisal[];

  @OneToMany(() => Contract, (contract) => contract.loanRequest)
  contracts!: Contract[];

  @OneToMany(
    () => TrackingContractInformation,
    (tracking_contract_information) => tracking_contract_information.loanRequest
  )
  trackingContractInformations!: TrackingContractInformation[];
}
