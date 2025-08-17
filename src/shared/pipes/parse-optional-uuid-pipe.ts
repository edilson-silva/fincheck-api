import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseOptionalUUIDPipe extends ParseUUIDPipe {
  override async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string> {
    if (value === undefined) return;
    return super.transform(value, metadata);
  }
}
