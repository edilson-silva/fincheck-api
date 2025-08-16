import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  TransactionCreateInput,
  TransactionCreateOutput,
  TransactionFindOutput,
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

  async update(
    userId: string,
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

  async list(userId: string): Promise<TransactionListOutput> {
    const transaction = await this.prismaService.transaction.findMany({
      where: { userId },
    });

    return transaction;
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
}
