import { authGuard } from "@/presentation/shared/guards/auth.guard";
import type { Routes } from "@angular/router";

export const recipeRoutes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./recipe-list/recipe-list.component").then(
        (m) => m.RecipeListComponent,
      ),
  },
  {
    path: "new",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./recipe-form/recipe-form.component").then(
        (m) => m.RecipeFormComponent,
      ),
  },
  {
    path: ":id",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./recipe-detail/recipe-detail.component").then(
        (m) => m.RecipeDetailComponent,
      ),
  },
  {
    path: ":id/edit",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./recipe-form/recipe-form.component").then(
        (m) => m.RecipeFormComponent,
      ),
  },
];
