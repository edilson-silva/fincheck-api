import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salary', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Other', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Home', icon: 'home', type: 'EXPENSE' },
              { name: 'Food', icon: 'food', type: 'EXPENSE' },
              { name: 'Education', icon: 'education', type: 'EXPENSE' },
              { name: 'Fun', icon: 'fun', type: 'EXPENSE' },
              { name: 'Grocery', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Clothes', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transportation', icon: 'transport', type: 'EXPENSE' },
              { name: 'Travel', icon: 'travel', type: 'EXPENSE' },
              { name: 'Other', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
