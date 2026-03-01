import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from 'src/shared/config/contsnts';
import { AuthService } from './auth.service';
import { SignInInputDto, SignInOutputDto } from './dto/signin.dto';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SetMetadata(IS_PUBLIC, true)
  signup(@Body() signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    return this.authService.signup(signUpInputDto);
  }

  @Post('signin')
  @SetMetadata(IS_PUBLIC, true)
  signin(@Body() signInInputDto: SignInInputDto): Promise<SignInOutputDto> {
    return this.authService.signin(signInInputDto);
  }
}
