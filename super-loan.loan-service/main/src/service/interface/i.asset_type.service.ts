import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IAssetTypeService<T extends BaseModelType> extends IBaseCrudService<T> {}
