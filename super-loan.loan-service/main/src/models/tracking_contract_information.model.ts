import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { Borrower } from './borrower.model';
import { LoanPackage } from './loan_package.model';

@Entity('tracking_contract_informations')
export class TrackingContractInformation extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'contract_id' })
  @ManyToOne(() => Contract)
  contractID!: string;

  @ManyToOne(() => LoanRequest)
  @JoinColumn({ name: 'loan_request_id' })
  loanRequest!: LoanRequest;

  @Column('varchar', { length: 50, name: 'contract_status' })
  contractStatus!: string;

  @ManyToOne(() => Borrower)
  @Column('uuid', { name: 'customer_id' })
  customerID!: Borrower;

  @Column('varchar', { length: 255, name: 'borrower_fullname' })
  borrowerFullname!: string;

  @Column('varchar', { name: 'borrower_avatar' })
  borrowerAvatar!: string;

  @Column('varchar', { length: 255, name: 'borrower_address' })
  borrowerAddress!: string;

  @Column('varchar', { length: 15, name: 'borrower_phone_number' })
  borrowerPhoneNumber!: string;

  @Column('date', { name: 'borrower_birthday' })
  borrowerBirthday!: Date;

  @Column('text', { name: 'borrower_sign' })
  borrowerSign!: string;

  @Column('varchar', { length: 20, name: 'borrower_identify_card_number' })
  borrowerIdentifyCardNumber!: string;

  @Column('varchar', { length: 255, name: 'lender_fullname' })
  lenderFullname!: string;

  @Column('varchar', { length: 255, name: 'lender_address' })
  lenderAddress!: string;

  @Column('varchar', { length: 15, name: 'lender_phone_number' })
  lenderPhoneNumber!: string;

  @Column('text', { name: 'lender_sign' })
  lenderSign!: string;

  @Column('varchar', { length: 50, name: 'payment_method' })
  paymentMethod!: string;

  @Column('varchar', { length: 255, name: 'borrower_bank_account_name', nullable: true })
  borrowerBankAccountName!: string;

  @Column('varchar', { length: 50, name: 'borrower_bank_account_number', nullable: true })
  borrowerBankAccountNumber!: string;

  @Column('varchar', { length: 255, name: 'receive_money_address', nullable: true })
  receiveMoneyAddress!: string;

  @Column('text', { name: 'attachments', nullable: true })
  attachments!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'loan_amount' })
  loanAmount!: number;

  @Column('varchar', { length: 50, name: 'loan_type' })
  loanType!: string;

  @ManyToOne(() => LoanPackage)
  @Column('uuid', { name: 'loan_package_id' })
  loanPackageID!: LoanPackage;

  @Column('varchar', { length: 255, name: 'loan_package_name' })
  loanPackageName!: string;

  @Column('text', { name: 'loan_purpose' })
  loanPurpose!: string;

  @Column('int', { name: 'loan_term' })
  loanTerm!: number;

  @Column('decimal', { precision: 5, scale: 2, name: 'loan_interest_rate' })
  loanInterestRate!: number;

  @Column('varchar', { length: 50, name: 'contract_type' })
  contractType!: string;

  @Column('varchar', { name: 'hard_contract_document', nullable: true })
  hardContractDocument!: string;
}
