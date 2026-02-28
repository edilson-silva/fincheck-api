import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { GetUserOutputDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<GetUserOutputDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ConflictException('User not found');
    }

    return { name: user.name, email: user.email };
  }
}
