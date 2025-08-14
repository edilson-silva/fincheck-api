import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { BankAccountDto } from '../dto/bank-account.dto';

@Injectable()
export class BankAccountsOwnershipValidateService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(
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
}
