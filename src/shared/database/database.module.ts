import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsPrismaRepository } from './repositories/bank-accounts.prisma.repository';
import { BankAccountsRepository } from './repositories/bank-accounts.repository';
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
    {
      provide: BankAccountsRepository,
      useClass: BankAccountsPrismaRepository,
    },
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
