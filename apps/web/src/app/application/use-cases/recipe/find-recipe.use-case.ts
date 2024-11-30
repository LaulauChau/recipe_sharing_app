import { Injectable } from "@angular/core";

import type { FindRecipeDto } from "@/application/dtos/recipe.dto";
import { AuthService } from "@/application/services/auth-service.interface";
import type { Recipe } from "@/domain/entities/recipe.entity";
import { RecipeRepository } from "@/domain/repositories/recipe-repository.interface";

@Injectable({
  providedIn: "root",
})
export class FindRecipeUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(data: FindRecipeDto): Promise<Recipe> {
    const user = this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const recipe = await this.recipeRepository.findById(data.id);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  }
}
