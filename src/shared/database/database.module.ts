import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
