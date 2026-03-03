import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import {
  CreateBankAccountInputDto,
  CreateBankAccountOutputDto,
} from '../dto/create-bank-account.dto';
import { GetBankAccountOutputDto } from '../dto/get-bank-account.dto';
import { ListBankAccountsOutputDto } from '../dto/list-bank-accounts.dto';
import {
  UpdateBankAccountInputDto,
  UpdateBankAccountOutputDto,
} from '../dto/update-bank-account.dto';
import { BankAccountOwnershipValidateService } from './bank-account-ownership-validate.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly bankAccountOwnershipValidate: BankAccountOwnershipValidateService,
  ) {}

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
    await this.bankAccountOwnershipValidate.validate(userId, bankAccountId);

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
    await this.bankAccountOwnershipValidate.validate(userId, bankAccountId);

    return await this.bankAccountsRepository.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );
  }

  async delete(userId: string, bankAccountId: string): Promise<void> {
    await this.bankAccountOwnershipValidate.validate(userId, bankAccountId);
    await this.bankAccountsRepository.delete(userId, bankAccountId);
  }
}
