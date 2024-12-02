import { employeeController } from '@/container/employee.container';
import express from 'express';
const employeeRouter = express.Router();

employeeRouter

  .post('/login', employeeController.login.bind(employeeController))

  .get('/by-role/:roleId', employeeController.getEmployeesByRole.bind(employeeController));

export default employeeRouter;
