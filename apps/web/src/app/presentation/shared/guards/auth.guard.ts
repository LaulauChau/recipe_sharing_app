import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";

import { AuthService } from "@/application/services/auth-service.interface";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (!user) {
        router.navigate(["/auth/login"]);
        return false;
      }

      return true;
    }),
  );
};
