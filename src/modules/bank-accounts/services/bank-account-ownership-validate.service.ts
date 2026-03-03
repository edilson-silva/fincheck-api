import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Injectable()
export class BankAccountOwnershipValidateService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findById(
      userId,
      bankAccountId,
    );

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
