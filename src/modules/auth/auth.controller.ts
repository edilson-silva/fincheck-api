import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticateInputDto,
  AuthenticateOutputDto,
} from './dtos/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  public authenticate(
    @Body() authenticateInputDto: AuthenticateInputDto,
  ): Promise<AuthenticateOutputDto> {
    return this.authService.authenticate(authenticateInputDto);
  }
}
