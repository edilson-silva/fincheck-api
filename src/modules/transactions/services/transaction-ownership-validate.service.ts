import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class TransactionOwnershipValidateService {
  constructor(private readonly transactionRepository: TransactionsRepository) {}

  async validate(userId: string, transactionId: string) {
    const transaction = await this.transactionRepository.findById(
      userId,
      transactionId,
    );

    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }
  }
}
