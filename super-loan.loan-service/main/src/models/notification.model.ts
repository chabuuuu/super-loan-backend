import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Borrower } from './borrower.model';
import { Employee } from '@/models/employee.model';

@Entity('notifications')
export class Notification extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  notificationId!: string;

  @Column({ name: 'propose_id' })
  proposeId!: string;

  @Column('json', { name: 'object_receive_notices' })
  objectReceiveNotices!: { receiver_id: number; seen: boolean; receiver_type: string }[];

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_send_notice' })
  subjectSendNotice!: Employee;

  @Column('varchar', { length: 255, name: 'title_name' })
  titleName!: string;

  @Column('varchar', { length: 50, name: 'noti_type' })
  notiType!: string;
}
