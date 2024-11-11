import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from '@/models/employee.model';

@Entity('notifications')
export class Notification extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_id' })
  notificationId!: string;

  @Column({ name: 'propose_id', nullable: true })
  proposeId?: string;

  // @Column('json', { name: 'object_receive_notice', nullable: false })
  // objectReceiveNotice!: { receiver_id: string; seen: boolean; receiver_type: string };

  @Column({ name: 'receiver_id', nullable: false })
  receiverId!: string;

  @Column({ name: 'seen', default: false })
  seen!: boolean;

  @Column({ name: 'receiver_type' })
  receiverType!: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_send_notice' })
  subjectSendNotice!: Employee;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true
  })
  content?: string;

  @Column('varchar', { length: 255, name: 'title_name' })
  titleName!: string;

  @Column('varchar', { length: 50, name: 'noti_type' })
  notiType!: string;
}
