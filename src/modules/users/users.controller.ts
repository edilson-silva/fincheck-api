import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { UserGetByIdOutputDto } from './dtos/user-get-by-id.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtModule)
  me(@ActiveUserId() userId: string): Promise<UserGetByIdOutputDto> {
    return this.usersService.getUserById(userId);
  }
}
