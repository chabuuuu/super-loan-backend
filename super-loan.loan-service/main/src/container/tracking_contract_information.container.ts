import { TrackingContractInformationController } from '@/controller/tracking_contract_information.controller';
import { TrackingContractInformationService } from '@/service/tracking_contract_information.service';
import { TrackingContractInformation } from '@/models/tracking_contract_information.model';
import { TrackingContractInformationRepository } from '@/repository/tracking_contract_information.repository';
import { ITrackingContractInformationService } from '@/service/interface/i.tracking_contract_information.service';
import { ITrackingContractInformationRepository } from '@/repository/interface/i.tracking_contract_information.repository';
import { BaseContainer } from '@/container/base.container';

class TrackingContractInformationContainer extends BaseContainer {
  constructor() {
    super(TrackingContractInformation);
    this.container
      .bind<ITrackingContractInformationService<TrackingContractInformation>>('TrackingContractInformationService')
      .to(TrackingContractInformationService);
    this.container
      .bind<
        ITrackingContractInformationRepository<TrackingContractInformation>
      >('TrackingContractInformationRepository')
      .to(TrackingContractInformationRepository);
    this.container.bind<TrackingContractInformationController>(TrackingContractInformationController).toSelf();
  }

  export() {
    const trackingContractInformationController = this.container.get<TrackingContractInformationController>(
      TrackingContractInformationController
    );
    const trackingContractInformationService = this.container.get<ITrackingContractInformationService<any>>(
      'TrackingContractInformationService'
    );
    return { trackingContractInformationController, trackingContractInformationService };
  }
}

const trackingContractInformationContainer = new TrackingContractInformationContainer();
const { trackingContractInformationController, trackingContractInformationService } =
  trackingContractInformationContainer.export();
export { trackingContractInformationController, trackingContractInformationService };
