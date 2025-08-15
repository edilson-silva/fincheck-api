import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from '../dto/bank-account-create.dto';
import { BankAccountDeleteOutputDto } from '../dto/bank-account-delete.dto';
import { BankAccountListOutputDto } from '../dto/bank-account-list.dto';
import {
  BankAccountUpdateInputDto,
  BankAccountUpdateOutputDto,
} from '../dto/bank-account-update.dto';
import { BankAccountsOwnershipValidateService } from './bank-accounts-ownership-validate.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly bankAccountsOwnershipValidateService: BankAccountsOwnershipValidateService,
  ) {}

  async create(
    userId: string,
    bankAccountCreateInputDto: BankAccountCreateInputDto,
  ): Promise<BankAccountCreateOutputDto> {
    const bankAccount = await this.bankAccountsRepository.create(
      userId,
      bankAccountCreateInputDto,
    );

    return bankAccount;
  }

  async list(userId: string): Promise<BankAccountListOutputDto> {
    const bankAccounts = await this.bankAccountsRepository.list(userId);

    return { bankAccounts };
  }

  async update(
    userId: string,
    bankAccountId: string,
    bankAccountUpdateInputDto: BankAccountUpdateInputDto,
  ): Promise<BankAccountUpdateOutputDto> {
    await this.bankAccountsOwnershipValidateService.validate(
      userId,
      bankAccountId,
    );

    const updatedBankAccount = await this.bankAccountsRepository.update(
      userId,
      bankAccountId,
      bankAccountUpdateInputDto,
    );

    return updatedBankAccount;
  }

  async delete(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountDeleteOutputDto> {
    await this.bankAccountsOwnershipValidateService.validate(
      userId,
      bankAccountId,
    );

    return await this.bankAccountsRepository.delete(userId, bankAccountId);
  }
}
