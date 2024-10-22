import { TrackingContractInformation } from '@/models/tracking_contract_information.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ITrackingContractInformationRepository } from '@/repository/interface/i.tracking_contract_information.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TrackingContractInformationRepository
  extends BaseRepository<TrackingContractInformation>
  implements ITrackingContractInformationRepository<TrackingContractInformation>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TrackingContractInformation));
  }
}
