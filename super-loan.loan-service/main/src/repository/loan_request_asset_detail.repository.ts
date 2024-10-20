import { LoanRequestAssetDetail } from '@/models/loan_request_asset_detail.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ILoanRequestAssetDetailRepository } from '@/repository/interface/i.loan_request_asset_detail.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LoanRequestAssetDetailRepository
  extends BaseRepository<LoanRequestAssetDetail>
  implements ILoanRequestAssetDetailRepository<LoanRequestAssetDetail>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(LoanRequestAssetDetail));
  }
}
