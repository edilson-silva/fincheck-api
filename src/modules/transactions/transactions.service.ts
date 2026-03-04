import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountOwnershipValidateService } from '../bank-accounts/services/bank-account-ownership-validate.service';
import { CategoryOwnershipValidateService } from '../categories/services/category-ownership-validate.service';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './dto/create-transaction.dto';
import { ListTransactionsOutputDto } from './dto/list-transaction.dto';
import {
  UpdateTransactionInputDto,
  UpdateTransactionOutputDto,
} from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountOwnershipValidate: BankAccountOwnershipValidateService,
    private readonly categoryOwnershipValidate: CategoryOwnershipValidateService,
  ) {}

  private async validateEntitiesOwnership(
    userId: string,
    bankAccountId: string,
    categoryId: string,
    transactionId?: string,
  ) {
    if (transactionId) {
      const transaction = await this.transactionsRepository.findById(
        userId,
        transactionId,
      );

      if (!transaction) {
        throw new NotFoundException('Transaction not found.');
      }
    }

    await Promise.all([
      this.bankAccountOwnershipValidate.validate(userId, bankAccountId),
      this.categoryOwnershipValidate.validate(userId, categoryId),
    ]);
  }

  async create(
    userId: string,
    createTransactionInputDto: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionInputDto;

    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

    return this.transactionsRepository.create(
      userId,
      bankAccountId,
      categoryId,
      name,
      value,
      new Date(date),
      type,
    );
  }

  async lisByUserId(userId: string): Promise<ListTransactionsOutputDto> {
    return await this.transactionsRepository.listByUserId(userId);
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionInputDto: UpdateTransactionInputDto,
  ): Promise<UpdateTransactionOutputDto> {
    const { bankAccountId, categoryId, date } = updateTransactionInputDto;

    await this.validateEntitiesOwnership(
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    );

    return this.transactionsRepository.update(userId, transactionId, {
      ...updateTransactionInputDto,
      date: new Date(date),
    });
  }
}
