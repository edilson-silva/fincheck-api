import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import {
  AuthenticateInputDto,
  AuthenticateOutputDto,
} from './dtos/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(
    authenticateInputDto: AuthenticateInputDto,
  ): Promise<AuthenticateOutputDto> {
    const { email, password } = authenticateInputDto;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessTokenPayload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(accessTokenPayload);

    return { accessToken };
  }
}
