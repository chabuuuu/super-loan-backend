import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { BaseModel } from './base.model';
import { BorrowerProfile } from './borrower_profile.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';
import { PaymentInstallment } from './payment_installment.model';
import { Receipt } from './receipt.model';
import { PaymentSlip } from './payment_slip.model';
import { Notification } from './notification.model';

@Entity('borrowers')
export class Borrower extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => BorrowerProfile, (borrower_profile) => borrower_profile.borrower)
  @OneToMany(() => LoanRequest, (loan_request) => loan_request.borrower)
  @OneToMany(() => Contract, (contract) => contract.borrower)
  @OneToMany(() => PaymentInstallment, (payment_installment) => payment_installment.customer)
  @OneToMany(
    () => TrackingContractInformation,
    (tracking_contract_information) => tracking_contract_information.customerID
  )
  @OneToMany(() => Receipt, (receipt) => receipt.objectReceipt)
  @OneToMany(() => PaymentSlip, (payment_slip) => payment_slip.objectSlip)
  @OneToMany(() => Notification, (notification) => notification.subjectSendNotice)
  @Column({ name: 'borrower_id' })
  borrowerID!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 100 })
  email!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15, name: 'phone_number' })
  phoneNumber!: string;

  @Column('varchar', { length: 20 })
  password!: string;

  @Column('varchar', { length: 20, name: 'social_login_type' })
  socialLoginType!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'social_uid' })
  socialUid!: string;

  @Column('varchar', { length: 20 })
  status!: string;
}
