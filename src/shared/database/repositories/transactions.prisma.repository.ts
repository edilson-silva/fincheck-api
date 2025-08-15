import { Injectable } from '@nestjs/common';
import { TransactionCreateInputDto } from 'src/modules/transactions/dto/transaction-create.dto';
import { PrismaService } from '../prisma.service';
import {
  TransactionCreateOutputDto,
  TransactionListOutput,
  TransactionsRepository,
} from './transactions.repository';

@Injectable()
export class TransactionPrismaRepository implements TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto> {
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

  async list(userId: string): Promise<TransactionListOutput> {
    const transaction = await this.prismaService.transaction.findMany({
      where: { userId },
    });

    return transaction;
  }
}
