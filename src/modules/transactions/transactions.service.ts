import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountsOwnershipValidateService } from '../bank-accounts/services/bank-accounts-ownership-validate.service';
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './dto/transaction-create.dto';
import { TransactionListOutputDto } from './dto/transaction-list.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountsOwnershipValidateService: BankAccountsOwnershipValidateService,
  ) {}

  async create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto> {
    const { bankAccountId } = transactionCreateInputDto;
    await this.bankAccountsOwnershipValidateService.validate(
      userId,
      bankAccountId,
    );

    return await this.transactionsRepository.create(
      userId,
      transactionCreateInputDto,
    );
  }

  async list(userId: string): Promise<TransactionListOutputDto> {
    const transactions = await this.transactionsRepository.list(userId);

    return { transactions };
  }
}
