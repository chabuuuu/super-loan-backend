import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { StatusContract } from '@/models/status_contract.model';
import { IStatusContractService } from '@/service/interface/i.status_contract.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StatusContractController {
  public common: IBaseCrudController<StatusContract>;
  private statusContractService: IStatusContractService<StatusContract>;
  constructor(
    @inject('StatusContractService') statusContractService: IStatusContractService<StatusContract>,
    @inject(ITYPES.Controller) common: IBaseCrudController<StatusContract>
  ) {
    this.statusContractService = statusContractService;
    this.common = common;
  }
}
