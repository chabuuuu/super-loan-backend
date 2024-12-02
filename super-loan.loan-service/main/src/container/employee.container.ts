import { EmployeeController } from '@/controller/employee.controller';
import { EmployeeService } from '@/service/employee.service';
import { Employee } from '@/models/employee.model';
import { EmployeeRepository } from '@/repository/employee.repository';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { BaseContainer } from '@/container/base.container';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { permissionSpecificRepository } from '@/container/permission_specific.container';
import { INotificationRepository } from '@/repository/interface/i.notification.repository';
import { notificationService } from '@/container/notification.container';
import { INotificationService } from '@/service/interface/i.notification.service';

class EmployeeContainer extends BaseContainer {
  constructor() {
    super(Employee);
    this.container.bind<IEmployeeService<Employee>>('EmployeeService').to(EmployeeService);
    this.container.bind<IEmployeeRepository<Employee>>('EmployeeRepository').to(EmployeeRepository);
    this.container.bind<EmployeeController>(EmployeeController).toSelf();

    //Import
    this.container
      .bind<IPermissionSpecificRepository<any>>('PermissionSpecificRepository')
      .toConstantValue(permissionSpecificRepository);
    this.container.bind<INotificationService<any>>('NotificationService').toConstantValue(notificationService);
  }

  export() {
    const employeeController = this.container.get<EmployeeController>(EmployeeController);
    const employeeService = this.container.get<IEmployeeService<any>>('EmployeeService');
    const employeeRepostitory = this.container.get<IEmployeeRepository<any>>('EmployeeRepository');
    const emplyeeContainer = this.container;
    return { employeeController, employeeService, employeeRepostitory, emplyeeContainer };
  }
}

const employeeContainer = new EmployeeContainer();
const { employeeController, employeeService, employeeRepostitory, emplyeeContainer } = employeeContainer.export();
export { employeeController, employeeService, employeeRepostitory, emplyeeContainer };
