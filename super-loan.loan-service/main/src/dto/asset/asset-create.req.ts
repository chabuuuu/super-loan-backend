import { IsNotEmpty, IsString } from 'class-validator';

export class AssetCreateReq {
  @IsNotEmpty()
  @IsString()
  assetTypeId!: string;

  @IsString()
  @IsNotEmpty()
  assetName!: string;
}
