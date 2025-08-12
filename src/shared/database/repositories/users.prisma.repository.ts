import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import {
  UserCreateInput,
  UserCreateOutput,
  UserFindOutput,
  UserGetByIdOutput,
  UsersRepository,
} from './users.repository';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userCreateInput: UserCreateInput): Promise<UserCreateOutput> {
    const createUserData = {
      name: userCreateInput.name,
      email: userCreateInput.email,
      password: userCreateInput.password,
    };

    if (userCreateInput.categories) {
      createUserData['categories'] = {
        createMany: { data: userCreateInput.categories },
      };
    }

    const user = await this.prismaService.user.create({ data: createUserData });

    return { id: user.id };
  }

  async findById(id: string): Promise<UserGetByIdOutput> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserFindOutput | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }
}
