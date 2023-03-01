import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeDataModule } from './employee-data/employee-data.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { UserModule } from './user/user.module';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac-policy';

@Module({
  imports: [
    AccessControlModule.forRoles(RBAC_POLICY),
    AuthModule,
    PrismaModule,
    EmployeeDataModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionGuard
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard
    }
  ]
})
export class AppModule {}
