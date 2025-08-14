import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './dto/bank-account-create.dto';
import { BankAccountDeleteOutputDto } from './dto/bank-account-delete.dto';
import { BankAccountListOutputDto } from './dto/bank-account-list.dto';
import {
  BankAccountUpdateInputDto,
  BankAccountUpdateOutputDto,
} from './dto/bank-account-update.dto';
import { BankAccountDto } from './dto/bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountDto> {
    const bankAccount = await this.bankAccountsRepository.find(
      userId,
      bankAccountId,
    );

    if (!bankAccount) throw new NotFoundException('Bank account not found');

    return bankAccount;
  }

  async create(
    userId: string,
    createBankAccountDto: BankAccountCreateInputDto,
  ): Promise<BankAccountCreateOutputDto> {
    const bankAccount = await this.bankAccountsRepository.create(
      userId,
      createBankAccountDto,
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
    updateBankAccountInputDto: BankAccountUpdateInputDto,
  ): Promise<BankAccountUpdateOutputDto> {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    const updatedBankAccount = await this.bankAccountsRepository.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );

    return updatedBankAccount;
  }

  async delete(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccountDeleteOutputDto> {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    return await this.bankAccountsRepository.delete(userId, bankAccountId);
  }
}
