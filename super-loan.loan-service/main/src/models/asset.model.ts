import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { AssetType } from './asset_type.model';
import { LoanRequestAssetDetail } from './loan_request_asset_detail.model';

@Entity('assets')
export class Asset extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'asset_id' })
  @OneToMany(() => LoanRequestAssetDetail, (loan_request_asset_detail) => loan_request_asset_detail.asset)
  assetId!: string;

  @ManyToOne(() => AssetType)
  @JoinColumn({ name: 'asset_type_id' })
  assetType!: AssetType;

  @Column('varchar', { length: 255, name: 'asset_name' })
  assetName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description!: string;
}
