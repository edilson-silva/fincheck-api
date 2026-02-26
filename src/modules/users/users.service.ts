import { ConflictException, Injectable } from '@nestjs/common';
import { BCryptAdapter } from 'src/shared/adapters/bcrypt.adapter';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const emailTaken = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await BCryptAdapter.hash(password);

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
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

    return user;
  }
}
