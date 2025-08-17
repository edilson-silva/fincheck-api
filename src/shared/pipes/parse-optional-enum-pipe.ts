import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class ParseOptionalEnumPipe<T = any> extends ParseEnumPipe<T> {
  override async transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (value === undefined) return;
    return super.transform(value, metadata);
  }
}
