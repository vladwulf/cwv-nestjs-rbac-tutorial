import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getMe(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        createdAt: true,
        username: true,
        fullName: true,
        departmentsLink: {
          include: {
            department: true
          }
        }
      }
    });
  }

  async promoteUserToManager(employeeId: number) {
    const departmentLink = await this.prisma.userDepartmentLink.findFirst({
      where: {
        userId: employeeId
      }
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.userDepartmentLink.update({
      where: {
        id: departmentLink.id
      },
      data: {
        role: Role.MANAGER
      }
    });
  }

  async demoteManagerToUser(employeeId: number) {
    const departmentLink = await this.prisma.userDepartmentLink.findFirst({
      where: {
        userId: employeeId
      }
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.userDepartmentLink.update({
      where: {
        id: departmentLink.id
      },
      data: {
        role: Role.USER
      }
    });
  }
}
