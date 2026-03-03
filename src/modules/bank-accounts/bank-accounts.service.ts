import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  CreateBankAccountInputDto,
  CreateBankAccountOutputDto,
} from './dto/create-bank-account.dto';
import { GetBankAccountOutputDto } from './dto/get-bank-account.dto';
import { ListBankAccountsOutputDto } from './dto/list-bank-accounts.dto';
import {
  UpdateBankAccountInputDto,
  UpdateBankAccountOutputDto,
} from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ) {
    const bankAccount = await this.bankAccountsRepository.findById(
      userId,
      bankAccountId,
    );

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }
  }

  async create(
    userId: string,
    createBankAccountInputDto: CreateBankAccountInputDto,
  ): Promise<CreateBankAccountOutputDto> {
    return await this.bankAccountsRepository.create(
      userId,
      createBankAccountInputDto.name,
      createBankAccountInputDto.initialBalance,
      createBankAccountInputDto.type,
      createBankAccountInputDto.color,
    );
  }

  async listByUserId(userId: string): Promise<ListBankAccountsOutputDto> {
    return await this.bankAccountsRepository.listByUserId(userId);
  }

  async getById(
    userId: string,
    bankAccountId: string,
  ): Promise<GetBankAccountOutputDto> {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    const bankAccount = await this.bankAccountsRepository.findById(
      userId,
      bankAccountId,
    );

    return bankAccount;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountInputDto: UpdateBankAccountInputDto,
  ): Promise<UpdateBankAccountOutputDto> {
    await this.validateBankAccountOwnership(userId, bankAccountId);

    return await this.bankAccountsRepository.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );
  }

  async delete(userId: string, bankAccountId: string): Promise<void> {
    const bankAccount = await this.bankAccountsRepository.findById(
      userId,
      bankAccountId,
    );

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    await this.bankAccountsRepository.delete(userId, bankAccountId);
  }
}
