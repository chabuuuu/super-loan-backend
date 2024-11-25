import { loanPackageController } from '@/container/loan_package.container';
import { CreateLoanPackageReq } from '@/dto/loan_package/create-loan-package.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const loanPackageRouter = express.Router();
loanPackageRouter
  .post('/create', classValidate(CreateLoanPackageReq), loanPackageController.createPackage.bind(loanPackageController))
  .get('/get-all')
  .get('/get-detail');

export default loanPackageRouter;
