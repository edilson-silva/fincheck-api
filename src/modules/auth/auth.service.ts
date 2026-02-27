import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BCryptAdapter } from 'src/shared/adapters/bcrypt.adapter';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { SigninInputDto, SigninOutputDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signin(signInInputDto: SigninInputDto): Promise<SigninOutputDto> {
    const { email, password } = signInInputDto;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await BCryptAdapter.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPayload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken };
  }
}
