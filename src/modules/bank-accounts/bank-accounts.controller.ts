import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { BankAccountsService } from './bank-accounts.service';
import {
  CreateBankAccountInputDto,
  CreateBankAccountOutputDto,
} from './dto/create-bank-account.dto';
import { ListBankAccountsOutputDto } from './dto/list-bank-accounts.dto';

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

  @Get()
  async list(
    @ActiveUserId() userId: string,
  ): Promise<ListBankAccountsOutputDto> {
    return await this.bankAccountsService.list(userId);
  }
}
