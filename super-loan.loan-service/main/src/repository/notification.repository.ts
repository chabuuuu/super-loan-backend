import { Notification } from '@/models/notification.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class NotificationRepository
  extends BaseRepository<Notification>
  implements INotificationRepository<Notification>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Notification));
  }

  async findByReceiverIdAndReceiverTypeAndSeen(
    receiverId: string,
    receiverType: string,
    page?: number,
    rpp?: number,
    seen?: boolean
  ): Promise<Notification[]> {
    if (page && rpp) {
      return await this.ormRepository
        .createQueryBuilder('notifications')
        .where('notifications.receivers @> :receiver', {
          receiver: JSON.stringify([{ receiverId, receiverType, seen }])
        })
        .orderBy('notifications.create_at', 'DESC')
        .skip((page - 1) * rpp) // Bỏ qua các bản ghi trước đó
        .take(rpp) // Lấy số lượng bản ghi theo kích thước trang
        .getMany();
    } else {
      return await this.ormRepository
        .createQueryBuilder('notifications')
        .where('notifications.receivers @> :receiver', {
          receiver: JSON.stringify([{ receiverId, receiverType, seen }])
        })
        .orderBy('notifications.create_at', 'DESC')
        .getMany();
    }
  }
}
