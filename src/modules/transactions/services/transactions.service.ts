import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountsOwnershipValidateService } from '../../bank-accounts/services/bank-accounts-ownership-validate.service';
import { CategoriesOwnershipValidateService } from '../../categories/services/categories-ownership-validate.service';
import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from '../dto/transaction-create.dto';
import { TransactionDeleteOutputDto } from '../dto/transaction-delete.dto';
import {
  TransactionListInputDto,
  TransactionListOutputDto,
} from '../dto/transaction-list.dto';
import {
  TransactionUpdateInputDto,
  TransactionUpdateOutputDto,
} from '../dto/transaction-update.dto';
import { TransactionsOwnershipValidateService } from './transactions-ownership-validate.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly transactionsOwnershipValidateService: TransactionsOwnershipValidateService,
    private readonly bankAccountsOwnershipValidateService: BankAccountsOwnershipValidateService,
    private readonly categoriesOwnershipValidateService: CategoriesOwnershipValidateService,
  ) {}

  private async validateEntitiesOwnership({
    userId,
    transactionId,
    bankAccountId,
    categoryId,
  }: {
    userId: string;
    transactionId?: string;
    bankAccountId?: string;
    categoryId?: string;
  }): Promise<void> {
    await Promise.all([
      transactionId &&
        this.transactionsOwnershipValidateService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.bankAccountsOwnershipValidateService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.categoriesOwnershipValidateService.validate(userId, categoryId),
    ]);
  }

  async create(
    userId: string,
    transactionCreateInputDto: TransactionCreateInputDto,
  ): Promise<TransactionCreateOutputDto> {
    const { bankAccountId, categoryId } = transactionCreateInputDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return await this.transactionsRepository.create(
      userId,
      transactionCreateInputDto,
    );
  }

  async list(
    userId: string,
    transactionListInputDto: TransactionListInputDto,
  ): Promise<TransactionListOutputDto> {
    const transactions = await this.transactionsRepository.list(
      userId,
      transactionListInputDto,
    );

    return { transactions };
  }

  async update(
    userId: string,
    transactionId: string,
    transactionUpdateInputDto: TransactionUpdateInputDto,
  ): Promise<TransactionUpdateOutputDto> {
    const { bankAccountId, categoryId } = transactionUpdateInputDto;

    await this.validateEntitiesOwnership({
      userId,
      transactionId,
      bankAccountId,
      categoryId,
    });

    return await this.transactionsRepository.update(
      transactionId,
      transactionUpdateInputDto,
    );
  }

  async delete(
    userId: string,
    transactionId: string,
  ): Promise<TransactionDeleteOutputDto> {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });
    return await this.transactionsRepository.delete(transactionId);
  }
}
