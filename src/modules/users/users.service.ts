import { ConflictException, Injectable } from '@nestjs/common';
import { BCryptAdapter } from 'src/shared/adapters/bcrypt.adapter';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { CreateUserInputDto, CreateUserOutputDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(
    createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const { name, email, password } = createUserInputDto;
    const emailTaken = await this.usersRepository.findByEmail(email);

    if (emailTaken) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await BCryptAdapter.hash(password);

    const user = await this.usersRepository.create(name, email, hashedPassword);

    return user;
  }
}
