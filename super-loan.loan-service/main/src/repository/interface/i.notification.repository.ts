import { Notification } from '@/models/notification.model';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface INotificationRepository<T> extends IBaseRepository<T> {
  findByReceiverIdAndReceiverTypeAndSeen(
    receiverId: string,
    receiverType: string,
    seen?: boolean
  ): Promise<Notification[]>;
}
