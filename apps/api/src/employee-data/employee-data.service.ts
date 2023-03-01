import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeDataService {
  constructor(private prisma: PrismaService) {}

  getAllEmployees() {
    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: {
              not: Role.ADMIN
            }
          }
        }
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            role: true,
            department: true,
            jobTitle: true
          }
        },
        contactInfo: true,
        salary: true
      }
    });
  }

  async getManagedEmployees(managerId: number) {
    const departments = await this.prisma.user.findFirst({
      where: {
        id: managerId
      },
      select: {
        departmentsLink: {
          select: {
            role: true,
            jobTitle: true,
            department: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const sections = departments.departmentsLink.map(
      (dep) => dep.department.name
    );

    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              name: {
                in: sections
              }
            }
          }
        }
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            role: true,
            department: true,
            jobTitle: true
          }
        },
        contactInfo: true,
        salary: true
      }
    });
  }

  async getEmployeeById(employeeId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: employeeId
      },
      select: {
        id: true,
        createdAt: true,
        fullName: true,
        salary: true,
        username: true,
        contactInfo: true,
        departmentsLink: {
          select: {
            jobTitle: true,
            role: true,
            assignedAt: true,
            assignedBy: true,
            department: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
  }

  async getEmployeesBySector(userId: number, role: Role, sector: string) {
    if (role === Role.ADMIN) {
      return this.prisma.user.findMany({
        where: {
          departmentsLink: {
            every: {
              role: Role.USER,
              department: {
                name: {
                  contains: sector
                }
              }
            }
          }
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          departmentsLink: {
            select: {
              department: true,
              jobTitle: true
            }
          },
          contactInfo: true,
          salary: true
        }
      });
    }

    // check if user has access to the department
    const department = await this.prisma.department.findFirst({
      where: {
        name: {
          contains: sector
        },
        usersLink: {
          some: {
            role: Role.MANAGER,
            userId
          }
        }
      }
    });
    if (!department) throw new ForbiddenException('Insufficient permissions');

    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              name: {
                contains: sector
              }
            }
          }
        }
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            department: true,
            jobTitle: true
          }
        },
        contactInfo: true,
        salary: true
      }
    });
  }
}
