import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { LoanRequest } from './loan_request.model';
import { Employee } from './employee.model';
import { AppraisalDetail } from './appraisal_detail.model';

@Entity('appraisals')
export class Appraisal extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'appraisal_id' })
  appraisalID!: string;

  @OneToMany(() => AppraisalDetail, (appraisal_detail) => appraisal_detail.appraisal)
  appraisalDetails!: AppraisalDetail[];

  @ManyToOne(() => LoanRequest)
  @JoinColumn({ name: 'loan_request_id' })
  loanRequest!: LoanRequest;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'appraisal_staff_id' })
  appraisalStaff!: Employee;

  @Column('text', { nullable: true, name: 'proof_document' })
  proofDocument!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'total_amount' })
  totalAmount!: number;

  @Column('varchar', { length: 50, name: 'status' })
  status!: string;
}
