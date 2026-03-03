import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { BankAccountsService } from './bank-accounts.service';
import {
  CreateBankAccountInputDto,
  CreateBankAccountOutputDto,
} from './dto/create-bank-account.dto';
import { ListBankAccountsOutputDto } from './dto/list-bank-accounts.dto';
import {
  UpdateBankAccountInputDto,
  UpdateBankAccountOutputDto,
} from './dto/update-bank-account.dto';

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

  @Put(':id')
  async update(
    @Body() updateBankAccountInputDto: UpdateBankAccountInputDto,
    @ActiveUserId() userId: string,
    @Param('id') bankAccountId: string,
  ): Promise<UpdateBankAccountOutputDto> {
    return await this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );
  }
}
