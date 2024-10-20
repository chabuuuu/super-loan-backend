import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Borrower } from '@/models/borrower.model';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class BorrowerController {
  public common: IBaseCrudController<Borrower>;
  private borrowerService: IBorrowerService<Borrower>;
  constructor(
    @inject('BorrowerService') borrowerService: IBorrowerService<Borrower>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Borrower>
  ) {
    this.borrowerService = borrowerService;
    this.common = common;
  }
}
