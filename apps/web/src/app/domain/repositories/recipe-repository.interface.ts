import type { Recipe } from "@/domain/entities/recipe.entity";

export abstract class RecipeRepository {
  abstract create(data: Omit<Recipe, "id" | "createdAt">): Promise<Recipe>;

  abstract findAll(): Promise<Recipe[]>;

  abstract findById(id: string): Promise<Recipe | null>;

  abstract update: (params: {
    id: string;
    data: Partial<Omit<Recipe, "id" | "createdAt" | "author">>;
  }) => Promise<Recipe>;

  abstract delete(id: string): Promise<boolean>;
}
