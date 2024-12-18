import { ClientInfoDto } from '@/dto/client-info.dto';
import { SeenNotificationReq } from '@/dto/notification/seen-notification.req';
import { UnSeenNotificationReq } from '@/dto/notification/unseen-notification.req';
import { UserTypeEnum } from '@/enums/user-type.enum';
import { Borrower } from '@/models/borrower.model';
import { Employee } from '@/models/employee.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { ParsedQs } from 'qs';

export interface INotificationService<T extends BaseModelType> extends IBaseCrudService<T> {
  unSeenNotification(id: string, roleId: string, unseenNotificationReq: UnSeenNotificationReq): Promise<void>;

  seenNotification(userId: string, roleId: string, seenNotificationReq: SeenNotificationReq): Promise<void>;

  getMyNotification(id: string, roleId: string, seen: string): Promise<T[]>;

  sendNotification(
    type: string,
    title: string,
    receiver: { id: string; type: string }[],
    content?: string
  ): Promise<void>;

  /**
   * * Send notification when user logged in
   * @param clientInfo
   * @param userType
   * @param userId
   */
  sendWhenLoggedIn(clientInfo: ClientInfoDto, userType: UserTypeEnum, userId: string): Promise<void>;

  /**
   * * Send when borrower register success
   * @param borrowerName
   */
  sendWhenRegisterBorrowerSuccess(borrowerName: string, admins: Employee[]): Promise<void>;
  /**
   * * Send when change password success
   * @param userType
   * @param userId
   */
  sendWhenChangePasswordSuccess(userType: UserTypeEnum, userId: string): Promise<void>;
}
