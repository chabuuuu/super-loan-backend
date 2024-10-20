import 'dotenv/config';
import { Role } from '../models/role.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { Appraisal } from '@/models/appraisal.model';
import { AppraisalDetail } from '@/models/appraisal_detail.model';
import { AssetType } from '@/models/asset_type.model';
import { Asset } from '@/models/asset.model';
import { BaseModel } from '@/models/base.model';
import { BorrowerProfile } from '@/models/borrower_profile.model';
import { Borrower } from '@/models/borrower.model';
import { Contract } from '@/models/contract.model';
import { DisbursementPlan } from '@/models/disbursement_plan.model';
import { EmployeeProfile } from '@/models/employee_profile.model';
import { Employee } from '@/models/employee.model';
import { LenderProfile } from '@/models/lender_profile.model';
import { Lender } from '@/models/lender.model';
import { LoanPackage } from '@/models/loan_package.model';
import { LoanRequestAssetDetail } from '@/models/loan_request_asset_detail.model';
import { LoanRequest } from '@/models/loan_request.model';
import { Notification } from '@/models/notification.model';
import { PaymentInstallment } from '@/models/payment_installment.model';
import { PaymentPlan } from '@/models/payment_plan.model';
import { PaymentSlip } from '@/models/payment_slip.model';
import { PermissionSpecific } from '@/models/permission_specific.model';
import { Permission } from '@/models/permission.model';
import { Receipt } from '@/models/receipt.model';
import { RolePermission } from '@/models/role_permission.model';
import { StatusContract } from '@/models/status_contract.model';
import { TrackingContractInformation } from '@/models/tracking_contract_information.model';
import { Vault } from '@/models/vault.model';
import { VersionLoanPackage } from '@/models/version_loan_package.model';

const models = [
  Role,
  Appraisal,
  AppraisalDetail,
  AssetType,
  Asset,
  BaseModel,
  BorrowerProfile,
  Borrower,
  Contract,
  DisbursementPlan,
  EmployeeProfile,
  Employee,
  LenderProfile,
  Lender,
  LoanPackage,
  LoanRequestAssetDetail,
  LoanRequest,
  Notification,
  PaymentInstallment,
  PaymentPlan,
  PaymentSlip,
  PermissionSpecific,
  Permission,
  Receipt,
  RolePermission,
  StatusContract,
  TrackingContractInformation,
  Vault,
  VersionLoanPackage
];

export class AppDataSourceSingleton {
  private static instance: DataSource;

  private constructor() {}
  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL || 'postgres://username:password@host:port/database',
        entities: ['dist/models/*.js'],
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js']
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
