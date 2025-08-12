import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { UserGetByIdOutputDto } from './dtos/user-get-by-id.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<UserGetByIdOutputDto | null> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}
