import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { AssetType } from './asset_type.model';
import { LoanRequestAssetDetail } from './loan_request_asset_detail.model';
import { AssetStatus } from '@/enums/asset-status.enum';

@Entity('assets')
export class Asset extends BaseModel {
  @PrimaryColumn({ name: 'asset_id' })
  assetId!: string;

  @Column({ name: 'asset_type_id' })
  assetTypeId!: string;

  @ManyToOne(() => AssetType, { eager: true })
  @JoinColumn({ name: 'asset_type_id' })
  assetType!: AssetType;

  @Column('varchar', { length: 255, name: 'asset_name' })
  assetName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description?: string;

  @Column({ type: 'enum', enum: AssetStatus, name: 'status', default: AssetStatus.AVAILABLE })
  status!: string;
}
