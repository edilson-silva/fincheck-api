import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { UserFindByIdOutputDto } from './dtos/user-find-by-id.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtModule)
  me(@ActiveUserId() userId: string): Promise<UserFindByIdOutputDto> {
    return this.usersService.getUserById(userId);
  }
}
