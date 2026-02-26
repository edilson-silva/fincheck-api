import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto, CreateUserOutputDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    return this.usersService.create(createUserInputDto);
  }
}
