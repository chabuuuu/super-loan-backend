import { LoanRequest } from '@/models/loan_request.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILoanRequestRepository } from '@/repository/interface/i.loan_request.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LoanRequestRepository extends BaseRepository<LoanRequest> implements ILoanRequestRepository<LoanRequest> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(LoanRequest));
  }
}
