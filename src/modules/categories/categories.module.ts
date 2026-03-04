import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoryOwnershipValidateService } from './services/category-ownership-validate.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryOwnershipValidateService],
  exports: [CategoryOwnershipValidateService],
})
export class CategoriesModule {}
