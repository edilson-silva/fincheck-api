import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { TransactionListOutputDto } from './dto/transaction-list.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async list(userId: string): Promise<TransactionListOutputDto> {
    const transactions = await this.transactionsRepository.list(userId);

    return { transactions };
  }
}
