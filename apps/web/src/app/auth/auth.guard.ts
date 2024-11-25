import { inject } from "@angular/core";
import { type CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs/operators";

import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => {
      if (!user) {
        void router.navigate(["/login"]);
        return false;
      }

      return true;
    }),
  );
};
