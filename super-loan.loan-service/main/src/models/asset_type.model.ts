import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Asset } from './asset.model';

@Entity('asset_types')
export class AssetType extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'asset_type_id' })
  @OneToMany(() => Asset, (asset) => asset.assetType)
  assetTypeID!: string;

  @Column('varchar', { length: 255, name: 'asset_type_name' })
  assetTypeName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description!: string;
}
