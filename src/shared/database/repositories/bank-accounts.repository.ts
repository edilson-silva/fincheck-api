import { Injectable } from '@nestjs/common';
import { BankAccountBalanceEntity } from 'src/modules/bank-accounts/entities/bank-account-balance.entity';
import { BankAccountEntity } from 'src/modules/bank-accounts/entities/bank-account.entity';
import { BankAccountType } from 'src/modules/bank-accounts/types/bank-account-type.type';
import { TransactionType } from 'src/modules/transactions/types/transaction-type.type';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToBankAccountEntity(bankAccount: any): BankAccountEntity {
    return {
      id: bankAccount.id,
      userId: bankAccount.userId,
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance,
      type: bankAccount.type as BankAccountType,
      color: bankAccount.color,
    };
  }

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

    return this.mapToBankAccountEntity(newBankAccount);
  }

  async listByUserId(userId: string): Promise<BankAccountBalanceEntity[]> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    const bankAccountsWithCurrentBalance = bankAccounts.map((bankAccount) => {
      const totalTransactions = bankAccount.transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === TransactionType.INCOME
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;
      return {
        ...bankAccount,
        currentBalance,
      };
    });

    return bankAccountsWithCurrentBalance.map((bankAccount) => {
      delete bankAccount.transactions;

      return {
        ...bankAccount,
        type: bankAccount.type as BankAccountType,
      };
    });
  }

  async findById(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountEntity | null> {
    const bankAccount = await this.prismaService.bankAccount.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!bankAccount) return null;

    return this.mapToBankAccountEntity(bankAccount);
  }

  async update(
    userId: string,
    bankAccountId: string,
    data: Partial<BankAccountEntity>,
  ): Promise<BankAccountEntity> {
    const updatedBankAccount = await this.prismaService.bankAccount.update({
      where: {
        userId,
        id: bankAccountId,
      },
      data,
    });

    return this.mapToBankAccountEntity(updatedBankAccount);
  }

  async delete(userId: string, bankAccountId: string): Promise<void> {
    await this.prismaService.bankAccount.delete({
      where: {
        userId,
        id: bankAccountId,
      },
    });
  }
}
