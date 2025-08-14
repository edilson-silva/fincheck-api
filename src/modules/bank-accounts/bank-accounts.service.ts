import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  BankAccountCreateInputDto,
  BankAccountCreateOutputDto,
} from './dto/bank-account-create.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  create(
    userId: string,
    createBankAccountDto: BankAccountCreateInputDto,
  ): Promise<BankAccountCreateOutputDto> {
    return this.bankAccountsRepository.create(userId, createBankAccountDto);
  }

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
