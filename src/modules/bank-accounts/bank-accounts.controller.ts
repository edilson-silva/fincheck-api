import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { BankAccountsService } from './bank-accounts.service';
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

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountInputDto: CreateBankAccountInputDto,
  ): Promise<CreateBankAccountOutputDto> {
    return await this.bankAccountsService.create(
      userId,
      createBankAccountInputDto,
    );
  }

  @Get()
  async listByUserId(
    @ActiveUserId() userId: string,
  ): Promise<ListBankAccountsOutputDto> {
    return await this.bankAccountsService.listByUserId(userId);
  }

  @Get(':bankAccountId')
  async getById(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ): Promise<GetBankAccountOutputDto> {
    return await this.bankAccountsService.getById(userId, bankAccountId);
  }

  @Put(':bankAccountId')
  async update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountInputDto: UpdateBankAccountInputDto,
  ): Promise<UpdateBankAccountOutputDto> {
    return await this.bankAccountsService.update(
      userId,
      bankAccountId,
      updateBankAccountInputDto,
    );
  }

  @Delete(':bankAccountId')
  async delete(
    @ActiveUserId() userId: string,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ): Promise<void> {
    await this.bankAccountsService.delete(userId, bankAccountId);
  }
}
