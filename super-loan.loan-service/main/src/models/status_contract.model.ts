import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Employee } from './employee.model';
import { Contract } from './contract.model';

@Entity('status_contracts')
export class StatusContract extends BaseModel {
  @PrimaryColumn('uuid', { name: 'tracking_object_id' })
  @ManyToOne(() => Contract)
  trackingObjectID!: Contract;

  @PrimaryColumn('varchar', { length: 50, name: 'status' })
  status!: string;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_change' })
  employeeChange!: Employee;
}
