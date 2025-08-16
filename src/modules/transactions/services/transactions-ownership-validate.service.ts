import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { TransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionsOwnershipValidateService {
  constructor(private readonly transactionRepository: TransactionsRepository) {}

  async validate(
    userId: string,
    transactionId: string,
  ): Promise<TransactionDto> {
    const transaction = await this.transactionRepository.find(
      userId,
      transactionId,
    );

    if (!transaction) throw new NotFoundException('Transaction not found');

    return transaction;
  }
}
