import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      },
      include: {
        departmentsLink: {
          select: {
            role: true
          }
        }
      }
    });
    if (!user) return null;

    const pwValid = await argon.verify(user.password, password);
    if (!pwValid) return null;

    return user;
  }
}
