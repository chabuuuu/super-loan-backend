import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { PaymentPlan } from './payment_plan.model';
import { Borrower } from './borrower.model';

@Entity('receipts')
export class Receipt extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'receipt_id' })
  receiptId!: string;

  @Column({ name: 'propose_id' })
  proposeId!: string;

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

  @Column({ name: 'object_receipt_id' })
  objectReceiptId!: string;

  @Column({ name: 'object_type' })
  objectType!: string;

  @Column('date', { name: 'receipt_date' })
  receiptDate!: Date;

  @Column('simple-array', { nullable: true, name: 'attachments' })
  attachments!: string[] | null;
}
