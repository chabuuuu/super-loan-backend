import { employeeController } from '@/container/employee.container';
import { CreateEmployeeReq } from '@/dto/employee/create-employee.req';
import { UpdateEmployeeReq } from '@/dto/employee/update-employee.req';
import { authenticateJWT } from '@/middleware/authenticate.middelware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const employeeRouter = express.Router();

employeeRouter

  .put(
    '/:id',
    classValidate(UpdateEmployeeReq),
    authenticateJWT,
    employeeController.updateEmployee.bind(employeeController)
  )

  .post('/login', employeeController.login.bind(employeeController))

  .post('/', classValidate(CreateEmployeeReq), authenticateJWT, employeeController.create.bind(employeeController))

  .get('/by-role/:roleId', employeeController.getEmployeesByRole.bind(employeeController))

  .get('/search', employeeController.searchEmployee.bind(employeeController))

  .get('/:id', employeeController.getDetail.bind(employeeController));

export default employeeRouter;
