import { Appraisal } from '@/models/appraisal.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IAppraisalRepository } from '@/repository/interface/i.appraisal.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class AppraisalRepository extends BaseRepository<Appraisal> implements IAppraisalRepository<Appraisal> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Appraisal));
  }
}
