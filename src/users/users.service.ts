import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailAlreadyInUse = await this.prismaClient.user.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new ConflictException('E-mail already in use');
    }

    const user = this.prismaClient.user.create({
      data: { name, email, password },
    });

    return user;
  }
}
