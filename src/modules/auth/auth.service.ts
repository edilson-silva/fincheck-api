import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BCryptAdapter } from 'src/shared/adapters/bcrypt.adapter';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { SignInInputDto, SignInOutputDto } from './dto/signin.dto';
import { SignUpInputDto, SignUpOutputDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async generateAccessToken(
    userId: string,
    email: string,
  ): Promise<string> {
    const tokenPayload = { sub: userId, email };
    return await this.jwtService.signAsync(tokenPayload);
  }

  async signup(signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    const { name, email, password } = signUpInputDto;

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await BCryptAdapter.hash(password);

    const newUser = await this.usersRepository.create(
      name,
      email,
      hashedPassword,
    );

    const accessToken = await this.generateAccessToken(
      newUser.id,
      newUser.email,
    );

    return { accessToken };
  }

  async signin(signInInputDto: SignInInputDto): Promise<SignInOutputDto> {
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

    const accessToken = await this.generateAccessToken(user.id, user.email);

    return { accessToken };
  }
}
