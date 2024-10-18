import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { PaymentPlan } from './payment_plan.model';
import { Borrower } from './borrower.model';

@Entity('receipts')
export class Receipt extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'receipt_id' })
  receiptId!: string;

  @ManyToOne(() => PaymentPlan, { nullable: false })
  @JoinColumn({ name: 'propose_id' })
  propose!: PaymentPlan;

  @Column('varchar', { length: 50, name: 'propose_type' })
  proposeType!: string;

  @Column('text', { name: 'content' })
  content!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'amount' })
  amount!: number;

  @Column('varchar', { length: 50, name: 'payment_method' })
  paymentMethod!: string;

  @Column('varchar', { length: 255, nullable: true, name: 'sender_bank_account_name' })
  senderBankAccountName!: string | null;

  @Column('varchar', { length: 50, nullable: true, name: 'sender_bank_account_number' })
  senderBankAccountNumber!: string | null;

  @Column('varchar', { length: 255, nullable: true, name: 'pay_address' })
  payAddress!: string | null;

  @ManyToOne(() => Borrower, { nullable: false })
  @JoinColumn({ name: 'object_receipt' })
  objectReceipt!: Borrower;

  @Column('date', { name: 'receipt_date' })
  receiptDate!: Date;

  @Column('text', { nullable: true, name: 'attachments' })
  attachments!: string | null;
}
