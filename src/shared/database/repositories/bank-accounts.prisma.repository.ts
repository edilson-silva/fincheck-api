import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  BankAccountCreateInput,
  BankAccountCreateOutput,
  BankAccountFindOutput,
  BankAccountListOutput,
  BankAccountsRepository,
  BankAccountUpdateInput,
  BankAccountUpdateOutput,
} from './bank-accounts.repository';

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

  async list(userId: string): Promise<BankAccountListOutput> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: { userId },
    });

    return bankAccounts;
  }

  async update(
    userId: string,
    bankAccountId: string,
    bankAccountUpdateInput: BankAccountUpdateInput,
  ): Promise<BankAccountUpdateOutput> {
    const { name, initialBalance, color, type } = bankAccountUpdateInput;

    await this.prismaService.bankAccount.update({
      where: {
        id: bankAccountId,
      },
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
}
