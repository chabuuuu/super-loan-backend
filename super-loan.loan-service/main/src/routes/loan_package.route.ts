import { Permissions } from '@/constants/permission.constants';
import { loanPackageController } from '@/container/loan_package.container';
import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const loanPackageRouter = express.Router();
loanPackageRouter
  .post(
    '/create',
    authenticateJWT,
    checkPermission([Permissions.QUAN_LY_GOI_VAY]),
    classValidate(CreateLoanPackageReq),
    loanPackageController.createPackage.bind(loanPackageController)
  )
  .get('/get-list', loanPackageController.getAll.bind(loanPackageController))
  .get('/get-detail/:id', loanPackageController.getLoanPackageDetail.bind(loanPackageController));

export default loanPackageRouter;
