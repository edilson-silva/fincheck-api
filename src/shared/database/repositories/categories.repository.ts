import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listByUserId(userId: string): Promise<CategoryEntity[]> {
    const categories = await this.prismaService.category.findMany({
      where: { userId },
    });

    return categories;
  }
}
