import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { VersionLoanPackage } from '@/models/version_loan_package.model';
import { IVersionLoanPackageService } from '@/service/interface/i.version_loan_package.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class VersionLoanPackageController {
  public common: IBaseCrudController<VersionLoanPackage>;
  private versionLoanPackageService: IVersionLoanPackageService<VersionLoanPackage>;
  constructor(
    @inject('VersionLoanPackageService') versionLoanPackageService: IVersionLoanPackageService<VersionLoanPackage>,
    @inject(ITYPES.Controller) common: IBaseCrudController<VersionLoanPackage>
  ) {
    this.versionLoanPackageService = versionLoanPackageService;
    this.common = common;
  }
}
