import { Appraisal } from '@/models/appraisal.model';
import { IAppraisalRepository } from '@/repository/interface/i.appraisal.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAppraisalService } from '@/service/interface/i.appraisal.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AppraisalService extends BaseCrudService<Appraisal> implements IAppraisalService<Appraisal> {
  private appraisalRepository: IAppraisalRepository<Appraisal>;

  constructor(@inject('AppraisalRepository') appraisalRepository: IAppraisalRepository<Appraisal>) {
    super(appraisalRepository);
    this.appraisalRepository = appraisalRepository;
  }
}
