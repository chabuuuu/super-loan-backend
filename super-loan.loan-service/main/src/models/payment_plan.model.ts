import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Contract } from './contract.model';
import { Receipt } from './receipt.model';
import { Notification } from './notification.model';

@Entity('payment_plans')
export class PaymentPlan extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'propose_id' })
  @OneToMany(() => Receipt, (receipt) => receipt.propose)
  @OneToMany(() => Notification, (notification) => notification.proposeID)
  proposeID!: string;

  @Column('int', { name: 'payment_installment' })
  paymentInstallment!: number;

  @ManyToOne(() => Contract, { nullable: false })
  @JoinColumn({ name: 'contract_id' })
  contract!: Contract;

  @Column('decimal', { precision: 5, scale: 2, name: 'percentage_of_total' })
  percentageOfTotal!: number;

  @Column('decimal', { precision: 15, scale: 2, name: 'amount' })
  amount!: number;

  @Column('date', { name: 'start_pay_at' })
  startPayAt!: Date;

  @Column('date', { name: 'end_pay_at' })
  endPayAt!: Date;

  @Column('int', { name: 'days' })
  days!: number;
}
