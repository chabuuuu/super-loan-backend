import { Expose } from 'class-transformer';

export class LoginEmployeeRes {
  @Expose()
  employeeId!: string;

  @Expose()
  token!: string;
}
