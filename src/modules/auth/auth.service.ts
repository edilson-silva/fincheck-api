import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { env } from 'src/shared/config/env';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { SigninInputDto, SigninOutputDto } from './dtos/signin';
import { SignupInputDto, SignupOutputDto } from './dtos/signup';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupInputDto: SignupInputDto): Promise<SignupOutputDto> {
    const { name, email, password } = signupInputDto;

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new ConflictException('E-mail already in use');
    }

    const hashedPassword = await hash(password, env.PASSWORD_HASH_SALT);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      categories: [
        { name: 'Salário', icon: 'money', type: 'INCOME' },
        { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
        { name: 'Outro', icon: 'other', type: 'INCOME' },
        { name: 'Casa', icon: 'home', type: 'EXPENSE' },
        { name: 'Alimentação', icon: 'foog', type: 'EXPENSE' },
        { name: 'Educação', icon: 'education', type: 'EXPENSE' },
        { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
        { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
        { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
        { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
        { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
        { name: 'Outro', icon: 'other', type: 'EXPENSE' },
      ],
    });

    const accessToken = await this.genrateToken(user.id);

    return { accessToken };
  }

  async signin(signinInputDto: SigninInputDto): Promise<SigninOutputDto> {
    const { email, password } = signinInputDto;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.genrateToken(user.id);

    return { accessToken };
  }

  private async genrateToken(userId: string): Promise<string> {
    const accessTokenPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(accessTokenPayload);

    return accessToken;
  }
}
