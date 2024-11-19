import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Asset } from './asset.model';
import { AssetTypeStatus } from '@/enums/asset-type-status.enum';

@Entity('asset_types')
export class AssetType extends BaseModel {
  @PrimaryColumn({ name: 'asset_type_id' })
  assetTypeId!: string;

  @Column('varchar', { length: 255, name: 'asset_type_name' })
  assetTypeName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description?: string;

  @Column({ type: 'enum', enum: AssetTypeStatus, name: 'status', default: AssetTypeStatus.AVAILABLE })
  status!: string;

  @OneToMany(() => Asset, (asset) => asset.assetType)
  assets!: Promise<Asset[]>;
}
