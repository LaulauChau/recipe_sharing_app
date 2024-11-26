import type { Routes } from "@angular/router";

import { authGuard } from "@/presentation/shared/guards/auth.guard";

export const recipeRoutes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./recipe.component").then((m) => m.RecipeComponent),
  },
];
