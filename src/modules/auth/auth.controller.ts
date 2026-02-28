import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    return this.authService.signup(signUpInputDto);
  }

  @Post('signin')
  authenticate(
    @Body() signInInputDto: SigninInputDto,
  ): Promise<SigninOutputDto> {
    return this.authService.signin(signInInputDto);
  }
}
