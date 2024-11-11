import { Notification } from '@/models/notification.model';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { INotificationService } from '@/service/interface/i.notification.service';
import { inject, injectable } from 'inversify';

@injectable()
export class NotificationService extends BaseCrudService<Notification> implements INotificationService<Notification> {
  private notificationRepository: INotificationRepository<Notification>;

  constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository<Notification>) {
    super(notificationRepository);
    this.notificationRepository = notificationRepository;
  }

  async sendNotification(
    type: string,
    title: string,
    content: string,
    receiver: { id: string; type: string }
  ): Promise<void> {
    const notification = new Notification();
    notification.titleName = title;
    notification.content = content;
    notification.notiType = type;
    notification.receiverId = receiver.id;
    notification.receiverType = receiver.type;
    await this.notificationRepository.create({ data: notification });
  }
}
