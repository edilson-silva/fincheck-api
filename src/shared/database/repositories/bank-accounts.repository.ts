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

  async list(userId: string): Promise<BankAccountEntity[]> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: {
        userId,
      },
    });

    return bankAccounts.map((bankAccount) => ({
      id: bankAccount.id,
      userId: bankAccount.userId,
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance,
      type: bankAccount.type as BankAccountType,
      color: bankAccount.color,
    }));
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

    if (!bankAccount) {
      return null;
    }

    return {
      id: bankAccount.id,
      userId: bankAccount.userId,
      name: bankAccount.name,
      initialBalance: bankAccount.initialBalance,
      type: bankAccount.type as BankAccountType,
      color: bankAccount.color,
    };
  }

  async update(
    userId: string,
    bankAccountId: string,
    data: Partial<BankAccountEntity>,
  ): Promise<BankAccountEntity> {
    const updatedBankAccount = await this.prismaService.bankAccount.update({
      where: {
        id: bankAccountId,
        userId,
      },
      data,
    });

    return {
      id: updatedBankAccount.id,
      userId: updatedBankAccount.userId,
      name: updatedBankAccount.name,
      initialBalance: updatedBankAccount.initialBalance,
      type: updatedBankAccount.type as BankAccountType,
      color: updatedBankAccount.color,
    };
  }
}
