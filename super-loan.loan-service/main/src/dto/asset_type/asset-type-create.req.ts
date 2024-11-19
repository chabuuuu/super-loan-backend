import { AssetTypeStatus } from '@/enums/asset-type-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssetTypeCreateReq {
  @IsNotEmpty()
  @IsString()
  assetTypeName!: string;
}
