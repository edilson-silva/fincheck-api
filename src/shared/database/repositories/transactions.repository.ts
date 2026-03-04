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
}
