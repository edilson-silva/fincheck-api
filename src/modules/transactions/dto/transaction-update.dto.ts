import {
  TransactionCreateInputDto,
  TransactionCreateOutputDto,
} from './transaction-create.dto';

export class TransactionUpdateInputDto extends TransactionCreateInputDto {}

export type TransactionUpdateOutputDto = TransactionCreateOutputDto;
