import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesPrismaRepository } from './repositories/categories.prisma.repository';
import { CategoriesRepository } from './repositories/categories.repository';
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
    {
      provide: CategoriesRepository,
      useClass: CategoriesPrismaRepository,
    },
  ],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
