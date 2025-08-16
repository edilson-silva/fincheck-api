import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { UserFindByIdOutputDto } from './dtos/user-find-by-id.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<UserFindByIdOutputDto | null> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}
