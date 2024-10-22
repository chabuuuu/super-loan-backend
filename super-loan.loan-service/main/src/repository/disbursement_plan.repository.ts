import { DisbursementPlan } from '@/models/disbursement_plan.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IDisbursementPlanRepository } from '@/repository/interface/i.disbursement_plan.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class DisbursementPlanRepository
  extends BaseRepository<DisbursementPlan>
  implements IDisbursementPlanRepository<DisbursementPlan>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(DisbursementPlan));
  }
}
