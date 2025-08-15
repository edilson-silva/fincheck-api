import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsPrismaRepository } from './repositories/bank-accounts.prisma.repository';
import { BankAccountsRepository } from './repositories/bank-accounts.repository';
import { CategoriesPrismaRepository } from './repositories/categories.prisma.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { TransactionPrismaRepository } from './repositories/transactions.prisma.repository';
import { TransactionsRepository } from './repositories/transactions.repository';
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
    {
      provide: TransactionsRepository,
      useClass: TransactionPrismaRepository,
    },
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
