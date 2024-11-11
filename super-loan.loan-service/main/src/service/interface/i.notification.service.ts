import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface INotificationService<T extends BaseModelType> extends IBaseCrudService<T> {
  sendNotification(
    type: string,
    title: string,
    content: string,
    receiver: {
      id: string;
      type: string;
    }
  ): Promise<void>;
}
