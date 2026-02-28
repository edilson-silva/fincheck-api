import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetUserOutputDto } from './dto/get-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@Req() request: Request): Promise<GetUserOutputDto> {
    return await this.usersService.getUserById(request['userId']);
  }
}
