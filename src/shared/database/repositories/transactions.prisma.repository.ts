import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  TransactionListOutput,
  TransactionsRepository,
} from './transactions.repository';

@Injectable()
export class TransactionPrismaRepository implements TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(userId: string): Promise<TransactionListOutput> {
    const transaction = await this.prismaService.transaction.findMany({
      where: { userId },
    });

    return transaction;
  }
}
