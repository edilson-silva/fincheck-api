import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { SignInInputDto, SignInOutputDto } from './dto/signin.dto';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    return this.authService.signup(signUpInputDto);
  }

  @Post('signin')
  signin(@Body() signInInputDto: SignInInputDto): Promise<SignInOutputDto> {
    return this.authService.signin(signInInputDto);
  }
}
