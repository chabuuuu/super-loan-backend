import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Asset } from './asset.model';

@Entity('asset_types')
export class AssetType extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'asset_type_id' })
  assetTypeId!: string;

  @Column('varchar', { length: 255, name: 'asset_type_name' })
  assetTypeName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description!: string;

  @OneToMany(() => Asset, (asset) => asset.assetType)
  assets!: Promise<Asset[]>;
}
