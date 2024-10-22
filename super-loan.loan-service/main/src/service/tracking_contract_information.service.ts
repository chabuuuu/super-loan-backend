import { TrackingContractInformation } from '@/models/tracking_contract_information.model';
import { ITrackingContractInformationRepository } from '@/repository/interface/i.tracking_contract_information.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ITrackingContractInformationService } from '@/service/interface/i.tracking_contract_information.service';
import { inject, injectable } from 'inversify';

@injectable()
export class TrackingContractInformationService
  extends BaseCrudService<TrackingContractInformation>
  implements ITrackingContractInformationService<TrackingContractInformation>
{
  private trackingContractInformationRepository: ITrackingContractInformationRepository<TrackingContractInformation>;

  constructor(
    @inject('TrackingContractInformationRepository')
    trackingContractInformationRepository: ITrackingContractInformationRepository<TrackingContractInformation>
  ) {
    super(trackingContractInformationRepository);
    this.trackingContractInformationRepository = trackingContractInformationRepository;
  }
}
