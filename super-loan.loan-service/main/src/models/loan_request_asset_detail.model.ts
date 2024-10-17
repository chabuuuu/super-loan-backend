import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base.model';
import { LoanRequest } from './loan_request.model';
import { Asset } from './asset.model';

@Entity('loan_request_asset_details')
export class LoanRequestAssetDetail extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'loan_request_asset_detail_id' })
  loanRequestAssetDetailID!: string;

  @ManyToOne(() => LoanRequest)
  @JoinColumn({ name: 'loan_request_id' })
  loanRequest!: LoanRequest;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset!: Asset;

  @Column('text', { nullable: true, name: 'proof_document' })
  proofDocument!: string;

  @Column('text', { nullable: true, name: 'legal_ownership' })
  legalOwnership!: string;

  @Column('text', { nullable: true, name: 'description' })
  description!: string;
}
