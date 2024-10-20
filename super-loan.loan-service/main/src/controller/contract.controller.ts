import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Contract } from '@/models/contract.model';
import { IContractService } from '@/service/interface/i.contract.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ContractController {
  public common: IBaseCrudController<Contract>;
  private contractService: IContractService<Contract>;
  constructor(
    @inject('ContractService') contractService: IContractService<Contract>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Contract>
  ) {
    this.contractService = contractService;
    this.common = common;
  }
}
