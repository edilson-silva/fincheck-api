import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './dto/bank-account-create.dto';
import { BankAccountListOutputDto } from './dto/bank-account-list.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

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

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
