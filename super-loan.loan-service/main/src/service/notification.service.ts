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
}
