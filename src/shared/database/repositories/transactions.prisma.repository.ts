import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  TransactionCreateInput,
  TransactionCreateOutput,
  TransactionDeleteOutput,
  TransactionFindOutput,
  TransactionListInput,
  TransactionListOutput,
  TransactionsRepository,
  TransactionUpdateInput,
  TransactionUpdateOutput,
} from './transactions.repository';

@Injectable()
export class TransactionPrismaRepository implements TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInput,
  ): Promise<TransactionCreateOutput> {
    const { bankAccountId, categoryId, name, value, date, type } =
      transactionCreateInputDto;

    await this.prismaService.transaction.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  async find(
    userId: string,
    transactionId: string,
  ): Promise<TransactionFindOutput> {
    return await this.prismaService.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async list(
    userId: string,
    transactionListInput: TransactionListInput,
  ): Promise<TransactionListOutput> {
    const { month, year, bankAccountId } = transactionListInput;
    const filterCurrentMonth = new Date(Date.UTC(year, month - 1));
    const filterNextMonth = new Date(Date.UTC(year, month));

    const transaction = await this.prismaService.transaction.findMany({
      where: {
        userId,
        date: {
          gte: filterCurrentMonth,
          lt: filterNextMonth,
        },
        bankAccountId,
      },
    });

    return transaction;
  }

  async update(
    transactionId: string,
    transactionUpdateInput: TransactionUpdateInput,
  ): Promise<TransactionUpdateOutput> {
    const { bankAccountId, categoryId, name, value, date, type } =
      transactionUpdateInput;

    await this.prismaService.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  async delete(transactionId: string): Promise<TransactionDeleteOutput> {
    await this.prismaService.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
