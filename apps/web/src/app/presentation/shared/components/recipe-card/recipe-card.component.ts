import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

import type { Recipe } from "@/domain/entities/recipe.entity";

@Component({
  selector: "app-recipe-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./recipe-card.component.html",
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;
}
