import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { LenderProfile } from './lender_profile.model';
import { Contract } from './contract.model';

@Entity('lenders')
export class Lender extends BaseModel {
  @PrimaryGeneratedColumn('uuid', { name: 'lender_id' })
  lenderId!: string;

  @Column('varchar', { length: 255, name: 'email' })
  email!: string;

  @Column('varchar', { length: 15, name: 'phone_number' })
  phoneNumber!: string;

  @Column('varchar', { length: 255, name: 'password' })
  password!: string;

  @Column('varchar', { length: 50, nullable: true, name: 'social_login_type' })
  socialLoginType?: string;

  @Column('varchar', { length: 255, nullable: true, name: 'social_uid' })
  socialUid!: string | null;

  @Column('varchar', { length: 50, name: 'status' })
  status!: string;

  @OneToOne(() => LenderProfile, (lenderProfile) => lenderProfile.lender)
  lenderProfiles!: LenderProfile;

  @OneToMany(() => Contract, (contract) => contract.lender)
  contracts!: Promise<Contract[]>;
}
