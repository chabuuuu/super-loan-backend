import { AssetStatus } from '@/enums/asset-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssetUpdateReq {
  @IsString()
  @IsNotEmpty()
  assetTypeId!: string;

  @IsString()
  @IsNotEmpty()
  assetName!: string;

  @IsNotEmpty()
  @IsEnum(AssetStatus)
  status!: string;
}
