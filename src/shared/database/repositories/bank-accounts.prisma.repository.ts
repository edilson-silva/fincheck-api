import { Injectable } from '@nestjs/common';
import { TransactionType } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import {
  BankAccountCreateInput,
  BankAccountCreateOutput,
  BankAccountDeleteOutput,
  BankAccountFindOutput,
  BankAccountListOutput,
  BankAccountsRepository,
  BankAccountUpdateInput,
  BankAccountUpdateOutput,
} from './bank-accounts.repository';
import { TransactionResume } from './transactions.repository';

@Injectable()
export class BankAccountsPrismaRepository implements BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    bankAccountCreateInput: BankAccountCreateInput,
  ): Promise<BankAccountCreateOutput> {
    const { name, initialBalance, color, type } = bankAccountCreateInput;

    await this.prismaService.bankAccount.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async find(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountFindOutput> {
    const bankAccount = await this.prismaService.bankAccount.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    return bankAccount;
  }

  async list(userId: string): Promise<BankAccountListOutput> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc: number, transaction: TransactionResume) =>
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
  }

  async update(
    bankAccountId: string,
    bankAccountUpdateInput: BankAccountUpdateInput,
  ): Promise<BankAccountUpdateOutput> {
    const { name, initialBalance, color, type } = bankAccountUpdateInput;

    await this.prismaService.bankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async delete(bankAccountId: string): Promise<BankAccountDeleteOutput> {
    await this.prismaService.bankAccount.delete({
      where: {
        id: bankAccountId,
      },
    });
  }
}
