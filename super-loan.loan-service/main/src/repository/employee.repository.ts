import { Employee } from '@/models/employee.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IEmployeeRepository } from '@/repository/interface/i.employee.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, MoreThanOrEqual } from 'typeorm';

export class EmployeeRepository extends BaseRepository<Employee> implements IEmployeeRepository<Employee> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Employee));
  }

  async totalNewEmployee(): Promise<number> {
    //Total employee that have been created from 3 days ago
    return await this.ormRepository.count({
      where: {
        createAt: MoreThanOrEqual(new Date(new Date().setDate(new Date().getDate() - 3)))
      }
    });
  }
}
