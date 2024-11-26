import { Observable } from "rxjs";

import type { User } from "@/domain/entities/user.entity";

export abstract class AuthService {
  abstract user$: Observable<User | null>;

  abstract login(email: string, password: string): Promise<User>;

  abstract logout(): Promise<void>;

  abstract register(
    name: string,
    email: string,
    password: string,
  ): Promise<User>;
}
