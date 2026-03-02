import { Body, Controller, Post } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { BankAccountsService } from './bank-accounts.service';
import {
  CreateBankAccountInputDto,
  CreateBankAccountOutputDto,
} from './dto/create-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  async create(
    @Body() createBankAccountInputDto: CreateBankAccountInputDto,
    @ActiveUserId() userId: string,
  ): Promise<CreateBankAccountOutputDto> {
    return await this.bankAccountsService.create(
      userId,
      createBankAccountInputDto,
    );
  }
}
