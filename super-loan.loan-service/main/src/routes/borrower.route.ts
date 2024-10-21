import { borrowerController } from '@/container/borrower.container';
import { RegisterBorrowerReq } from '@/dto/borrower/register-borrower.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const borrowerRouter = express.Router();
borrowerRouter.post(
  '/register',
  classValidate(RegisterBorrowerReq),
  borrowerController.register.bind(borrowerController)
);

export default borrowerRouter;
