import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  BankAccountCreateInput,
  BankAccountCreateOutput,
  BankAccountListOutput,
  BankAccountsRepository,
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
}
