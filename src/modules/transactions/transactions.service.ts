import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { BankAccountOwnershipValidateService } from '../bank-accounts/services/bank-account-ownership-validate.service';
import { CategoryOwnershipValidateService } from '../categories/services/category-ownership-validate.service';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './dto/create-transaction.dto';
import { ListTransactionsOutputDto } from './dto/list-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountOwnershipValidate: BankAccountOwnershipValidateService,
    private readonly categoryOwnershipValidate: CategoryOwnershipValidateService,
  ) {}

  async create(
    userId: string,
    createTransactionInputDto: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionInputDto;

    await this.bankAccountOwnershipValidate.validate(userId, bankAccountId);
    await this.categoryOwnershipValidate.validate(userId, categoryId);

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
}
