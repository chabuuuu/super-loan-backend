import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { BorrowerProfile } from './borrower_profile.model';
import { LoanRequest } from './loan_request.model';
import { Contract } from './contract.model';
import { TrackingContractInformation } from './tracking_contract_information.model';
import { PaymentInstallment } from './payment_installment.model';
import { Receipt } from './receipt.model';
import { PaymentSlip } from './payment_slip.model';
import { Notification } from './notification.model';
import { Role } from '@/models/role.model';

@Entity('borrowers')
export class Borrower extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'borrower_id' })
  borrowerId!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 100 })
  email!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15, name: 'phone_number' })
  phoneNumber!: string;

  @Column('varchar', { length: 100 })
  password!: string;

  @Column('varchar', { length: 20, nullable: true, name: 'social_login_type' })
  socialLoginType!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'social_uid' })
  socialUid!: string;

  @Column('varchar', { length: 20, nullable: true })
  status!: string;

  @OneToOne(() => BorrowerProfile, (borrower_profile) => borrower_profile.borrower, { cascade: true })
  borrowerProfile!: BorrowerProfile;

  @OneToMany(() => LoanRequest, (loan_request) => loan_request.borrower)
  loanRequests!: Promise<LoanRequest[]>;

  @OneToMany(() => Contract, (contract) => contract.borrower)
  contracts!: Promise<Contract[]>;

  @OneToMany(() => PaymentInstallment, (payment_installment) => payment_installment.customer)
  paymentInstallments!: Promise<PaymentInstallment[]>;

  @OneToMany(() => Notification, (notification) => notification.subjectSendNotice)
  notifications!: Notification[];

  @Column({ name: 'role_id' })
  roleId!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
