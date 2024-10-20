import { ErrorCode } from '@/enums/error-code.enums';
import appraisalRouter from '@/routes/appraisal.route';
import assetRouter from '@/routes/asset.route';
import assetTypeRouter from '@/routes/asset_type.route';
import borrowerRouter from '@/routes/borrower.route';
import contractRouter from '@/routes/contract.route';
import disbursementPlanRouter from '@/routes/disbursement_plan.route';
import employeeRouter from '@/routes/employee.route';
import lenderRouter from '@/routes/lender.route';
import loanPackageRouter from '@/routes/loan_package.route';
import loanRequestRouter from '@/routes/loan_request.route';
import loanRequestAssetDetailRouter from '@/routes/loan_request_asset_detail.route';
import notificationRouter from '@/routes/notification.route';
import paymentInstallmentRouter from '@/routes/payment_installment.route';
import paymentPlanRouter from '@/routes/payment_plan.route';
import paymentSlipRouter from '@/routes/payment_slip.route';
import receiptRouter from '@/routes/receipt.route';
import roleRouter from '@/routes/role.route';
import statusContractRouter from '@/routes/status_contract.route';
import trackingContractInformationRouter from '@/routes/tracking_contract_information.route';
import vaultRouter from '@/routes/vault.route';
import versionLoanPackageRouter from '@/routes/version_loan_package.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use('/appraisal', appraisalRouter);
  app.use('/asset_type', assetTypeRouter);
  app.use('/asset', assetRouter);
  app.use('/borrower', borrowerRouter);
  app.use('/contract', contractRouter);
  app.use('/disbursement-plan', disbursementPlanRouter);
  app.use('/employee', employeeRouter);
  app.use('/lender', lenderRouter);
  app.use('/loan-package', loanPackageRouter);
  app.use('/loan-request-asset-detail', loanRequestAssetDetailRouter);
  app.use('/loan-request', loanRequestRouter);
  app.use('/notification', notificationRouter);
  app.use('/payment-installment', paymentInstallmentRouter);
  app.use('/payment-plan', paymentPlanRouter);
  app.use('/payment-slip', paymentSlipRouter);
  app.use('/receipt', receiptRouter);
  app.use('/role', roleRouter);
  app.use('/status-contract', statusContractRouter);
  app.use('/tracking-contract-information', trackingContractInformationRouter);
  app.use('/vault', vaultRouter);
  app.use('/version-loan-package', versionLoanPackageRouter);

  //Check health
  app.get(`/health`, (req: any, res: any) => {
    res.json({
      message: 'OK'
    });
  });
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
