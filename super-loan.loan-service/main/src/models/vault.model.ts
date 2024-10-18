import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('vaults')
export class Vault extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'vault_id' })
  vaultId!: string;

  @Column('varchar', { length: 255, name: 'vault_name' })
  vaultName!: string;

  @Column('decimal', { precision: 15, scale: 2, name: 'cash_amount' })
  cashAmount!: number;

  @Column('decimal', { precision: 15, scale: 2, name: 'account_amount' })
  accountAmount!: number;

  @Column('text', { nullable: true, name: 'description' })
  description!: string | null;
}
