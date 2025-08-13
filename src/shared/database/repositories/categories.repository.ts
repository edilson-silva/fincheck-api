export type Category = {
  id: string;
  name: string;
  icon: string;
  type: string;
};

export type CategoryListOutput = Category[];

export abstract class CategoriesRepository {
  abstract list(userId: string): Promise<CategoryListOutput>;
}
