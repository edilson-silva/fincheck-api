import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { env } from 'src/shared/config/env';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import {
  UserCreateInputDto,
  UserCreateOutputDto,
} from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(
    userCreateInputDto: UserCreateInputDto,
  ): Promise<UserCreateOutputDto> {
    const { name, email, password } = userCreateInputDto;

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new ConflictException('E-mail already in use');
    }

    const hashedPassword = await hash(password, env.PASSWORD_HASH_SALT);

    this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      categories: [
        { name: 'Salário', icon: 'money', type: 'INCOME' },
        { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
        { name: 'Outro', icon: 'other', type: 'INCOME' },
        { name: 'Casa', icon: 'home', type: 'EXPENSE' },
        { name: 'Alimentação', icon: 'foog', type: 'EXPENSE' },
        { name: 'Educação', icon: 'education', type: 'EXPENSE' },
        { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
        { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
        { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
        { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
        { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
        { name: 'Outro', icon: 'other', type: 'EXPENSE' },
      ],
    });
  }
}
