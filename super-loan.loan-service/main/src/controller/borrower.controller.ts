import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { RegisterBorrowerRes } from '@/dto/borrower/register-borrower.res';
import { Borrower } from '@/models/borrower.model';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
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
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: RegisterBorrowerReq = req.body;
      const result = await this.borrowerService.register(requestBody);
      const responseBody = convertToDto(RegisterBorrowerRes, result);
      res.send_ok('Register Borrower successful', responseBody);
    } catch (error) {
      next(error);
    }
  }
}
