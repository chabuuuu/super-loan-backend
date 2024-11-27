import { loanPackageController } from '@/container/loan_package.container';
import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const loanPackageRouter = express.Router();
loanPackageRouter
  .post('/create', classValidate(CreateLoanPackageReq), loanPackageController.createPackage.bind(loanPackageController))
  .get('/get-list', loanPackageController.getAll.bind(loanPackageController))
  .get('/get-detail/:id', loanPackageController.getLoanPackageDetail.bind(loanPackageController));

export default loanPackageRouter;
