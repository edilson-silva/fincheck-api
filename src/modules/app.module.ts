import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
