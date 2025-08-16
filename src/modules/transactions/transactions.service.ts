import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountsOwnershipValidateService } from '../bank-accounts/services/bank-accounts-ownership-validate.service';
import { CategoriesOwnershipValidateService } from '../categories/services/categories-ownership-validate.service';
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './dto/transaction-create.dto';
import { TransactionListOutputDto } from './dto/transaction-list.dto';
import {
  TransactionUpdateInputDto,
  TransactionUpdateOutputDto,
} from './dto/transaction-update.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountsOwnershipValidateService: BankAccountsOwnershipValidateService,
    private readonly categoriesOwnershipValidateService: CategoriesOwnershipValidateService,
  ) {}

  private async validateEntitiesOwnership(
    userId: string,
    bankAccountId: string,
    categoryId: string,
  ): Promise<void> {
    await Promise.all([
      this.bankAccountsOwnershipValidateService.validate(userId, bankAccountId),
      this.categoriesOwnershipValidateService.validate(userId, categoryId),
    ]);
  }

  async create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto> {
    const { bankAccountId, categoryId } = transactionCreateInputDto;

    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

    return await this.transactionsRepository.create(
      userId,
      transactionCreateInputDto,
    );
  }

  async update(
    userId: string,
    transactionId: string,
    transactionUpdateInputDto: TransactionUpdateInputDto,
  ): Promise<TransactionUpdateOutputDto> {
    const { bankAccountId, categoryId } = transactionUpdateInputDto;

    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

    return await this.transactionsRepository.update(
      userId,
      transactionId,
      transactionUpdateInputDto,
    );
  }

  async list(userId: string): Promise<TransactionListOutputDto> {
    const transactions = await this.transactionsRepository.list(userId);

    return { transactions };
  }
}
