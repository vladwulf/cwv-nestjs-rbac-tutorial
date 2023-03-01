import { Controller, Get, Param, ParseIntPipe, Session } from '@nestjs/common';
import { SessionData } from 'express-session';
import { UseRoles } from 'nest-access-control';
import { EmployeeDataService } from './employee-data.service';

@Controller('employee-data')
export class EmployeeDataController {
  constructor(private employeeDataService: EmployeeDataService) {}

  @UseRoles({
    resource: 'employeeData',
    action: 'read',
    possession: 'any'
  })
  @Get('all')
  getAllEmployees() {
    return this.employeeDataService.getAllEmployees();
  }

  @UseRoles({
    resource: 'managedEmployeeData',
    action: 'read',
    possession: 'any'
  })
  @Get()
  getManagedEmployees(@Session() session: SessionData) {
    return this.employeeDataService.getManagedEmployees(session.user.userId);
  }

  @UseRoles({
    resource: 'employeeDetails',
    action: 'read',
    possession: 'any'
  })
  @Get('employee/:employeeId')
  getEmployeeById(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.employeeDataService.getEmployeeById(employeeId);
  }

  @UseRoles({
    resource: 'employeeData',
    action: 'read',
    possession: 'any'
  })
  @Get('sector/:sector')
  getEmployeesBySector(
    @Param('sector') sector: string,
    @Session() session: SessionData
  ) {
    return this.employeeDataService.getEmployeesBySector(
      session.user.userId,
      session.user.roles[0],
      sector
    );
  }
}
