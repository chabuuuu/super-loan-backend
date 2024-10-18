import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Borrower } from './borrower.model';
import { PaymentPlan } from './payment_plan.model';

@Entity('notifications')
export class Notification extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  notificationId!: string;

  @ManyToOne(() => PaymentPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'propose_id' })
  propose!: PaymentPlan;

  @Column('json', { name: 'object_receive_notices' })
  objectReceiveNotices!: { receiver_id: number; seen: boolean }[];

  @ManyToOne(() => Borrower, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_send_notice' })
  subjectSendNotice!: Borrower;

  @Column('varchar', { length: 255, name: 'title_name' })
  titleName!: string;

  @Column('varchar', { length: 50, name: 'noti_type' })
  notiType!: string;
}
