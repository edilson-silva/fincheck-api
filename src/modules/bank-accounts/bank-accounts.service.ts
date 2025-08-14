import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './dto/bank-account-create.dto';
import { BankAccountListOutputDto } from './dto/bank-account-list.dto';
import { UpdateBankAccountInputDto } from './dto/bank-account-update.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

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
    updateBankAccountInputDto: UpdateBankAccountInputDto,
  ) {
    const bankAccount = await this.bankAccountsRepository.find(
      userId,
      bankAccountId,
    );

    if (!bankAccount) throw new NotFoundException('Bank account not found');

    const updatedBankAccount = await this.bankAccountsRepository.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );

    return updatedBankAccount;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
