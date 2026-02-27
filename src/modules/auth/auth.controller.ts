import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(
    @Body() signInInputDto: SigninInputDto,
  ): Promise<SigninOutputDto> {
    return this.authService.signin(signInInputDto);
  }
}
