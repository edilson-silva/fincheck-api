import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';
import { UserGetByIdOutputDto } from './dtos/user-get-by-id.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtModule)
  me(@Req() request: Request): Promise<UserGetByIdOutputDto> {
    const userId = request.userId;
    return this.usersService.getUserById(userId);
  }
}
