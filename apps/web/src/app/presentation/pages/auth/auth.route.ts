import type { Routes } from "@angular/router";

import { publicGuard } from "@/presentation/shared/guards/public.guard";

export const authRoutes: Routes = [
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
];
