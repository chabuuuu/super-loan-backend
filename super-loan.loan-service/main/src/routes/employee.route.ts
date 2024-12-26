import { Permissions } from '@/constants/permission.constants';
import { employeeController } from '@/container/employee.container';
import { CreateEmployeeReq } from '@/dto/employee/create-employee.req';
import { UpdateEmployeeReq } from '@/dto/employee/update-employee.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const employeeRouter = express.Router();

employeeRouter

  .put(
    '/:id',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    classValidate(UpdateEmployeeReq),
    employeeController.updateEmployee.bind(employeeController)
  )

  .post('/login', employeeController.login.bind(employeeController))

  .post(
    '/',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    classValidate(CreateEmployeeReq),
    employeeController.create.bind(employeeController)
  )

  .get('/get-profile', authenticateJWT, employeeController.getMyProfile.bind(employeeController))

  .get(
    '/by-role/:roleId',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    employeeController.getEmployeesByRole.bind(employeeController)
  )

  .get(
    '/search',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    employeeController.searchEmployee.bind(employeeController)
  )

  .get(
    '/:id',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    employeeController.getDetail.bind(employeeController)
  )

  .delete(
    '/:id',
    authenticateJWT,
    checkPermission([Permissions.QUAY_LY_NHAN_VIEN]),
    employeeController.deleteById.bind(employeeController)
  );

export default employeeRouter;
