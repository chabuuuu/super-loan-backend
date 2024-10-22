import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { LoanRequest } from './loan_request.model';
import { Borrower } from './borrower.model';
import { Lender } from './lender.model';
import { LoanPackage } from './loan_package.model';
import { StatusContract } from './status_contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';
import { PaymentPlan } from './payment_plan.model';
import { DisbursementPlan } from './disbursement_plan.model';
import { PaymentInstallment } from './payment_installment.model';

@Entity('contracts')
export class Contract extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'contract_id' })
  contractId!: string;

  @ManyToOne(() => LoanRequest, { nullable: false })
  @JoinColumn({ name: 'loan_request_id' })
  loanRequest!: LoanRequest;

  @ManyToOne(() => Borrower, { nullable: false })
  @JoinColumn({ name: 'borrower_id' })
  borrower!: Borrower;

  @ManyToOne(() => Lender, { nullable: false })
  @JoinColumn({ name: 'lender_id' })
  lender!: Lender;

  @Column('varchar', { length: 50, name: 'contract_status' })
  contractStatus!: string;

  @Column('varchar', { length: 255, name: 'borrower_fullname' })
  borrowerFullname!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'borrower_avatar' })
  borrowerAvatar!: string | null;

  @Column('varchar', { length: 255, name: 'borrower_address' })
  borrowerAddress!: string;

  @Column('varchar', { length: 20, name: 'borrower_phone_number' })
  borrowerPhoneNumber!: string;

  @Column('date', { name: 'borrower_birthday' })
  borrowerBirthday!: Date;

  @Column('varchar', { length: 255, name: 'borrower_sign' })
  borrowerSign!: string;

  @Column('varchar', { length: 50, name: 'borrower_identify_card_number' })
  borrowerIdentifyCardNumber!: string;

  @Column('varchar', { length: 255, name: 'lender_fullname' })
  lenderFullname!: string;

  @Column('varchar', { length: 255, name: 'lender_address' })
  lenderAddress!: string;

  @Column('varchar', { length: 20, name: 'lender_phone_number' })
  lenderPhoneNumber!: string;

  @Column('varchar', { length: 255, name: 'lender_sign' })
  lenderSign!: string;

  @Column('varchar', { length: 50, name: 'payment_method' })
  paymentMethod!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'borrower_bank_account_name' })
  borrowerBankAccountName!: string | null;

  @Column('varchar', { length: 50, nullable: true, name: 'borrower_bank_account_number' })
  borrowerBankAccountNumber!: string | null;

  @Column('varchar', { length: 255, nullable: true, name: 'receive_money_address' })
  receiveMoneyAddress!: string | null;

  @Column('simple-array', { nullable: true, name: 'attachments' })
  attachments?: string[];

  @Column('decimal', { precision: 15, scale: 2, name: 'loan_amount' })
  loanAmount!: number;

  @Column('varchar', { length: 50, name: 'loan_type' })
  loanType!: string;

  @ManyToOne(() => LoanPackage, { nullable: false })
  @JoinColumn({ name: 'loan_package_id' })
  loanPackage!: LoanPackage;

  @Column('varchar', { length: 255, name: 'loan_package_name' })
  loanPackageName!: string;

  @Column('varchar', { length: 255, name: 'loan_purpose' })
  loanPurpose!: string;

  @Column('int', { name: 'loan_term' })
  loanTerm!: number;

  @Column('decimal', { precision: 5, scale: 2, name: 'loan_interest_rate' })
  loanInterestRate!: number;

  @Column('varchar', { length: 50, name: 'contract_type' })
  contractType!: string;

  @Column('text', { nullable: true, name: 'hard_contract_document' })
  hardContractDocument!: string | null;

  // @OneToMany(() => StatusContract, (status_contract) => status_contract.trackingObjectId)
  // statusContracts!: Promise<StatusContract[]>;

  @OneToMany(
    () => TrackingContractInformation,
    (tracking_contract_information) => tracking_contract_information.contractId
  )
  trackingContractInformations!: TrackingContractInformation[];

  @OneToMany(() => PaymentPlan, (payment_plan) => payment_plan.contract)
  paymentPlans!: PaymentPlan[];

  @OneToMany(() => DisbursementPlan, (disbursement_plan) => disbursement_plan.contract)
  disbursementPlans!: DisbursementPlan[];

  @OneToMany(() => PaymentInstallment, (payment_installment) => payment_installment.contract)
  paymentInstallments!: PaymentInstallment[];
}
