import { AssetTypeStatus } from '@/enums/asset-type-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssetTypeUpdateReq {
  @IsNotEmpty()
  @IsString()
  assetTypeName!: string;

  @IsNotEmpty()
  @IsEnum(AssetTypeStatus)
  status!: string;
}
