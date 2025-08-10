import { Body, Controller, Post } from '@nestjs/common';
import {
  UserCreateInputDto,
  UserCreateOutputDto,
} from './dtos/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() userCreateInputDto: UserCreateInputDto,
  ): Promise<UserCreateOutputDto> {
    return this.usersService.create(userCreateInputDto);
  }
}
