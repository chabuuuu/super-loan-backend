import { PagingResponseDto } from '@/dto/paging-response.dto';
import { Employee } from '@/models/employee.model';

export class EmployeeGetByRoleRes extends PagingResponseDto<Employee> {
  counts!: {
    totalEmployee: number;
    totalBlockedEmployee: number;
    totalNewEmployee: number;
  };
}
