import { Routes } from "@angular/router";

import { authRoutes } from "./presentation/pages/auth/auth.route";
import { recipeRoutes } from "./presentation/pages/recipe/recipe.route";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "recipe",
  },
  {
    path: "auth",
    children: authRoutes,
  },
  {
    path: "recipe",
    children: recipeRoutes,
  },
  {
    path: "**",
    redirectTo: "recipe",
  },
];
