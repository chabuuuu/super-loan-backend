import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { Appraisal } from './appraisal.model';
import { LoanRequestAssetDetail } from './loan_request_asset_detail.model';
import { Asset } from './asset.model';

@Entity('appraisal_details')
export class AppraisalDetail extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'detail_appraisal_id' })
  detailAppraisalId!: string;

  @ManyToOne(() => Appraisal)
  @JoinColumn({ name: 'appraisal_id' })
  appraisal!: Appraisal;

  @ManyToOne(() => LoanRequestAssetDetail)
  @JoinColumn({ name: 'loan_request_asset_detail_id' })
  loanRequestAssetDetail!: LoanRequestAssetDetail;

  /*
   * Cỏ vẻ là không cần => sẽ bàn bạc lại sau
   */

  // @ManyToOne(() => Asset)
  // @JoinColumn({ name: 'asset_id' })
  // asset!: Asset;

  @Column('decimal', { precision: 15, scale: 2, name: 'appraisal_amount' })
  appraisalAmount!: number;

  @Column('varchar', { length: 255, nullable: true })
  surveyor!: string | null;

  @Column('text', { nullable: true, name: 'notes' })
  note!: string | null;
}
