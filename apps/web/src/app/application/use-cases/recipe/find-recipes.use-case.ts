import { Injectable } from "@angular/core";

import { AuthService } from "@/application/services/auth-service.interface";
import type { Recipe } from "@/domain/entities/recipe.entity";
import { RecipeRepository } from "@/domain/repositories/recipe-repository.interface";

@Injectable({
  providedIn: "root",
})
export class FindRecipesUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(): Promise<Recipe[]> {
    const user = this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return this.recipeRepository.findAll();
  }
}
