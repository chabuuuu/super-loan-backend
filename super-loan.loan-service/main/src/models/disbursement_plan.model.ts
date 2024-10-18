import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Contract } from './contract.model';
import { PaymentSlip } from './payment_slip.model';

@Entity('disbursement_plans')
export class DisbursementPlan extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'propose_id' })
  proposeId!: string;

  @Column('int', { name: 'disbursement_installment' })
  disbursementInstallment!: number;

  @ManyToOne(() => Contract, { nullable: false })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('decimal', { precision: 5, scale: 2, name: 'percentage_of_total' })
  percentageOfTotal!: number;

  @Column('decimal', { precision: 15, scale: 2, name: 'amount' })
  amount!: number;

  @Column('date', { name: 'disburse_at' })
  disburseAt!: Date;

  @OneToMany(() => PaymentSlip, (payment_slip) => payment_slip.propose)
  paymentSlips!: PaymentSlip[];
}
