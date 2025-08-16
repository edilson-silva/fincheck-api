import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesOwnershipValidateService } from './services/categories-ownership-validate.service';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesOwnershipValidateService],
  exports: [CategoriesOwnershipValidateService],
})
export class CategoriesModule {}
