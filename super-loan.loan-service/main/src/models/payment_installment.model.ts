import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Contract } from './contract.model';
import { Borrower } from './borrower.model';
@Entity('payment_installments')
export class PaymentInstallment extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'payment_installment_id' })
  paymentInstallmentID!: string;

  @ManyToOne(() => Contract, { nullable: false })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @ManyToOne(() => Borrower, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer!: Borrower;

  @Column('int', { name: 'payment_installment' })
  paymentInstallment!: number;

  @Column('decimal', { precision: 5, scale: 2, name: 'percentage_of_total' })
  percentageOfTotal!: number;

  @Column('varchar', { length: 50, name: 'payment_method' })
  paymentMethod!: string;

  @Column('text', { nullable: true, name: 'notes' })
  notes!: string | null;

  @Column('varchar', { length: 50, name: 'payment_status' })
  paymentStatus!: string;
}
