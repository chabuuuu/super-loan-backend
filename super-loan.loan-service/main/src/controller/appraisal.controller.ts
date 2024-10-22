import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Appraisal } from '@/models/appraisal.model';
import { IAppraisalService } from '@/service/interface/i.appraisal.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AppraisalController {
  public common: IBaseCrudController<Appraisal>;
  private appraisalService: IAppraisalService<Appraisal>;
  constructor(
    @inject('AppraisalService') appraisalService: IAppraisalService<Appraisal>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Appraisal>
  ) {
    this.appraisalService = appraisalService;
    this.common = common;
  }
}
