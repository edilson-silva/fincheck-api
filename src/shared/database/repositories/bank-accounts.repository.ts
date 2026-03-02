import { Injectable } from '@nestjs/common';
import { BankAccountEntity } from 'src/modules/bank-accounts/entities/bank-account.entity';
import { BankAccountType } from 'src/modules/bank-accounts/types/bank-accounts-type.type';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    name: string,
    initialBalance: number,
    type: BankAccountType,
    color: string,
  ): Promise<BankAccountEntity> {
    const newBankAccount = await this.prismaService.bankAccount.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });

    return {
      id: newBankAccount.id,
      userId: newBankAccount.userId,
      name: newBankAccount.name,
      initialBalance: newBankAccount.initialBalance,
      type: newBankAccount.type as BankAccountType,
      color: newBankAccount.color,
    };
  }
}
