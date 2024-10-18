import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { DisbursementPlan } from './disbursement_plan.model';
import { Borrower } from './borrower.model';

@Entity('payment_slips')
export class PaymentSlip extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'payment_slip_id' })
  paymentSlipId!: string;

  @ManyToOne(() => DisbursementPlan, { nullable: false })
  @JoinColumn({ name: 'propose_id' })
  propose!: DisbursementPlan;

  @Column('varchar', { length: 50, name: 'propose_type' })
  proposeType!: string;

  @Column('text', { name: 'content' })
  content!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'amount' })
  amount!: number;

  @Column('varchar', { length: 50, name: 'payment_method' })
  paymentMethod!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'receiver_bank_account_name' })
  receiverBankAccountName!: string | null;

  @Column('varchar', { length: 50, nullable: true, name: 'receiver_bank_account_number' })
  receiverBankAccountNumber!: string | null;

  @Column('varchar', { length: 255, nullable: true, name: 'pay_address' })
  payAddress!: string | null;

  @ManyToOne(() => Borrower, { nullable: false })
  @JoinColumn({ name: 'object_slip' })
  objectSlip!: Borrower;

  @Column('date', { name: 'date_slip' })
  dateSlip!: Date;

  @Column('text', { nullable: true, name: 'attachments' })
  attachments!: string | null;
}
