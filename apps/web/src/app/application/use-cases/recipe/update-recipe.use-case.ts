import { Injectable } from "@angular/core";

import type { UpdateRecipeDto } from "@/application/dtos/recipe.dto";
import { AuthService } from "@/application/services/auth-service.interface";
import type { Recipe } from "@/domain/entities/recipe.entity";
import { RecipeRepository } from "@/domain/repositories/recipe-repository.interface";

@Injectable({
  providedIn: "root",
})
export class UpdateRecipeUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(params: {
    id: string;
    data: UpdateRecipeDto;
  }): Promise<Recipe> {
    const user = this.authService.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return this.recipeRepository.update({
      id: params.id,
      data: {
        ...params.data,
      },
    });
  }
}
