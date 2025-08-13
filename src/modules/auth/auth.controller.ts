import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { SigninInputDto, SigninOutputDto } from './dtos/signin';
import { SignupInputDto, SignupOutputDto } from './dtos/signup';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public signup(
    @Body() signupInputDto: SignupInputDto,
  ): Promise<SignupOutputDto> {
    return this.authService.signup(signupInputDto);
  }

  @Post('signin')
  public signin(
    @Body() signinInputDto: SigninInputDto,
  ): Promise<SigninOutputDto> {
    return this.authService.signin(signinInputDto);
  }
}
