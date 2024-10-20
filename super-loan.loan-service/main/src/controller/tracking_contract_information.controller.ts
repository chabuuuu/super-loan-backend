import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { TrackingContractInformation } from '@/models/tracking_contract_information.model';
import { ITrackingContractInformationService } from '@/service/interface/i.tracking_contract_information.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class TrackingContractInformationController {
  public common: IBaseCrudController<TrackingContractInformation>;
  private trackingContractInformationService: ITrackingContractInformationService<TrackingContractInformation>;
  constructor(
    @inject('TrackingContractInformationService')
    trackingContractInformationService: ITrackingContractInformationService<TrackingContractInformation>,
    @inject(ITYPES.Controller) common: IBaseCrudController<TrackingContractInformation>
  ) {
    this.trackingContractInformationService = trackingContractInformationService;
    this.common = common;
  }
}
