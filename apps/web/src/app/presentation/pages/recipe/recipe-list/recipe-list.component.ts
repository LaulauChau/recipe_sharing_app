import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { LogoutUseCase } from "@/application/use-cases/auth/logout.use-case";
import { FindRecipesUseCase } from "@/application/use-cases/recipe/find-recipes.use-case";
import type { Recipe } from "@/domain/entities/recipe.entity";
import { RecipeCardComponent } from "@/presentation/shared/components/recipe-card/recipe-card.component";
import { SearchBarComponent } from "@/presentation/shared/components/search-bar/search-bar.component";

@Component({
  selector: "app-recipe-list",
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent, SearchBarComponent],
  templateUrl: "./recipe-list.component.html",
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;
  error = "";

  constructor(
    private findRecipesUseCase: FindRecipesUseCase,
    private logoutUseCase: LogoutUseCase,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      this.recipes = await this.findRecipesUseCase.execute();
      this.filteredRecipes = this.recipes;
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error loading recipes";
    } finally {
      this.loading = false;
    }
  }

  onSearch(term: string) {
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(term.toLowerCase()),
    );
  }

  async onLogout() {
    try {
      await this.logoutUseCase.execute();
      await this.router.navigate(["/auth/login"]);
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error during logout";
    }
  }
}
