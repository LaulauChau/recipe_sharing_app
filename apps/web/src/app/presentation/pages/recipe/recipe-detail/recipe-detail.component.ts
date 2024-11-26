import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { AuthService } from "@/application/services/auth-service.interface";
import { DeleteRecipeUseCase } from "@/application/use-cases/recipe/delete-recipe.use-case";
import { FindRecipeUseCase } from "@/application/use-cases/recipe/find-recipe.use-case";
import type { Recipe } from "@/domain/entities/recipe.entity";

@Component({
  selector: "app-recipe-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./recipe-detail.component.html",
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  error = "";
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private findRecipeUseCase: FindRecipeUseCase,
    private deleteRecipeUseCase: DeleteRecipeUseCase,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error = "Recipe not found";
      return;
    }

    try {
      this.recipe = await this.findRecipeUseCase.execute({ id });
      if (!this.recipe) {
        throw new Error("Recipe not found");
      }

      const user = await this.authService.getCurrentUser();
      this.isOwner = user?.id === this.recipe.author.id;
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error loading recipe";
    }
  }

  async onDelete() {
    if (
      !this.recipe ||
      !confirm("Are you sure you want to delete this recipe?")
    ) {
      return;
    }

    try {
      await this.deleteRecipeUseCase.execute({ id: this.recipe.id });
      await this.router.navigate(["/recipe"]);
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error deleting recipe";
    }
  }

  goBack() {
    this.router.navigate(["/recipe"]);
  }
}
