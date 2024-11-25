import { ClientInfoDto } from '@/dto/client-info.dto';
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
import { inject, injectable } from 'inversify';

@injectable()
export class NotificationService extends BaseCrudService<Notification> implements INotificationService<Notification> {
  private notificationRepository: INotificationRepository<Notification>;
  private employeeRepository: IEmployeeRepository<Employee>;

  constructor(
    @inject('NotificationRepository') notificationRepository: INotificationRepository<Notification>,
    @inject('EmployeeRepository') employeeRepository: IEmployeeRepository<Employee>
  ) {
    super(notificationRepository);
    this.notificationRepository = notificationRepository;
    this.employeeRepository = employeeRepository;
  }

  async sendWhenRegisterBorrowerSuccess(borrowerName: string): Promise<void> {
    const notifcationContent = `Khách hàng ${borrowerName}`;

    const admins = await this.employeeRepository.findMany({
      filter: {
        roleId: RoleTypeEnum.ADMIN
      }
    });

    for (const admin of admins) {
      this.sendNotification(
        NotificationType.NOTIFY_REGISTER_BORROWER,
        'Đăng ký thành công',
        {
          id: admin.employeeId,
          type: UserTypeEnum.EMPLOYEE
        },
        notifcationContent
      );
    }
  }

  async sendWhenChangePasswordSuccess(userType: UserTypeEnum, userId: string): Promise<void> {
    this.sendNotification(NotificationType.NOTIFY_CHANGE_PASSWORD, 'Đổi mật khẩu thành công', {
      id: userId,
      type: userType
    });
  }

  async sendWhenLoggedIn(clientInfo: ClientInfoDto, userType: UserTypeEnum, userId: string): Promise<void> {
    const notifcationContent = `Trên ${clientInfo.os} - ${clientInfo.city} -> ${clientInfo.device} - ${clientInfo.timezone}`;

    this.sendNotification(
      NotificationType.NOTIFY_LOGIN,
      'Bạn đã đăng nhập thành công',
      {
        id: userId,
        type: userType
      },
      notifcationContent
    );
  }

  async sendNotification(
    type: string,
    title: string,
    receiver: { id: string; type: string },
    content?: string
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
