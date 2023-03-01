import { Module } from '@nestjs/common';
import { EmployeeDataService } from './employee-data.service';
import { EmployeeDataController } from './employee-data.controller';

@Module({
  providers: [EmployeeDataService],
  controllers: [EmployeeDataController]
})
export class EmployeeDataModule {}
