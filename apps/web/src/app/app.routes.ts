import { type Routes } from "@angular/router";

import { authGuard } from "./auth/auth.guard";
import { publicGuard } from "./auth/public.guard";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "protected",
  },
  {
    path: "login",
    canActivate: [publicGuard],
    loadComponent: () =>
      import("./login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    canActivate: [publicGuard],
    loadComponent: () =>
      import("./register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "protected",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./protected/protected.component").then(
        (m) => m.ProtectedComponent,
      ),
  },
  {
    path: "*",
    redirectTo: "protected",
  },
];
