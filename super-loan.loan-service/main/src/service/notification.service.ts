import { ClientInfoDto } from '@/dto/client-info.dto';
import { SeenNotificationReq } from '@/dto/notification/seen-notification.req';
import { UnSeenNotificationReq } from '@/dto/notification/unseen-notification.req';
import { NotificationType } from '@/enums/notification-type.enum';
import { RoleTypeEnum } from '@/enums/role-type.enum';
import { UserTypeEnum } from '@/enums/user-type.enum';
import { Borrower } from '@/models/borrower.model';
import { Employee } from '@/models/employee.model';
import { Notification } from '@/models/notification.model';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { INotificationService } from '@/service/interface/i.notification.service';
import { id, inject, injectable } from 'inversify';

@injectable()
export class NotificationService extends BaseCrudService<Notification> implements INotificationService<Notification> {
  private notificationRepository: INotificationRepository<Notification>;

  constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository<Notification>) {
    super(notificationRepository);
    this.notificationRepository = notificationRepository;
  }

  private async changeNotificationStatus(
    seenStatus: boolean,
    all: boolean,
    notificationIds: string[] | undefined,
    userId: string,
    roleId: string
  ) {
    //If seenAll is true, set all notification of user to seen
    if (all == true) {
      //Find all notification of user that have seen = false
      const notifications = await this.notificationRepository.findByReceiverIdAndReceiverTypeAndSeen(
        userId,
        roleId,
        !seenStatus
      );

      //Set seen = true for all notification
      for (const notification of notifications) {
        if (notification.receivers) {
          for (const receiver of notification.receivers) {
            if (receiver.receiverId === userId) {
              receiver.seen = seenStatus;
            }
          }

          //Save notification
          await this.notificationRepository.save({ data: notification });
        }
      }

      return;
    }

    //If seenAll is false, set seen = true for notification that have notificationId in notificationIds
    if (!notificationIds) {
      return;
    }

    for (const notificationId of notificationIds) {
      //Find notification by notificationId
      const notification = await this.notificationRepository.findOne({
        filter: {
          notificationId: notificationId
        }
      });

      //If notification not found, continue to next notification
      if (!notification) {
        continue;
      }

      //If notification found, set seen = true for user
      if (notification.receivers) {
        for (const receiver of notification.receivers) {
          if (receiver.receiverId === userId) {
            receiver.seen = seenStatus;
          }
        }

        //Save notification
        await this.notificationRepository.save({ data: notification });
      }
    }
  }

  /**
   * User unSeen notification by notificationId or all notification if seenAll = true
   * @param id
   * @param roleId
   * @param unseenNotificationReq
   */
  async unSeenNotification(id: string, roleId: string, unseenNotificationReq: UnSeenNotificationReq): Promise<void> {
    await this.changeNotificationStatus(
      false,
      unseenNotificationReq.unSeenAll,
      unseenNotificationReq.notificationIds,
      id,
      roleId
    );
  }

  /**
   * User seen notification by notificationId or all notification if seenAll = true
   *
   * @param id
   * @param seenNotificationReq
   */
  async seenNotification(userId: string, roleId: string, seenNotificationReq: SeenNotificationReq): Promise<void> {
    await this.changeNotificationStatus(
      true,
      seenNotificationReq.seenAll,
      seenNotificationReq.notificationIds,
      userId,
      roleId
    );
  }

  async getMyNotification(id: string, roleId: string, seen: string): Promise<Notification[]> {
    switch (seen) {
      case 'true':
        return this.notificationRepository.findByReceiverIdAndReceiverTypeAndSeen(id, roleId, true);
      case 'false':
        return this.notificationRepository.findByReceiverIdAndReceiverTypeAndSeen(id, roleId, false);
      case 'all':
        return this.notificationRepository.findByReceiverIdAndReceiverTypeAndSeen(id, roleId);

      default:
        return [];
    }
  }

  async sendWhenRegisterBorrowerSuccess(borrowerName: string, admins: Employee[]): Promise<void> {
    const notifcationContent = `Khách hàng ${borrowerName}`;

    const receivers = admins.map((admin) => ({
      id: admin.employeeId,
      type: UserTypeEnum.EMPLOYEE
    }));

    this.sendNotification(
      NotificationType.NOTIFY_REGISTER_BORROWER,
      'Đăng ký thành công',
      receivers,
      notifcationContent
    );
  }

  async sendWhenChangePasswordSuccess(userType: UserTypeEnum, userId: string): Promise<void> {
    this.sendNotification(NotificationType.NOTIFY_CHANGE_PASSWORD, 'Đổi mật khẩu thành công', [
      {
        id: userId,
        type: userType
      }
    ]);
  }

  async sendWhenLoggedIn(clientInfo: ClientInfoDto, userType: UserTypeEnum, userId: string): Promise<void> {
    const notifcationContent = `Trên ${clientInfo.os} - ${clientInfo.city} -> ${clientInfo.device} - ${clientInfo.timezone}`;

    this.sendNotification(
      NotificationType.NOTIFY_LOGIN,
      'Bạn đã đăng nhập thành công',
      [
        {
          id: userId,
          type: userType
        }
      ],
      notifcationContent
    );
  }

  async sendNotification(
    type: string,
    title: string,
    receiver: { id: string; type: string }[],
    content?: string
  ): Promise<void> {
    const notification = new Notification();
    notification.titleName = title;
    notification.content = content;
    notification.notiType = type;

    notification.receivers = receiver.map((receiver) => ({
      receiverId: receiver.id,
      receiverType: receiver.type,
      seen: false
    }));

    await this.notificationRepository.create({ data: notification });
  }
}
