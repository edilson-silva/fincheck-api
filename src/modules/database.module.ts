import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
