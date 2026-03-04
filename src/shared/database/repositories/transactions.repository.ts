import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionType } from 'src/modules/transactions/types/transaction-type.type';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToTransactionEntity(transaction: any): TransactionEntity {
    return {
      id: transaction.id,
      userId: transaction.userId,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: transaction.name,
      value: transaction.value,
      date: transaction.date,
      type: transaction.type as TransactionType,
    };
  }

  async findById(
    userId: string,
    transactionId: string,
  ): Promise<TransactionEntity | null> {
    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        userId,
        id: transactionId,
      },
    });

    if (!transaction) return null;

    return this.mapToTransactionEntity(transaction);
  }

  async create(
    userId: string,
    bankAccountId: string,
    categoryId: string,
    name: string,
    value: number,
    date: Date,
    type: TransactionType,
  ): Promise<TransactionEntity> {
    const createdTransaction = await this.prismaService.transaction.create({
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

    return this.mapToTransactionEntity(createdTransaction);
  }

  async listByUserId(
    userId: string,
    month: number,
    year: number,
    bankAccountId?: string,
    transactionType?: TransactionType,
  ): Promise<TransactionEntity[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(year, month - 1, 1)),
          lt: new Date(Date.UTC(year, month, 1, 1)),
        },
        bankAccountId,
        type: transactionType,
      },
    });

    return transactions.map((transactions) =>
      this.mapToTransactionEntity(transactions),
    );
  }

  async update(
    userId: string,
    transactionId: string,
    data: Partial<TransactionEntity>,
  ): Promise<TransactionEntity> {
    const updatedTransaction = await this.prismaService.transaction.update({
      where: {
        userId,
        id: transactionId,
      },
      data,
    });

    return this.mapToTransactionEntity(updatedTransaction);
  }

  async delete(userId: string, transactionId: string): Promise<void> {
    await this.prismaService.transaction.delete({
      where: {
        userId,
        id: transactionId,
      },
    });
  }
}
