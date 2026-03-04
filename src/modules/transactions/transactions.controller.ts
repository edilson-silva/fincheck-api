import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import {
  CreateTransactionInputDto,
  CreateTransactionOutputDto,
} from './dto/create-transaction.dto';
import { ListTransactionsOutputDto } from './dto/list-transaction.dto';
import {
  UpdateTransactionInputDto,
  UpdateTransactionOutputDto,
} from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @ActiveUserId() userId: string,
    @Body() createTransactionInputDto: CreateTransactionInputDto,
  ): Promise<CreateTransactionOutputDto> {
    return this.transactionsService.create(userId, createTransactionInputDto);
  }

  @Get()
  async listByUserId(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<ListTransactionsOutputDto> {
    return this.transactionsService.lisByUserId(userId, month, year);
  }

  @Put(':transactionId')
  async update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionInputDto: UpdateTransactionInputDto,
  ): Promise<UpdateTransactionOutputDto> {
    return await this.transactionsService.update(
      userId,
      transactionId,
      updateTransactionInputDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ): Promise<void> {
    return await this.transactionsService.delete(userId, transactionId);
  }
}
