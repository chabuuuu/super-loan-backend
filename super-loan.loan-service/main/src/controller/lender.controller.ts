import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Lender } from '@/models/lender.model';
import { ILenderService } from '@/service/interface/i.lender.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LenderController {
  public common: IBaseCrudController<Lender>;
  private lenderService: ILenderService<Lender>;
  constructor(
    @inject('LenderService') lenderService: ILenderService<Lender>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Lender>
  ) {
    this.lenderService = lenderService;
    this.common = common;
  }
}
