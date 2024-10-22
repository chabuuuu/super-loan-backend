import { Receipt } from '@/models/receipt.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IReceiptRepository } from '@/repository/interface/i.receipt.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ReceiptRepository extends BaseRepository<Receipt> implements IReceiptRepository<Receipt> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Receipt));
  }
}
